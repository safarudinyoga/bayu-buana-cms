import { withRouter } from "react-router"
import React, { useState, useEffect } from "react"
import { Button } from "react-bootstrap"
import Api from "config/api"
import { useDispatch, useSelector } from "react-redux"
import { setAlert, setModalDelete } from "redux/ui-store"
import { useParams } from "react-router-dom"
import CancelButton from "components/button/cancel"
import errorIcon from "assets/icons/error.svg"
const endpoint = "/master/integration-partners"
function DeleteForm(props) {
	const dispatch = useDispatch()
  const { id } = useParams()
  const showModalDelete = useSelector((state) => state.ui.showModalDelete)
  const API = new Api()
  const isView = showModalDelete.disabled_form || props.isView
  const [idMealPlan, setIdMealPlan] = useState(null)
  const [loading, setLoading] = useState(true)
  const [formValues, setFormValues] = useState({
    meal_plan_type_name: "",
  })

  useEffect(async () => {
    let formId = showModalDelete.id || props.id
    console.log('formId', formId)
    if(formId) {
      try {
        let {data} = await API.get(endpoint + "/" + id + "/meal-plan-types/" + formId)
        console.log(data)
        setFormValues({
          meal_plan_type_name: data.meal_plan_type_name,
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

    setIdMealPlan(showModalDelete.id)
  }, [showModalDelete.id])

 
	
	const onSubmit = async (values, a) => {
		try {
      let res = await API.delete(endpoint + "/" + id + "/meal-plan-types/" + idMealPlan)
      dispatch(setModalDelete({show: false, id: null, disabled_form: false}))
      dispatch(
				setAlert({
				  message: `Record Partner Meal Plan Name : ${formValues.meal_plan_type_name} was successfully deleted.`,
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
      <img src={errorIcon} className="mr-2" alt="new" />
        <span style={{color: '#333333', fontSize: '14px'}}>
          Are you sure you want to delete 'Partner Meal Plan Name: {formValues.meal_plan_type_name}'?
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