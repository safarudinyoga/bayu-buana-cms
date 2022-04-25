import React, { useEffect, useState } from "react"
import Api from "config/api"
import { Link } from "react-router-dom"
import { useDispatch } from "react-redux"
import { withRouter, useHistory } from "react-router"
import FormInputControl from "components/form/input-control"
import { ReactSVG } from "react-svg"
import FormikControl from "../../../components/formik/formikControl"
import Select from "../../../components/form/select"
import { Row, Col, Tab, Nav, Card, Button, } from "react-bootstrap"
import { setUIParams } from "redux/ui-store"
import useQuery from "lib/query"
import Tabel from './tabel-fare-family'
import * as Yup from "yup"
import createIcon from "assets/icons/create.svg"
import { Form, Formik, FastField, Field, ErrorMessage } from "formik"
import { setAlert } from "redux/ui-store"

const endpoint = "/master/integration-partner-cabin-types"


function FormIntegrationPartner(props) {
  let dispatch = useDispatch()
  const history = useHistory()
  let [status, setStatus] = useState({ switchStatus: true })
  const [tabKey, setTabKey] = useState("partner-cabin")
  const isView = useQuery().get("action") === "view"
  const [loading, setLoading] = useState(true)
  const [id, setId] = useState(null)
  const [formValues, setFormValues] = useState(null)


  useEffect(async () => {
    let api = new Api()
    let formId = props.match.params.id

    let docTitle = "Edit partner-cabin"
    if (!formId) {
      docTitle = "Add partner-cabin"
    } else if (isView) {
      docTitle = "partner-cabin Details"
    }


    try {
      let res = await api.get(endpoint + "/" + formId)
      setFormValues(res.data)
    } catch (e) { }
    setLoading(false)
  }, [])


  useEffect(() => {
    if (!props.match.params.id) {
      setLoading(false)
    }
    setId(props.match.params.id)
  }, [props.match.params.id])

  const initialValues = {
    cabin_type_id: "",
  }



  const validationSchema = Yup.object().shape({

    cabin_type_id: Yup.object()
      .required("To Currency is required.")

    ,

  })

  const onSubmit = async (values, a) => {
    try {
      let form = {

        cabin_type_id: values.cabin_type_id

      }
      let res = await Api.putOrPost("/master/integration-partner-cabin-types", id, form)
      dispatch(
        setAlert({
          message: `Record 'From Currency: ${form.cabin_type_id} and To Currency: ${form.cabin_type_id}' has been successfully saved.`,
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
  const handleSelectTab = async (key) => {
    setTabKey(key)
  }

  const formSize = {
    label: {
      md: 4,
      lg: 4,
    },
    value: {
      md: 7,
      lg: 7,
    },
  }
  return (

    <>
      <Formik
        initialValues={formValues || initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        validateOnMount
        enableReinitialize
      >
        {({
          dirty,
          handleSubmit,
          isSubmitting,
          setFieldValue,
          values,
        }) => (
          <Form onSubmit={handleSubmit}>
            <Card>
              <Card.Body>
                <h3 className="card-heading">Partner Cabin</h3>
                <FormikControl
                  control="selectAsync"
                  required={isView ? "" : "label-required"}
                  label="Cabin"
                  name="cabin"
                  placeholder={values.cabin_type_name || "Please Choose."}
                  url={`master/integration-partner-cabin-types`}
                  fieldName={"cabin_type_name"}
                  onChange={(v) => {
                    setFieldValue("cabin", v)
                  }}
                  style={{ maxWidth: 250 }}
                  components={
                    isView
                      ? {
                        DropdownIndicator: () => null,
                        IndicatorSeparator: () => null,
                      }
                      : null
                  }
                  isDisabled={isView}
                />
                <FormikControl
                  control="input"
                  required="label-required"
                  label="Partner Cabin Code"
                  name="cabin_type_code"
                  style={{ maxWidth: 250 }}
                  size={formSize}
                  disabled={isView || loading}
                  onChange={e => {

                    setFieldValue("cabin_type_code", e.target.value)

                  }}
                />
                <FormikControl
                  control="input"
                  required="label-required"
                  label="Partner Cabin Name"
                  name="cabin_type_name"
                  style={{ maxWidth: 250 }}
                  size={formSize}
                  disabled={isView || loading}
                  onChange={e => {

                    setFieldValue("cabin_type_name", e.target.value)

                  }}
                />
               <h3 className="card-heading"></h3>
               <div style={{ padding: "0 15px 15px 15px" }}>
                 
                  <button
                    className="btn float-right button-override"
                    
                  >
                    <img  src={createIcon} className="mr-1" alt="new" />
                    Add New Fare Family
                  </button>
                  {/* <FlightModal
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                  /> */}
                </div>
                {/* < Tabel /> */}
              </Card.Body>
            </Card>
            <div
              className="mb-5 ml-1 row justify-content-md-start justify-content-center"
              style={{
                marginBottom: 30,
                marginTop: 30,
                display: "flex",
              }}
            >
              {isView ? (
                <>
                  <Button variant="secondary" onClick={() => history.goBack()}>
                    BACK
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    variant="primary"
                    type="submit"
                    style={{ marginRight: 15 }}
                  >
                    Save
                  </Button>
                  <Button variant="secondary" onClick={() => history.goBack()}>
                    CANCEL
                  </Button>
                </>
              )}
            </div>

            {/* {!isView && <Button
                  variant="primary"
                  type="submit"
                  disabled={isSubmitting}
                  style={{ marginRight: 15 }}
                >
                  SAVE
                </Button>} */}
          </Form>
        )}
      </Formik>
    </>
  )
}

export default withRouter(FormIntegrationPartner)
