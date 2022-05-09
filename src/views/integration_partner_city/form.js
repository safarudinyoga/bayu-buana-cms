import { withRouter } from "react-router"
import React, { useState, useEffect } from "react"
import { Form, FormGroup, InputGroup, Button, Row, Col } from "react-bootstrap"
import { Formik, FastField } from "formik"
import useQuery from "lib/query"
import * as Yup from "yup"
import Api from "config/api"
import { useDispatch, useSelector } from "react-redux"
import { setAlert, setCreateModal, setModalTitle } from "redux/ui-store"
import CancelButton from "components/button/cancel"
import FormikControl from "../../components/formik/formikControl"
import _ from "lodash"
import FormInputControl from "components/form/input-control"
import { useSnackbar } from "react-simple-snackbar"

const options = {
  position: "bottom-right",
}


const endpoint = "/master/integration-partner-cities"
function PartnerCityCreate(props) {
  const [openSnackbar] = useSnackbar(options)

  const dispatch = useDispatch()
  const showCreateModal = useSelector((state) => state.ui.showCreateModal)
  const API = new Api()
  const isView = showCreateModal.disabled_form || props.isView
  const [id, setId] = useState(null)
  const [loading, setLoading] = useState(true)
  const [form, setForm] = useState({
    city: "",
    city_code: "",
    city_name: "",
  })

  useEffect(async () => {
    let formId = props.match.params.id
    let api = new Api()
    let docTitle = "EDIT PARTNER CITIES"
    if (!formId) {
      docTitle = "CREATE PARTNER CITIES"
    } else if (isView) {
      docTitle = "Exchange Rate Details"
    }

    dispatch(setModalTitle(docTitle))

    if (formId) {
      try {
        let res = await api.get(endpoint + "/" + formId);

        setForm(res.data);
      } catch (e) {
        console.log(e);
      }
    }

  }, [])

  useEffect(() => {
    if (!showCreateModal.id) {
      setLoading(false)
    }

    if (form) {
      setLoading(false)
    }

    setId(showCreateModal.id)
  }, [showCreateModal.id, form])

  const initialValues = {
    city: "",
    city_code: "",
    city_name: "",
  };

  const checkCity = async (city_code, city_name) => {
    let filter = encodeURIComponent(JSON.stringify([["city_code", "=", city_code], ["AND"], ["city_name", "=", city_name]]))
    let res = await API.get(`/master/integration-partner-cities?filters=${filter}`)
    let sameId = res.data.items.find((v) => v.id === id)
    if (!sameId) return res.data.items.length === 0

    return true
  }


  Yup.addMethod(Yup.object, 'checkCity', function (message) {
    return this.test('unique', message, function (field, ctx) {
      let parent = ctx.parent
      if (parent.city_code?.value && parent.city_name?.value) {
        return checkCity(parent.city_code.value, parent.city_name.value)
      } else {
        return true
      }
    })
  })
  const validationSchema = Yup.object().shape({
    city: Yup.object().required("Job Title is required."),
    city_code: Yup.string().required("Partner Country Code is required"),
    city_name: Yup.string().required("Partner Country Name is required"),
  });


  const onSubmit = async (values, a) => {
    try {
      let formId = props.match.params.id
      let form = {
        city_code: values.city_code.value,
        city_name: values.city_name.value,
        

      }
      if (!formId) {
        //Proses Create Data
        let res = await API.post(`/master/integration-partner-cities/${formId}/cities`,  form)
        dispatch(
          setAlert({
            message: `Record 'Partner Cabin Name: ${form.cabin_type_name}' has been successfully saved.`,
          }),
        )
      }
      

      dispatch(setCreateModal({ show: false, id: null, disabled_form: false }))
      dispatch(
        setAlert({
          message: `Record 'From Currency: ${form.city_code} and To Currency: ${form.city_name}' has been successfully saved.`,
        }),
      )
    } catch (e) {
      dispatch(
        setAlert({
          message: "Failed to save this record.",
        }),
      )
    }
  }
  const formSize = {
    label: {
      md: 5,
      lg: 5
    },
    value: {
      md: 7,
      lg: 7
    }
  }
  return (
    <Formik
      initialValues={form}
      validationSchema={validationSchema}
      enableReinitialize
      validator={() => ({})}
      onSubmit={onSubmit}
        validateOnMount
    >
      {
        ({
          values,
          errors,
          touched,
          dirty,
          handleChange,
          handleBlur,
          handleSubmit,
          isValid,
          isSubmitting,
          setFieldValue,
          setFieldTouched,
        }) => (
          <Form onSubmit={handleSubmit} className="ml-2">
            <Form.Group as={Row} className="form-group">
              <Form.Label column sm={6}>
                City<span className="form-label-required">*</span>
              </Form.Label>
              <Col sm={6}>
                <Form.Control
                  name="city"
                  type="text"
                  value={values.city}
                  minLength={1}
                  maxLength={36}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  style={{ maxWidth: 200 }}
                  disabled={isView}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="form-group">
              <Form.Label column sm={6}>
                Partner Cabin Code<span className="form-label-required">*</span>
              </Form.Label>
              <Col sm={6}>
                <Form.Control
                  name="city_code"
                  type="text"
                  value={values.city_code}
                  minLength={1}
                  maxLength={36}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  style={{ maxWidth: 200 }}
                  disabled={isView}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="form-group">
              <Form.Label column sm={6}>
                Partner Cabin Name<span className="form-label-required">*</span>
              </Form.Label>
              <Col sm={6}>
                <Form.Control
                  name="city_name"
                  type="text"
                  value={values.city_name}
                  minLength={1}
                  maxLength={36}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  style={{ maxWidth: 200 }}
                  disabled={isView}
                />
              </Col>
            </Form.Group>
            
            
            {
                  props.isMobile 
                  ? isView 
                  ? (<div className="mb-2 row justify-content-md-start justify-content-center">
                      <Button
                        variant="secondary"
                        onClick={() => props.history.goBack()}
                      >
                        BACK
                      </Button>
                    </div>) 
                  : (<div className="ml-1 row justify-content-md-start justify-content-center">
                      <Button                        
                        variant="primary"
                        type="submit"
                        disabled={props.formId?.id ? (!isValid || isSubmitting) : (!dirty || isSubmitting)}
                        style={{ marginRight: 15, marginBottom: 20, marginTop: 85 }}
                      >
                       SAVE
                      </Button>
                      <CancelButton onClick={() => dispatch(setCreateModal({show: false, id: null, disabled_form: false}))}/>
                    </div>)
                  : ""
                }
                {
              !props.isMobile 
              ? isView 
              ? (<>
                  <Button
                    variant="secondary"
                    onClick={() => props.history.goBack()}
                    className="mt-3"
                  >
                    BACK
                  </Button>
                </>) 
              : (<div style={{
                marginBottom: 30,
                marginTop: 30,
                display: "flex",
              }}>
                  <Button                    
                    variant="primary"
                    type="submit"
                    disabled={props.finishStep > 0 ? (!isValid || isSubmitting) : (!dirty || isSubmitting)}
                    style={{ marginRight: 15}}
                  >
                    SAVE
                  </Button>
                  <CancelButton onClick={() => dispatch(setCreateModal({show: false, id: null, disabled_form: false}))}/>
                </div>)
              : ""
            }
           
          </Form>
        )
      }

    </Formik>


  )
}

export default withRouter(PartnerCityCreate) 