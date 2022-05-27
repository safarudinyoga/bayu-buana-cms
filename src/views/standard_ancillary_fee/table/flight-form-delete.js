import { withRouter } from "react-router"
import React, { useState, useEffect } from "react"
import { Form, Button } from "react-bootstrap"
import { Formik } from "formik"
import Api from "config/api"
import { useDispatch, useSelector } from "react-redux"
import { setAlert, setModalDelete, setModalTitle } from "redux/ui-store"
import CancelButton from "components/button/cancel"
import helpIcon from "assets/icons/help.svg"

function DeleteForm(props) {
	const dispatch = useDispatch()
  const showModalDelete = useSelector((state) => state.ui.showModalDelete)
  const API = new Api()
  const isView = showModalDelete.disabled_form || props.isView
  const [id, setId] = useState(null)
  const [loading, setLoading] = useState(true)
  const [formValues, setFormValues] = useState({
    processing_fee_category_name: "",
  })

  useEffect(async () => {
    let formId = showModalDelete.id || props.id

    if(formId) {
      try {
        let {data} = await API.get(`/master/agent-processing-fee-categories/1` + "/" + formId)
        console.log(data)
        setFormValues({
          processing_fee_category_name: data.processing_fee_category_name,
        })
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

 
	
	const onSubmit = async (values, a) => {
		try {
      let res = await API.delete(`/master/agent-processing-fee-categories/1/` + id)
      dispatch(setModalDelete({show: false, id: null, disabled_form: false}))
      dispatch(
				setAlert({
				  message: `Record Standard Ancillary Fee : ${formValues.processing_fee_category_name} was successfully deleted.`,
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
          Are you sure you want to delete 'Standard Ancillary Fee: {formValues.processing_fee_category_name}'?
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
	)
}

export default withRouter(DeleteForm) 