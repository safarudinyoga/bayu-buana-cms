import { withRouter } from "react-router"
import React, { useState, useEffect } from "react"
import { Form, Button } from "react-bootstrap"
import { Formik } from "formik"
import Api from "config/api"
import { useDispatch, useSelector } from "react-redux"
import { setAlert, setCreateModal, setModalTitle } from "redux/ui-store"
import CancelButton from "components/button/cancel"

const endpoint = "/master/corporate-rating-type-levels"
function DeleteForm(props) {
	const dispatch = useDispatch()
  const showCreateModal = useSelector((state) => state.ui.showCreateModal)
  const API = new Api()
  const isView = showCreateModal.disabled_form || props.isView
  const [id, setId] = useState(null)
  const [loading, setLoading] = useState(true)
  const [formValues, setFormValues] = useState(null)

  const initialValues = {
		corporate_rating_type_level_code: "",
    corporate_rating_type_level_name: "",
    rating: "",
    corporate_rating_type_id: ""
	}
  useEffect(async () => {
    let formId = showCreateModal.id || props.id

    let docTitle = "Delete Corporate Rating"
    dispatch(setModalTitle(docTitle))

    if(formId) {
      try {
        let {data} = await API.get(endpoint + "/" + formId)
        setFormValues(data)
      } catch(e) {
        console.log(e)
      }
    }
  }, [])

  useEffect(() => {
    if (!showCreateModal.id) {
      setLoading(false)
    }

    if(formValues) {
      setLoading(false)
    }

    setId(showCreateModal.id)
  }, [showCreateModal.id])

 
	
	const onSubmit = async (values, a) => {
		try {
      let res = await API.delete("/master/corporate-rating-type-levels/" + id)
      dispatch(setCreateModal({show: false, id: null, disabled_form: false}))
      dispatch(
				setAlert({
				  message: `Record Corporate Rating Name : ${values.corporate_rating_type_level_name} was successfully deleted.`,
				}),
      )
		} catch(e) {
			dispatch(
				setAlert({
				  message: "Failed to delete this record.",
				}),
      )
		}
	}
 
	return (
			<Formik
        initialValues={formValues || initialValues}
				onSubmit={onSubmit}
        validateOnMount
        enableReinitialize
			>
				{
					({
						dirty,
						handleSubmit,
						isSubmitting,
            setFieldValue,
            values,
					}) => (
						<Form onSubmit={handleSubmit}>
              <div style={{textAlign:'center'}}>
                <span style={{color: '#333333', fontSize: '14px'}}>Are you sure you want to delete this ?</span>
                  <div className="row">
                    <div className="col-sm">
                      <span style={{color: '#333333', fontSize: '14px'}}>Corporate Rating Code : {values.corporate_rating_type_level_code}</span>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm">
                      <span style={{color: '#333333', fontSize: '14px'}}>Corporate Rating Name : {values.corporate_rating_type_level_name}</span>
                    </div>
                  </div>
              </div>
              
              <div
                style={{
                  marginBottom: 30,
                  marginTop: 30,
                  display: "flex",
                  justifyContent: 'center'
                }}
              >
                {!isView && <Button
                  variant="primary"
                  type="submit"
                  disabled={isSubmitting}
                  style={{ marginRight: 15 }}
                >
                  DELETE
                </Button>}
                <CancelButton onClick={() => dispatch(setCreateModal({show: false, id: null, disabled_form: false}))}/>
              </div>
						</Form>
					)
				}
				
			</Formik>
	)
}

export default withRouter(DeleteForm) 