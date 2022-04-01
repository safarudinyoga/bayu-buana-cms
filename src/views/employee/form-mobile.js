import React, { useEffect, useState } from "react"
import { withRouter, useHistory } from "react-router"
import {
  Row,
  Col,
  Card,
  Button,
  Image,
  Accordion,
} from "react-bootstrap"
import FormikControl from "../../components/formik/formikControl"
import useQuery from "lib/query"
import { ReactSVG } from "react-svg"
import TextError from "components/formik/textError"
import { Form, Formik, Field, ErrorMessage } from "formik"
import "./employee-form.css"

const EmployeeFormMobile = (props) => {
  const history = useHistory()
  const isView = useQuery().get("action") === "view"



  const MenuWrapper = ({tab, title, children}) => {
    let disabledMenu = tab === "emergency-contacts"
    ? props.finishStep < 1 && !props.id
    : tab === "employment"
    ? props.finishStep < 2 && !props.id
    : false
    return (
      <Card className="mb-0">
        <Accordion.Toggle
          as={Card.Header}
          eventKey={tab}
          style={
            props.tabKey === tab
              ? { backgroundColor: "#dddddd", color: "#038072" }
              : null
          }
          onClick={() => {
            console.log(tab, disabledMenu)
            !disabledMenu && props.toggleActiveKey(tab)
          }}
        >
          <div style={{ display: "inline-flex" }}>
            <ReactSVG
              src={`/img/icons/${tab}.svg`}
              className={
                props.tabKey === tab
                  ? "icon-active"
                  : "icon-grey"
              }
            />
            <span style={{ paddingLeft: "10px" }}>
              {title}
            </span>
          </div>
        </Accordion.Toggle>
        <Accordion.Collapse eventKey={tab}>
          <Card.Body style={tab === "employment" ? { height: 750 } : {}}>
            {children}
          </Card.Body>
        </Accordion.Collapse>
      </Card>
    )
  }

  const GIFormik = ({tab, title}) => (
    <Formik
      initialValues={props.formValues || props.initialValues}
      validationSchema={props.GI_validationSchema}
      onSubmit={props.onSubmit}
      validateOnMount
      enableReinitialize
    >
      {(formik) => {
        return (
          <Form>
            <MenuWrapper tab={tab} title={title}>
            <h3 className="card-heading">General Information</h3>
              <div style={{ padding: "15px 0" }}>
                <Row>
                  <Col lg={11} className="order-last order-lg-first ">
                    <FormikControl
                      control="selectAsync"
                      required={isView ? "" : "label-required"}
                      label="Title"
                      name="name_prefix_id"
                      placeholder={formik.values.name_prefixName || "Mr."}
                      url={`master/name-prefixes`}
                      fieldName={"name_prefix_name"}
                      onChange={(v) => {
                        formik.setFieldValue("name_prefix_id", v)
                      }}
                      style={{ maxWidth: 120 }}
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
                      required={isView ? "" : "label-required"}
                      label="First Name"
                      name="given_name"
                      style={{ maxWidth: 250 }}
                      disabled={isView}
                      maxLength="128"
                    />
                    <FormikControl
                      control="input"
                      label="Middle Name"
                      name="middle_name"
                      style={{ maxWidth: 250 }}
                      disabled={isView}
                      maxLength="128"
                    />
                    <FormikControl
                      control="input"
                      required={isView ? "" : "label-required"}
                      label="Last Name"
                      name="surname"
                      style={{ maxWidth: 250 }}
                      disabled={isView}
                      maxLength="128"
                    />

                    <Row className="form-group required">
                      <Col md={3} lg={4}>
                        <label className="text-label-input">
                          Date Of Birth
                          <span
                            className={isView ? "" : "label-required"}
                          />
                        </label>
                      </Col>
                      <Col className="mb-2" md={9} lg={8}>
                        <div
                          style={{
                            maxWidth: 400,
                            display: "flex",
                          }}
                        >
                          <div style={{ marginRight: 12, flex: 1 }}>
                            <FormikControl
                              control="selectOnly"
                              name="birth_date[0]"
                              placeholder={"Day"}
                              options={props.selectDay(formik.values.birth_date[1], formik.values.birth_date[2])}
                              onChange={(v) => {
                                formik.setFieldValue("birth_date[0]", v)
                              }}
                              components={
                                isView
                                  ? {
                                      DropdownIndicator: () => null,
                                      IndicatorSeparator: () => null,
                                    }
                                  : null
                              }
                              style={{
                                minWidth: 75,
                                maxWidth: 240,
                              }}
                              isDisabled={isView}
                            />
                          </div>
                          <div style={{ marginRight: 12, flex: 1 }}>
                            <FormikControl
                              control="selectOnly"
                              name="birth_date[1]"
                              placeholder={"Month"}
                              options={props.selectMonth(formik.values.birth_date[2])}
                              onChange={(v) => {
                                formik.setFieldValue(
                                  "birth_date[1]",
                                  v,
                                )
                                formik.setFieldValue(
                                  "birth_date[0]",
                                  {
                                    value: 1,
                                    label: 1,
                                  },
                                )
                              }}
                              components={
                                isView
                                  ? {
                                      DropdownIndicator: () => null,
                                      IndicatorSeparator: () => null,
                                    }
                                  : null
                              }
                              style={{
                                minWidth: 110,
                                maxWidth: 240,
                              }}
                              isDisabled={isView}
                            />
                          </div>
                          <div style={{ marginRight: 12, flex: 1 }}>
                            <FormikControl
                              control="selectOnly"
                              name="birth_date[2]"
                              placeholder={"Year"}
                              options={props.selectYear()}
                              onChange={(v) => {
                                formik.setFieldValue(
                                  "birth_date[2]",
                                  v,
                                )
                                formik.setFieldValue(
                                  "birth_date[1]",
                                  {
                                    value: 1,
                                    label: "January",
                                  },
                                )
                                formik.setFieldValue(
                                  "birth_date[0]",
                                  {
                                    value: 1,
                                    label: "1",
                                  },
                                )
                              }}
                              components={
                                isView
                                  ? {
                                      DropdownIndicator: () => null,
                                      IndicatorSeparator: () => null,
                                    }
                                  : null
                              }
                              style={{
                                minWidth: 82,
                                maxWidth: 240,
                              }}
                              isDisabled={isView}
                            />
                          </div>
                        </div>
                        <ErrorMessage
                          component={TextError}
                          name="birth_date"
                        />
                      </Col>
                    </Row>
                    <FormikControl
                      control="radio"
                      required={isView ? "" : "label-required"}
                      label="Gender"
                      name="gender_id"
                      options={props.optionGender}
                      disabled={isView}
                    />
                    <FormikControl
                      control="input"
                      label="ID Card Number (KTP)"
                      name="ktp"
                      style={{ maxWidth: 250 }}
                      disabled={isView}
                      maxLength="36"
                    />
                  </Col>
                  <Col
                    lg={1}
                    className="d-flex justify-content-lg-center justify-content-md-start justify-content-center order-first order-lg-last p-0"
                  >
                    <div>
                      <div>
                      <FormikControl
                        control="imageProfile"
                        id="employee_icon"
                        type="imageProfile"
                        name="employee_asset"
                        onChange={(imageList) => {
                          formik.setFieldValue("employee_asset", imageList)
                        }}
                        disabled={isView}
                        photoProfile={formik.values.employee_asset}
                        url={formik.values.employee_asset?.data_url
                        }
                      />
                      </div>
                    </div>
                  </Col>
                </Row>
              </div>
              <h3 className="card-heading">Contacts</h3>
              <Row>
                <Col lg={11}>
                  <div style={{ padding: "0 15px 15px" }}>
                    <FormikControl
                      control="input"
                      required={isView ? "" : "label-required"}
                      label="Home Phone"
                      name="contact.phone_number"
                      style={{ maxWidth: 200 }}
                      disabled={isView}
                      minLength="1"
                      maxLength="32"
                    />
                    <FormikControl
                      control="input"
                      required={isView ? "" : "label-required"}
                      label="Mobile Phone"
                      name="contact.mobile_phone_number"
                      style={{ maxWidth: 200 }}
                      disabled={isView}
                      minLength="1"
                      maxLength="32"
                    />
                    <FormikControl
                      control="input"
                      required={isView ? "" : "label-required"}
                      label="Email"
                      name="contact.email"
                      style={{ maxWidth: 250 }}
                      disabled={isView}
                      maxLength="256"
                    />
                    <FormikControl
                      control="input"
                      label="Other Email"
                      name="contact.other_email"
                      style={{ maxWidth: 250 }}
                      disabled={isView}
                      maxLength="256"
                    />
                  </div>
                </Col>
                <Col lg={1}></Col>
              </Row>
              <h3 className="card-heading">Current Address</h3>
              <Row>
                  <Col lg={11}>
                    <div style={{ padding: "0 15px 15px" }}>
                      <FormikControl
                        control="textarea"
                        label="Address"
                        name="address.address_line"
                        rows={3}
                        style={{ maxWidth: 416 }}
                        disabled={isView}
                        minLength="1"
                        maxLength="512"
                      />
                      
                      <FormikControl
                        control="selectAsync"
                        required={isView ? "" : "label-required"}
                        label="Country"
                        name={"address.country_id"}
                        url={`master/countries`}
                        fieldName={"country_name"}
                        onChange={(v) => {                          
                          formik.setFieldValue("address.state_province_id", {
                            value: "00000000-0000-0000-0000-000000000000",
                            label: "Please choose",
                          })
                          formik.setFieldValue("address.city_id", {
                            value: "00000000-0000-0000-0000-000000000000",
                            label: "Please choose",
                          })
                          formik.setFieldValue("address.country_id", v)
                        }}
                        placeholder={"Please choose"}
                        style={{ maxWidth: 300 }}
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
                        control="selectAsync"
                        label="State/ Province"
                        name="address.state_province_id"                        
                        url={`master/state-provinces`}
                        fieldName={"state_province_name"}
                        urlFilter={`["country_id","=","${formik.values.address.country_id.value}"]`}
                        key={JSON.stringify(formik.values.address.country_id)}
                        isLoading={false}                        
                        onChange={(v) => {
                          formik.setFieldValue("address.state_province_id", v)
                          formik.setFieldValue("address.city_id", {
                            value: "00000000-0000-0000-0000-000000000000",
                            label: "Please choose",
                          })
                        }}
                        placeholder={"Please choose"}
                        style={{ maxWidth: 200 }}
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
                        control="selectAsync"
                        label="City"
                        name="address.city_id"
                        url={`master/cities`}
                        fieldName={"city_name"}
                        urlFilter={
                          formik.values.address.state_province_id.value ===
                          "00000000-0000-0000-0000-000000000000"
                            ? `["country_id","=","${formik.values.address.country_id.value}"]`
                            : `["country_id","=","${formik.values.address.country_id.value}"],["AND"],["state_province_id","=","${formik.values.address.state_province_id.value}"]`
                        }
                        key={JSON.stringify(
                          formik.values.address.state_province_id.value && formik.values.address.city_id.value,
                        )}
                        onChange={(v) => {
                          formik.setFieldValue("address.city_id", v)
                        }}
                        placeholder={"Please choose"}
                        style={{ maxWidth: 200 }}
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
                        label="Zip Code"
                        name="address.postal_code"
                        style={{ maxWidth: 100 }}
                        disabled={isView}
                        minLength="1"
                        maxLength="16"
                      />
                    </div>
                  </Col>
                  <Col lg={1}></Col>
                </Row>
                <h3 className="card-heading">Permanent Address</h3>
                <Row>
                  <Col lg={11}>
                    <div style={{ padding: "0 15px 15px" }}>
                      <input
                        control="checkboxOnly"
                        type="checkbox"
                        label="Same As Current Address"
                        name="same_address"
                        checked={formik.values.same_address}
                        onChange={() => {                          
                          formik.setFieldValue(
                            "same_address",
                            !formik.values.same_address,
                          )
                          formik.setFieldValue(
                            "permanent_address.country_id", !formik.values.same_address ? {
                              value: "00000000-0000-0000-0000-000000000000",
                              label: "Please choose",
                            } : {
                              value: formik.values.address.country_id.value,
                              label: formik.values.address.country_id.label,
                              
                            },                            
                          ) 
                          formik.setFieldValue(
                            "permanent_address.state_province_id", !formik.values.same_address ? {
                              value: "00000000-0000-0000-0000-000000000000",
                              label: "Please choose",
                            } : {
                              value: formik.values.address.state_province_id.value,
                              label: formik.values.address.state_province_id.label,
                            },                           
                          )
                          formik.setFieldValue(
                            "permanent_address.city_id", !formik.values.same_address ? {
                              value: "00000000-0000-0000-0000-000000000000",
                              label: "Please choose",
                            } : {
                              value: formik.values.address.city_id.value,
                              label: formik.values.address.city_id.label,
                            },                            
                          )
                        }}                       
                        style={{ maxWidth: 416, marginRight: 5 }}
                        disabled={isView}
                      />Same As Current Address
                      {formik.values.same_address ? (
                        <div>
                          <FormikControl
                            control="textarea"
                            label="Address"
                            name="address.address_line"
                            rows={3}
                            style={{ maxWidth: 416 }}
                            disabled={isView || formik.values.same_address}
                            minLength="1"
                            maxLength="512"
                          />
                          <FormikControl
                            control="selectAsync"
                            required={isView ? "" : "label-required"}
                            label="Country"
                            name={"address.country_id"}
                            url={`master/countries`}
                            fieldName={"country_name"}
                            onChange={(v) => {                              
                              formik.setFieldValue(
                                "address.state_province_id",
                                {
                                  value: "00000000-0000-0000-0000-000000000000",
                                  label: "Please choosess",
                                },
                              )
                              formik.setFieldValue("address.city_id", {
                                value: "00000000-0000-0000-0000-000000000000",
                                label: "Please choosess",
                              })
                              formik.setFieldValue("address.country_id", v)
                            }}
                            placeholder={"Please choose"}
                            style={{ maxWidth: 300 }}
                            components={
                              isView
                                ? {
                                    DropdownIndicator: () => null,
                                    IndicatorSeparator: () => null,
                                  }
                                : null
                            }
                            isDisabled={isView || formik.values.same_address}
                          />
                          <FormikControl
                            control="selectAsync"
                            label="State/ Province"
                            name="address.state_province_id"
                            url={`master/state-provinces`}
                            fieldName={"state_province_name"}
                            urlFilter={`["country_id","=","${formik.values.address.country_id.value}"]`}
                            isLoading={false}                            
                            onChange={(v) => {
                              formik.setFieldValue(
                                "address.state_province_id",
                                v,
                              )
                              formik.setFieldValue("address.city_id", {
                                value: "00000000-0000-0000-0000-000000000000",
                                label: "Please choose",
                              })
                            }}
                            placeholder={"Please choose"}
                            style={{ maxWidth: 200 }}
                            components={
                              isView
                                ? {
                                    DropdownIndicator: () => null,
                                    IndicatorSeparator: () => null,
                                  }
                                : null
                            }
                            isDisabled={isView || formik.values.same_address}
                          />
                          <FormikControl
                            control="selectAsync"
                            label="City"
                            name="address.city_id"
                            url={`master/cities`}
                            fieldName={"city_name"}
                            urlFilter={
                              formik.values.address.state_province_id ===
                              "00000000-0000-0000-0000-000000000000"
                                ? `["country_id","=","${formik.values.address.country_id.value}"]`
                                : `["country_id","=","${formik.values.address.country_id.value}"],["AND"],["state_province_id","=","${formik.values.address.state_province_id.value}"]`
                            }
                            key={JSON.stringify(
                              formik.values.address.state_province_id.value && formik.values.address.city_id.value,
                            )}                           
                            onChange={(v) => {
                              formik.setFieldValue("address.city_id", v)
                            }}
                            placeholder={"Please choose"}
                            style={{ maxWidth: 200 }}
                            components={
                              isView
                                ? {
                                    DropdownIndicator: () => null,
                                    IndicatorSeparator: () => null,
                                  }
                                : null
                            }
                            isDisabled={isView || formik.values.same_address}
                          />
                          <FormikControl
                            control="input"
                            label="Zip Code"
                            name="address.postal_code"
                            style={{ maxWidth: 100 }}
                            disabled={isView || formik.values.same_address}
                            minLength="1"
                            maxLength="16"
                          />
                        </div>
                      ) : (
                        <>
                          <FormikControl
                            control="textarea"
                            label="Address"
                            name="permanent_address.address_line"
                            rows={3}
                            style={{ maxWidth: 416 }}
                            disabled={isView || formik.values.same_address}
                            minLength="1"
                            maxLength="512"
                          />

                          <FormikControl
                            control="selectAsync"
                            required={isView ? "" : "label-required"}
                            label="Country"
                            name={"permanent_address.country_id"}
                            url={`master/countries`}
                            fieldName={"country_name"}
                            onChange={(v) => {                              
                              formik.setFieldValue(
                                "permanent_address.state_province_id",
                                {
                                  value: "00000000-0000-0000-0000-000000000000",
                                  label: "Please choose",
                                },
                              )
                              formik.setFieldValue(
                                "permanent_address.city_id",
                                {
                                  value: "00000000-0000-0000-0000-000000000000",
                                  label: "Please choose",
                                },
                              )
                              formik.setFieldValue(
                                "permanent_address.country_id", 
                                v,
                              )
                            }}
                            placeholder={"Please choose"}
                            style={{ maxWidth: 300 }}
                            components={
                              isView
                                ? {
                                    DropdownIndicator: () => null,
                                    IndicatorSeparator: () => null,
                                  }
                                : null
                            }
                            isDisabled={isView || formik.values.same_address}
                          />

                          <FormikControl
                            control="selectAsync"
                            label="State/ Province"
                            name="permanent_address.state_province_id"
                            url={`master/state-provinces`}
                            fieldName={"state_province_name"}
                            urlFilter={`["country_id","=","${formik.values.permanent_address.country_id.value}"]`}
                            key={JSON.stringify(
                              formik.values.permanent_address.country_id,
                            )}
                            onChange={(v) => {
                              formik.setFieldValue(
                                "permanent_address.state_province_id",
                                v,
                              )
                              formik.setFieldValue(
                                "permanent_address.city_id",
                                {
                                  value: "00000000-0000-0000-0000-000000000000",
                                  label: "Please choose",
                                },
                              )
                            }}
                            placeholder={"Please choose"}
                            style={{ maxWidth: 200 }}
                            components={
                              isView
                                ? {
                                    DropdownIndicator: () => null,
                                    IndicatorSeparator: () => null,
                                  }
                                : null
                            }
                            isDisabled={isView || formik.values.same_address}
                          />
                          <FormikControl
                            control="selectAsync"
                            label="City"
                            name="permanent_address.city_id"
                            url={`master/cities`}
                            fieldName={"city_name"}
                            urlFilter={
                              formik.values.permanent_address.state_province_id.value ===
                              "00000000-0000-0000-0000-000000000000"
                                ? `["country_id","=","${formik.values.permanent_address.country_id.value}"]`
                                : `["country_id","=","${formik.values.permanent_address.country_id.value}"],["AND"],["state_province_id","=","${formik.values.permanent_address.state_province_id.value}"]`
                            }
                            key={JSON.stringify(
                              formik.values.permanent_address.state_province_id.value && formik.values.permanent_address.city_id.value,
                            )}
                            onChange={(v) => {
                              formik.setFieldValue(
                                "permanent_address.city_id",
                                v,
                              )
                            }}
                            placeholder={"Please choose"}
                            style={{ maxWidth: 200 }}
                            components={
                              isView
                                ? {
                                    DropdownIndicator: () => null,
                                    IndicatorSeparator: () => null,
                                  }
                                : null
                            }
                            isDisabled={isView || formik.values.same_address}
                          />
                          <FormikControl
                            control="input"
                            label="Zip Code"
                            name="permanent_address.postal_code"
                            style={{ maxWidth: 100 }}
                            disabled={isView || formik.values.same_address}
                            minLength="1"
                            maxLength="16"
                          />
                        </>
                      )}
                    </div>
                  </Col>
                  <Col lg={1}></Col>
                </Row>
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
                    <button
                      className="text-button-cancel button-cancel"
                      onClick={() => history.goBack()}
                    >
                      BACK
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      className="text-button-save button-save"
                      type="submit"
                      disabled={
                        props.finishStep > 0 || props.match.params.id
                        ? !formik.isValid || formik.isSubmitting
                        : !formik.dirty || formik.isSubmitting
                    }
                      style={{ marginRight: 15 }}
                    >
                      {props.match.params.id ? "SAVE" : "SAVE & NEXT"}
                    </button>
                    <button
                      className="text-button-cancel button-cancel"
                      onClick={() => history.goBack()}
                    >
                      CANCEL
                    </button>
                  </>
                )}
              </div>
            </MenuWrapper>
          </Form>
        )
      }}
    </Formik>
  )

  const ECFormik = ({tab, title}) => (
    <Formik
      initialValues={props.formValues || props.initialValues}
      validationSchema={props.EC_validationSchema}
      onSubmit={props.onSubmit}
      validateOnMount
      enableReinitialize
    >
      {(formik) => {
        return (
          <Form>
            <MenuWrapper tab={tab} title={title}>
            <h3 className="card-heading">Emergency Contact 1</h3>
              <Row>
                <Col lg={11}>
                  <div style={{ padding: "15px 0" }}>
                    <FormikControl
                      control="input"
                      label="Full Name"
                      name="emergency_contact.contact_name"
                      style={{ maxWidth: 250 }}
                      disabled={isView}
                      minLength="1"
                      maxLength="128"
                    />
                    <FormikControl
                      control="input"
                      label="Phone Number"
                      name="emergency_contact.contact_phone_number"
                      style={{ maxWidth: 200 }}
                      disabled={isView}
                      minLength="1"
                      maxLength="32"
                    />
                    <FormikControl
                      control="input"
                      label="Relationship"
                      name="emergency_contact.relationship"
                      style={{ maxWidth: 200 }}
                      disabled={isView}
                      minLength="1"
                      maxLength="36"
                    />
                  </div>
                </Col>
                <Col lg={1}></Col>
              </Row>

              <h3 className="card-heading">Emergency Contact 2</h3>
              <Row>
                <Col lg={11}>
                  <div style={{ padding: "15px 0" }}>
                    <FormikControl
                      control="input"
                      label="Full Name"
                      name="emergency_contact2.contact_name"
                      style={{ maxWidth: 250 }}
                      disabled={isView}
                      minLength="1"
                      maxLength="128"
                    />
                    <FormikControl
                      control="input"
                      label="Phone Number"
                      name="emergency_contact2.contact_phone_number"
                      style={{ maxWidth: 200 }}
                      disabled={isView}
                      minLength="1"
                      maxLength="32"
                    />
                    <FormikControl
                      control="input"
                      label="Relationship"
                      name="emergency_contact2.relationship"
                      style={{ maxWidth: 200 }}
                      disabled={isView}
                      minLength="1"
                      maxLength="36"
                    />
                  </div>
                </Col>
                <Col lg={1}></Col>
              </Row>
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
                      <button
                        className="text-button-cancel button-cancel"
                        onClick={() => history.goBack()}
                      >
                        BACK
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        className="text-button-save button-save mr-2"
                        type="submit"
                        disabled={formik.isSubmitting || !formik.isValid}
                        style={{ marginRight: 15 }}
                      >
                        {props.match.params.id ? "SAVE" : "SAVE & NEXT"}
                      </button>
                      <button
                        className="text-button-cancel button-cancel"
                        onClick={() => history.goBack()}
                      >
                        CANCEL
                      </button>
                    </>
                  )}
                </div>
            </MenuWrapper>
          </Form>
        )
      }}
    </Formik>
  )

  const EmploymentFormik = ({tab, title}) => (
    <Formik
      initialValues={props.formValues || props.initialValues}
      validationSchema={props.Employment_validationSchema}
      onSubmit={props.onSubmit}
      validateOnMount
      enableReinitialize
    >
      {(formik) => {
        let employee_number_size = {
          label: {
            xs: 5
          },
          value: {
            xs: 7
          }
        }
        return (
          <Form>
            <MenuWrapper tab={tab} title={title}>
              <h3 className="card-heading">Employment</h3>
                <Row>
                  <Col lg={11}>
                    <div style={{ padding: "15px 0" }}>
                      <FormikControl
                        control="input"
                        required={isView ? "" : "label-required"}
                        name="employee_number"
                        label="Employee ID"
                        style={{ maxWidth: 160 }}
                        disabled={isView}
                        minLength="1"
                        maxLength="36"
                        size={employee_number_size}
                      />
                      <FormikControl
                        control="selectAsync"
                        required={isView ? "" : "label-required"}
                        label="Job Title"
                        name="job_title_id"
                        url={`master/job-titles`}
                        fieldName={"job_title_name"}
                        onChange={(v) => {
                          formik.setFieldValue("job_title_id", v)
                        }}
                        placeholder={"Please choose"}
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
                        control="selectAsync"
                        label="Division"
                        name="division_id"
                        url={`master/divisions`}
                        fieldName={"division_name"}
                        onChange={(v) => {
                          formik.setFieldValue("division_id", v)
                        }}
                        placeholder={"Please choose"}
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
                        control="selectAsync"
                        label="Branch Office"
                        name="office_id"
                        url={`master/offices`}
                        fieldName={"office_name"}
                        onChange={(v) => {
                          formik.setFieldValue("office_id", v)
                        }}
                        placeholder={"Please choose"}
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
                      <Row className="required">
                        <Col md={3} lg={4}>
                          <label className="text-label-input">
                            Hiring Date
                            <span className="label-required" />
                          </label>
                        </Col>
                        <Col className="mb-2" md={9} lg={8}>
                          <div
                            style={{
                              maxWidth: 400,
                              display: "flex",
                            }}
                          >
                            <div style={{ marginRight: 12, flex: 1 }}>
                              <FormikControl
                                control="selectOnly"
                                name="hire_date[0]"
                                onChange={(v) => {
                                  formik.setFieldValue("hire_date[0]", v)
                                }}
                                options={props.selectDay(formik.values.hire_date[1], formik.values.hire_date[2])}
                                placeholder={"Day"}
                                style={{
                                  minWidth: 75,
                                  maxWidth: 240,
                                }}
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
                            </div>
                            <div style={{ marginRight: 12, flex: 1 }}>
                              <FormikControl
                                control="selectOnly"
                                name="hire_date[1]"
                                placeholder={"Month"}
                                options={props.selectMonth(formik.values.hire_date[2])}
                                onChange={(v) => {
                                  formik.setFieldValue(
                                    "hire_date[1]",
                                    v,
                                  )
                                  formik.setFieldValue(
                                    "hire_date[0]",
                                    {
                                      value: 1,
                                      label: "1",
                                    },
                                  )
                                }}
                                style={{
                                  minWidth: 110,
                                  maxWidth: 240,
                                }}
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
                            </div>
                            <div style={{ marginRight: 12, flex: 1 }}>
                              <FormikControl
                                control="selectOnly"
                                name="hire_date[2]"
                                placeholder={"Year"}
                                options={props.selectYear()}
                                onChange={(v) => {
                                  formik.setFieldValue(
                                    "hire_date[2]",
                                    v,
                                  )
                                  formik.setFieldValue(
                                    "hire_date[1]",
                                    {
                                      value: 1,
                                      label: "January",
                                    },
                                  )
                                  formik.setFieldValue(
                                    "hire_date[0]",
                                    {
                                      value: 1,
                                      label: "1",
                                    },
                                  )
                                }}
                                style={{
                                  minWidth: 82,
                                  maxWidth: 240,
                                }}
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
                            </div>
                          </div>
                        </Col>
                      </Row>
                      <FormikControl
                        control="input"
                        label="NPWP"
                        name="npwp"
                        disabled={isView}
                        minLength="1"
                        maxLength="36"
                      />
                    </div>
                  </Col>
                  <Col lg={1}></Col>
                </Row>

                {props.additionalRole && (
                  <>
                    <div style={{ padding: "0 15px 15px" }}>
                      <h6 className="mt-2">Employment</h6>
                      <div className="p-2">
                        {/* <FormikControl
                                    control="selectAsync"
                                    required="label-required"
                                    label="Job Title"
                                    name="job_title_id"
                                    url={`master/job-titles`}
                                    fieldName={"job_title_name"}
                                    onChange={(v) => {
                                      formik.setFieldValue("job_title_id", v)
                                    }}
                                    placeholder={
                                      formik.values.job_title_id ||
                                      "Please choose"
                                    }
                                    style={{ maxWidth: 200 }}
                                  />
                                  <FormikControl
                                    control="selectAsync"
                                    label="Division"
                                    name="division_id"
                                    url={`master/divisions`}
                                    fieldName={"division_name"}
                                    onChange={(v) => {
                                      formik.setFieldValue("division_id", v)
                                    }}
                                    placeholder={
                                      formik.values.division_id ||
                                      "Please choose"
                                    }
                                    style={{ maxWidth: 200 }}
                                  /> */}
                      </div>
                    </div>
                  </>
                )}
                <div className="d-flex flex-row-reverse">
                  <div
                    onClick={props.setAditionalRoleFn}
                    style={{
                      color: "#1743BE",
                      fontSize: 13,
                      cursor: "pointer",
                    }}
                  >
                    Add Additional Role
                  </div>
                </div>
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
                      <button
                        className="text-button-cancel button-cancel"
                        onClick={() => history.goBack()}
                      >
                        BACK
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        className="text-button-save button-save mr-2"
                        type="submit"
                        disabled={!formik.isValid}
                        style={{ marginRight: 15 }}
                      >
                        SAVE
                      </button>
                      <button
                        className="text-button-cancel button-cancel"
                        onClick={() => history.goBack()}
                      >
                        CANCEL
                      </button>
                    </>
                  )}
                </div>
            </MenuWrapper>
          </Form>
        )
      }}
    </Formik>
  )

  return (
    <div className={props.className}>
      <Accordion activeKey={props.tabKey}>
        <GIFormik tab={"general-information"} title={"General Information"} />
        <ECFormik tab={"emergency-contacts"} title={"Emergency Contacts"} />
        <EmploymentFormik tab={"employment"} title={"Employment"} />
      </Accordion>
    </div>
          
  )
}

export default withRouter(EmployeeFormMobile)
