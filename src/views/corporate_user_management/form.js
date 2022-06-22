import React, { useEffect, useState, useRef } from "react"
import { withRouter, useHistory } from "react-router-dom"
import { Card, Form, Row, Button, Nav, Overlay, Popover } from "react-bootstrap"
import { useSnackbar } from "react-simple-snackbar"
import ModuleAccess from "./module-access"
import { setUIParams } from "redux/ui-store"
import SelectAsync from "components/form/select-async"
import _ from "lodash"
import { Formik, FastField, Form as FormikForm } from "formik"
import * as Yup from "yup"
import useQuery from "lib/query"
import { useDispatch } from "react-redux"
import { setAlert } from "redux/ui-store"
import Api from "config/api"
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css"
import "react-dropzone-uploader/dist/styles.css"
import env from "../../config/environment"

const backUrl = "/master/user-management"
const endpoint = "/user/user-type-users"
const options = {
  position: "bottom-right",
}

const UserManagementForm = (props) => {
  const history = useHistory()
  const [openSnackbar] = useSnackbar(options)
  let dispatch = useDispatch()
  let api = new Api()
  const [initialForm, setInitialForm] = useState({
    employee: "",
    user_type: "",
  })
  let formId = props.match.params.id
  const [loading, setLoading] = useState(true)
  const isView = useQuery().get("action") === "view"
  const [showhide, setShowhide]=useState(false);
 
  const [show, setShow] = useState(false)
  const target = useRef(null)

  useEffect(async () => {
    let api = new Api()
    let formId = props.match.params.id

    let docTitle = "Edit User"

    if (!formId) {
      docTitle = "Create User Access"
    } else if (isView) {
      docTitle = "User Management Details"
    }
    dispatch(
      setUIParams({
        title: isView ? "User Details" : docTitle,
        breadcrumbs: [
          {
            text: "Manage Access",
          },
          {
            link: backUrl,
            text: "User Management ",
          },
          {
            text: docTitle,
          },
        ],
      }),
    )
    try {
      if (formId) {
        let { data } = await api.get(endpoint + "/" + formId)

          setInitialForm({
            ...initialForm,
            employee: {
              value: data.user_account_id,
              label: data.given_name,
            },
            user_type: {
              value: data.user_type_id,
              label: data.user_type_name,
            }
          })
      }
    } catch (e) {
      openSnackbar(`error => ${e}`)
    } finally {
      setLoading(false)
    }
  }, [])

  // Schema for yup
  const validationSchema = Yup.object().shape({
    employee: Yup.object()
      .required("Employee is required.")
      .test(
        "Unique Employee Name",
        "User already exists",
        async (value, ctx) => {
          let formId = props.match.params.id
          try {
            let res = await api.get(
              `${env.API_URL}/master/employees?filters=["given_name","=","${value}"]`,
            )

            if (formId) {
              return (
                res.data.items.length === 0 || value === initialForm.given_name
              )
            } else {
              return res.data.items.length === 0
            }
          } catch (e) {
            return false
          }
        },
      ),
    user_type: Yup.object().required("User Type is required."),
  })

  const onSubmit = async (values, a) => {
    try {
      let formId = props.match.params.id

      let form = {
        user_account_id: values.employee
          ? values.employee.value
          : "00000000-0000-0000-0000-000000000000",

        user_type_id: values.user_type
          ? values.user_type.value
          : "00000000-0000-0000-0000-000000000000",
      }

      if (!formId) {
        //Proses Create Data
        let res = await api.post(`/user/user-type-users`, form)
        openSnackbar(`Record has been successfully saved.`)
        history.goBack()
      } else {
        let res = await api.put(`/user/user-type-users/${formId}`, form)

        dispatch(
          setAlert({
            message: `Record  has been successfully saved.`,
          }),
        )
      }
    } catch (e) {
      dispatch(
        setAlert({
          message: "Failed to save this record.",
        }),
      )
    }
  }

  const popoverBottom = (values) => {
    return (
      <Popover id="popover-positioned-bottom" title="Popover bottom">
        <ModuleAccess userType={values} />
      </Popover>
    )
  }
  return (
    <>
      <Formik
        initialValues={initialForm}
        validationSchema={validationSchema}
        validateOnChange={false}
        onSubmit={onSubmit}
      >
        {({
          values,
          errors,
          touched,
          dirty,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          setFieldValue,
          setFieldTouched,
        }) => (
          <FormikForm onSubmit={handleSubmit}>
            <Card>
              <Card.Body>
                <div style={{ padding: "0 2px 2px" }}>
                  <Form.Group as={Row} className="mb-3">
                 
                    <Form.Label column md={2}>
                      Select Employee to Grant Access
                      <span className="form-label-required">*</span>
                    </Form.Label>
                    <FastField name="employee">
                      {({ field, form }) => (
                        <div style={{ width: 150 }}>
                          <SelectAsync
                            {...field}
                            isClearable
                            isDisabled={values.given_name || isView}
                            url={`master/employees`}
                            fieldName="given_name"
                            onChange={(v) => {
                              setFieldValue("employee", v)
                            }}
                            placeholder="Please choose"
                            className={`react-select ${
                              form.touched.employee && form.errors.employee
                                ? "is-invalid"
                                : null
                            }`}
                            components={
                              isView
                                ? {
                                    DropdownIndicator: () => null,
                                    IndicatorSeparator: () => null,
                                  }
                                : null
                            }
                          />
                          {form.touched.employee && form.errors.employee && (
                            <Form.Control.Feedback type="invalid">
                              {form.touched.employee
                                ? form.errors.employee
                                : null}
                            </Form.Control.Feedback>
                          )}
                        </div>
                      )}
                    </FastField>
                    {!formId ? (
                      <Form.Label column md={3}>
                        <Nav.Link href={`/master/corporate-user-profile`}>
                          Create New Employee
                        </Nav.Link>
                      </Form.Label>
                    ) : null}
                  </Form.Group>

                  <Form.Group as={Row} className="mb-3">
                    <Form.Label column md={2}>
                      User Type
                      <span className="form-label-required">*</span>
                    </Form.Label>
                    <FastField name="user_type">
                      {({ field, form }) => (
                        <div style={{ width: 150 }}>
                          <SelectAsync
                            {...field}
                            isClearable
                            url={`user/user-types`}
                            fieldName="user_type_name"
                            onChange={(v) => {
                              setFieldValue("user_type", v)
                              if(v) setShowhide(v.value)
                            }}
                            placeholder="Please choose"
                            className={`react-select ${
                              form.touched.user_type && form.errors.user_type
                                ? "is-invalid"
                                : null
                            }`}
                            style={{ witdh: 200 }}
                            components={
                              isView
                                ? {
                                    DropdownIndicator: () => null,
                                    IndicatorSeparator: () => null,
                                  }
                                : null
                            }
                          />
                          {form.touched.user_type && form.errors.user_type && (
                            <Form.Control.Feedback type="invalid">
                              {form.touched.user_type
                                ? form.errors.user_type
                                : null}
                            </Form.Control.Feedback>
                          )}
                        </div>
                      )}
                    </FastField>
                    

{showhide ? (
  <>
   <Form.Label
                       column
                       md={2}
                       style={{ color: "#3E40AE", marginLeft: "14px" }}
                       ref={target}
                       onClick={() => setShow(!show)}
                     >
                       View module access list
                     </Form.Label>
                     <Overlay
                     target={target.current}
                     show={show}
                     placement="bottom"
                   >
                     {(props) => (
                       <div
                         {...props}
                         // style={{
                         //   backgroundColor: "rgba(255, 100, 100, 0.85)",
                         //   padding: "2px 10px",
                         //   color: "white",
                         //   borderRadius: 3,
                         //   ...props.style,
                         // }}
                       >
                         <ModuleAccess value={showhide} />
                       </div>
                     )}
                   </Overlay>
  </>
                      
                    ) : null}
                    
                  </Form.Group>
                </div>

                <div style={{ padding: "0 15px 15px 15px" }}>
                  <span style={{ fontSize: 13, fontStyle: "italic" }}>
                    Note: Password will be automatically generated and sent to
                    the respective employee's registered email
                  </span>
                </div>
              </Card.Body>
            </Card>
            <div style={{ marginBottom: 30, marginTop: 30, display: "flex" }}>
              <Button
                variant="primary"
                type="submit"
                disabled={isSubmitting || !dirty}
                style={{ marginRight: 15 }}
              >
                SAVE
              </Button>
              <Button variant="secondary" onClick={() => history.goBack()}>
                CANCEL
              </Button>
            </div>
            <div></div>
          </FormikForm>
        )}
      </Formik>{" "}
    </>
  )
}

export default withRouter(UserManagementForm)
