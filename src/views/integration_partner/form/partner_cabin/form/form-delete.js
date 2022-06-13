import { withRouter } from "react-router"
import React, { useState, useEffect } from "react"
import { Form, Button } from "react-bootstrap"
import { Formik } from "formik"
import Api from "config/api"
import { useDispatch, useSelector } from "react-redux"
import { setAlert, setModalDelete, setModalTitle } from "redux/ui-store"
import CancelButton from "components/button/cancel"
import helpIcon from "assets/icons/help.svg"
const endpoint = "/master/integration-partners"
function DeleteForm(props) {
	const dispatch = useDispatch()
  const showModalDelete = useSelector((state) => state.ui.showModalDelete)
  const API = new Api()
  const isView = showModalDelete.disabled_form || props.isView
  const [id, setId] = useState(null)
  const [loading, setLoading] = useState(true)
  const [formValues, setFormValues] = useState({
    partner_cabin_code: "",
    partner_cabin_name: "",
    cabin_type: ""
  })

  useEffect(async () => {
    let formId = showModalDelete.id || props.id

    if(formId) {
      try {
        console.log("MASUK KESINI")
        let {data} = await API.get(`/master/integration-partners/${props.match.params.id}/cabins/${formId}`)
        setFormValues(data)
      } catch(e) {
        console.log(e)
      }
    }
  }, [])

  useEffect(() => {
    if (!showModalDelete.id) {
      setLoading(false)
    }

    if(formValues) {
      setLoading(false)
    }

    setId(showModalDelete.id)
  }, [showModalDelete.id])

  useEffect(() => {
    console.log("DELETE FORM VALUES", formValues)
  }, [formValues])

 
	
	const onSubmit = async (values, a) => {
		try {
      let res = await API.delete(`/master/integration-partners/${props.match.params.id}/cabins/${id}`)
      dispatch(setModalDelete({show: false, id: null, disabled_form: false}))
      dispatch(
				setAlert({
				  message: `Record 'Partner Cabin Name : ${formValues.cabin_type_name}' was successfully deleted.`,
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
    <>
      <div style={{textAlign:'center'}}>
        <img src={helpIcon} className="mr-2" alt="new" />
        <span style={{color: '#333333', fontSize: '14px'}}>
        Are you sure you want to delete 'Partner Cabin Name: {formValues.cabin_type_name}'?
        </span>
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
          onClick={onSubmit}
          style={{ marginRight: 15 }}
        >
          DELETE
        </Button>}
        <CancelButton onClick={() => dispatch(setModalDelete({show: false, id: null, disabled_form: false}))}/>
      </div>
    </>
			// <Formik
      //   initialValues={formValues || initialValues}
			// 	onSubmit={onSubmit}
      //   validateOnMount
      //   enableReinitialize
			// >
			// 	{
			// 		({
			// 			dirty,
			// 			handleSubmit,
			// 			isSubmitting,
      //       setFieldValue,
      //       values,
			// 		}) => (
			// 			<Form onSubmit={handleSubmit}>
      //         <div style={{textAlign:'center'}}>
      //         <img src={helpIcon} className="mr-2" alt="new" /><span style={{color: '#333333', fontSize: '14px'}}>Are you sure you want to delete 'Partner Cabin</span>
      //             <div className="row">
      //               <div className="col-sm">
      //                 <span style={{color: '#333333', fontSize: '14px'}}>Name: {values.cabin_type_name}'?</span>
      //               </div>
      //             </div>
      //         </div>
              
      //         <div
      //           style={{
      //             marginBottom: 30,
      //             marginTop: 30,
      //             display: "flex",
      //             justifyContent: 'center'
      //           }}
      //         >
      //           {!isView && <Button
      //             variant="primary"
      //             type="submit"
      //             disabled={isSubmitting}
      //             style={{ marginRight: 15 }}
      //           >
      //             DELETE
      //           </Button>}
      //           <CancelButton onClick={() => dispatch(setCreateModal({show: false, id: null, disabled_form: false}))}/>
      //         </div>
			// 			</Form>
			// 		)
			// 	}
				
			// </Formik>
	)
}

export default withRouter(DeleteForm) 