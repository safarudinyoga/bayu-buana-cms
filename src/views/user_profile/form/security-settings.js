import { FastField, Formik } from 'formik';
import React, { useState, useEffect } from 'react';
import { Card, Form, Row, Col, Button, InputGroup, FormGroup } from "react-bootstrap"
import * as Yup from "yup"
import Api from "config/api"
import { useSnackbar } from "react-simple-snackbar"
import { useHistory } from "react-router-dom"
import Cookies from "js-cookie"

const options = {
  position: "bottom-right",
}

const SecuritySettings = (props) => {
  let api = new Api()
  const [ oldPassType, setOldPassType] = useState("password")
  const [ newPassType, setNewPassType] = useState("password")
  const [ confirmPassType, setConfirmPassType] = useState("password")
  const [ email, setEmail] = useState("")
  const [openSnackbar] = useSnackbar(options)
  const history = useHistory()

  // Initialize form
  const initialForm = {
    // Change Password
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  }

  useEffect(async () => {
    try {
      let res = await api.get("/user/profile")
      setEmail(res.data.contact.email)
    } catch(e) {

    }
  }, [])

  // Schema for yup
  const validationSchema = Yup.object().shape({
    // Change Password
    oldPassword: Yup.string()
                  .required("Old Password is required")
                  .min(8, "Old Password must be at least 8 characters")
                  .max(256)
                  .test(
                    'valid-password',
                    'Old Password is incorrect',
                    async (value, testContext) => {
                      try {
                        let res = await api.post("/user/login", {
                          username: email,
                          password: value
                        })
                        if(res.status === 200){
                          return true
                        }
                      } catch(e) {

                      }
                    }
                  ),
    newPassword: Yup.string()
                  .required("New Password is required")
                  .min(8, "New Password must be at least 8 characters")
                  .max(256)
                  .notOneOf([Yup.ref('oldPassword'), null], 'New Password must not be same as Old Password'),
    confirmPassword: Yup.string()
                      .required("Confirm password is required")
                      .min(8, "Confirm Password must be at least 8 characters")
                      .max(256)
                      .oneOf([Yup.ref('newPassword'), null], 'New password and confirm password does not match.'),
  })

  const signout = async () => {
    openSnackbar(
      `You have been successfully logged out!`
    )
    setTimeout(() => {
      Cookies.remove("ut");
      Cookies.remove("rt");
      history.push("/auth/login");
    }, 700);
  };

  const FormValidate = ({
    label,
    name,
    type="password",
    minLength=8,
    maxLength=256,
    placeholder="",
    endIcon,
  }) => (
    <FormGroup as={Row}>
      <Form.Label className="mt-2" column sm={3}>{label}</Form.Label>
      <Col sm={9}>
        <InputGroup>
          <FastField name={name}>
            {({ field, form }) => (
              <>
                <Form.Control
                  type={type}
                  placeholder={placeholder}
                  isInvalid={
                    form.touched[name] && form.errors[name]
                  }
                  maxLength={maxLength}
                  minLength={minLength}
                  {...field}
                />
                {
                  endIcon ? (
                    <InputGroup.Append>
                      <InputGroup.Text>
                        {endIcon()}
                      </InputGroup.Text>
                    </InputGroup.Append>
                  ) : null
                }
                {form.touched[name] && form.errors[name] && (
                  <Form.Control.Feedback type="invalid">
                    {form.touched[name]
                      ? form.errors[name]
                      : null}
                  </Form.Control.Feedback>
                )}
              </>
            )}
          </FastField>
        </InputGroup>
      </Col>
    </FormGroup>
  )

  return (
    <Formik
      initialValues={initialForm}
      validationSchema={validationSchema}
      onSubmit={async (values, { setSubmitting, resetForm }) => {
        let formatted = {
          old_password: values.oldPassword,
          new_password: values.newPassword,
        }

        try {
          await api.put("user/profile", formatted)
          openSnackbar(
            `Password has been successfully changed.`
          )
          signout()
        } catch(e) {

        }
      }}
    >
      {({
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
      }) => {
        return (
          <Form onSubmit={handleSubmit}>
            <Card style={{marginBottom: 0}}>
              <Card.Body>
                <h3 className="card-heading">Two Factor Authentication</h3>
                <div style={{ padding: "0 15px 40px 0" }}>
                  <Button
                    style={{ background: "#E84D0E", border: "#E84D0E" }}
                  >
                    Enable two factor authentication
                  </Button>
                </div>
                

                <h3 className="card-heading">Change Password</h3>
                <div style={{ padding: "0 15px 15px" }}>
                  <FormValidate
                    label="Old Password"
                    name="oldPassword"
                    type={oldPassType}
                    placeholder="Enter your old password"
                    endIcon={() => (
                      <i 
                      onClick={() => setOldPassType(oldPassType === "text" ? "password" : "text")}
                      className={`fa ${oldPassType === "password" ? "fa-eye-slash" : "fa-eye"}`}></i>
                    )}
                  />
                  <FormValidate
                    label="New Password"
                    name="newPassword"
                    type={newPassType}
                    placeholder="Enter your new password"
                    endIcon={() => (
                      <i 
                      onClick={() => setNewPassType(newPassType === "text" ? "password" : "text")}
                      className={`fa ${newPassType === "password" ? "fa-eye-slash" : "fa-eye"}`}></i>
                    )}
                  />
                  <FormValidate
                    label="Confirm Your Password"
                    name="confirmPassword"
                    type={confirmPassType}
                    placeholder="Confirm your password"
                    endIcon={() => (
                      <i 
                      onClick={() => setConfirmPassType(confirmPassType === "text" ? "password" : "text")}
                      className={`fa ${confirmPassType === "password" ? "fa-eye-slash" : "fa-eye"}`}></i>
                    )}
                  />
                </div>

                {
                  props.isMobile ? (
                    <div className="mb-5 ml-1 row justify-content-md-start justify-content-center">
                      <Button
                        variant="primary"
                        type="submit"
                        disabled={!dirty || !isValid}
                        style={{ marginRight: 15 }}
                      >
                        SAVE
                      </Button>
                      <Button
                        variant="secondary"
                        onClick={() => props.history.push("/")}
                      >
                        CANCEL
                      </Button>
                    </div>
                  ) : ""
                }
              </Card.Body>
            </Card>
            {
              props.isMobile ? "" : (
                <div className="mt-4 mb-5 ml-1 row justify-content-md-start justify-content-center">
                  <Button
                    variant="primary"
                    type="submit"
                    disabled={!dirty || !isValid}
                    style={{ marginRight: 15 }}
                  >
                    SAVE
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={() => props.history.push("/")}
                  >
                    CANCEL
                  </Button>
                </div>
              )
            }
          </Form>
        )
      }}
    </Formik>


    
  );
}

export default SecuritySettings;
