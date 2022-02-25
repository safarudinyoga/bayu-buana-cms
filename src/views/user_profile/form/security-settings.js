import { FastField, Formik } from 'formik';
import React, { useState } from 'react';
import { Card, Form, Row, Col, Button, InputGroup, FormGroup } from "react-bootstrap"
import * as Yup from "yup"
import Api from "config/api"

const SecuritySettings = (props) => {
  let api = new Api()
  const [ oldPassType, setOldPassType] = useState("password")
  const [ newPassType, setNewPassType] = useState("password")
  const [ confirmPassType, setConfirmPassType] = useState("password")

  // Initialize form
  const initialForm = {
    // Change Password
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  }

  // Schema for yup
  const validationSchema = Yup.object().shape({
    // Change Password
    oldPassword: Yup.string().required("Old Password is required"),
    newPassword: Yup.string().required("New Password is required"),
    confirmPassword: Yup.string().required("Confirm password is required").oneOf([Yup.ref('newPassword'), null], 'New Password must match'),
  })

  const FormValidate = ({
    label,
    name,
    type="password",
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
        console.log(values)

        let formatted = {
          old_password: values.oldPassword,
          new_password: values.newPassword,
        }

        let res = await api.put("user/profile", formatted)

        return props.handleSelectTab("subscriptions")
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
        isSubmitting,
        setFieldValue,
        setFieldTouched,
      }) => {
        return (
          <Form onSubmit={handleSubmit}>
            <Card>
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
                    placeholder="Enter your password"
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
                    label="Confirm New Password"
                    name="confirmPassword"
                    type={confirmPassType}
                    placeholder="Enter your password"
                    endIcon={() => (
                      <i 
                      onClick={() => setConfirmPassType(confirmPassType === "text" ? "password" : "text")}
                      className={`fa ${confirmPassType === "password" ? "fa-eye-slash" : "fa-eye"}`}></i>
                    )}
                  />
                </div>
              </Card.Body>
            </Card>
            <div style={{ marginBottom: 30, marginTop: 30, display: "flex" }}>
              <Button
                variant="primary"
                type="submit"
                disabled={!dirty}
                style={{ marginRight: 15 }}
              >
                SAVE
              </Button>
              <Button
                variant="secondary"
                onClick={() => props.history.push(props.backUrl)}
              >
                CANCEL
              </Button>
            </div>
          </Form>
        )
      }}
    </Formik>


    
  );
}

export default SecuritySettings;
