import React, { useEffect, useState, useRef } from "react"
import { withRouter, useHistory, Link } from "react-router-dom"
import {
  Card,
  Form,
  Row,
  Col,
  OverlayTrigger,
  Button,
  Tooltip,
  Tab,
  Nav,
  Modal,
  Table,
} from "react-bootstrap"
import { useWindowSize } from "rooks"
import AccessManagerRow from "components/table/access-manager-row"
import FormHorizontal from "components/form/horizontal"
import SelectAsync from "components/form/select-async"
import createIcon from "assets/icons/create.svg"
import { Formik, FastField, Field } from "formik"
import * as Yup from "yup"
import { ReactSVG } from "react-svg"
import axios from "axios"
import { useDispatch } from "react-redux"
import { setAlert, setUIParams } from "redux/ui-store"
import Api from "config/api"
import env from "config/environment"
import Select from "components/form/select-async"
import FormInputSelectAjax from "components/form/input-select-ajax"
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css"
import "react-dropzone-uploader/dist/styles.css"

const backUrl = "/master/user-management"

const FlightForm = (props) => {
  const history = useHistory()
  let dispatch = useDispatch()
  const [selectCountry, setSelectCountry] = useState([])
  const [selectHotelBrand, setSelectHotelBrand] = useState([])
  const [modalShow, setModalShow] = useState(false)
  let api = new Api()
  const [modules, setModules] = useState([])
  const [show, setShow] = useState(false)
  const target = useRef(null)

  //module
  useEffect(async () => {
    try {
      let res = await api.get("/master/menu-links?size=999&sort=sort")
      const cat = []
      const mod = []
      const comp = []

      res.data.items.forEach((data) => {
        if (!data.parent_link_id) {
          cat.push(data)
        } else {
          mod.push(data)
        }
      })

      console.log(cat)
      let listMod = mod.map((m) => {
        let catObj = cat.filter((c) => m.parent_link_id.includes(c.id))
        if (catObj.length > 0) {
          let catName = catObj[0].menu_link_name
          m.categoryName = catName
          comp.push(
            <AccessManagerRow
              moduleName={m.menu_link_name}
              category={m.categoryName}
            />,
          )
        }
      })
      // console.log(comp);
      setModules(comp)
    } catch (e) {
      console.log(e)
      throw e
    }
  }, [])

  useEffect(async () => {
    let api = new Api()
    let formId = props.match.params.id
    let docTitle = "Edit Flight Standard Ancillary Fee"
    if (!formId) {
      docTitle = "Create User Management"
    }
    dispatch(
      setUIParams({
        title: docTitle,
        breadcrumbs: [
          {
            text: "User & Acccess Management",
          },
          {
            link: backUrl,
            text: "User Management",
          },
          {
            text: docTitle,
          },
        ],
      }),
    )
  })
  // Initialize form
  const initialForm = {
    // General Information
    employee: "",
    user_type: "",
  }

  const initialFormModalAddMap = {
    caption: "",
    image: "",
  }

  // Schema for yup
  const validationSchema = Yup.object().shape({
    employee: Yup.object().required("Employee is required."),
    user_type: Yup.object().required("Employee is required."),
  })
  let [selectedJobTitle, setSelectedJobTitle] = useState([])
  let [selectedJobTitleIds, setSelectedJobTitleIds] = useState([])
  let [selectedDivision, setSelectedDivision] = useState([])
  let [selectedDivisionIds, setSelectedDivisionIds] = useState([])
  let [selectedOffice, setSelectedOffice] = useState([])
  let [selectedOfficeIds, setSelectedOfficeIds] = useState([])
  const { innerWidth, innerHeight, outerHeight, outerWidth } = useWindowSize()

  return (
    <>
      <Formik
        initialValues={initialForm}
        validationSchema={validationSchema}
        validateOnChange={false}
        onSubmit={async (values, { setSubmitting, resetForm }) => {}}
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
          <Form onSubmit={handleSubmit}>
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
                        <div style={{ maxWidth: 200 }}>
                          <SelectAsync
                            {...field}
                            isClearable
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
                            // components={
                            //   isView
                            //     ? {
                            //         DropdownIndicator: () => null,
                            //         IndicatorSeparator: () => null,
                            //       }
                            //     : null
                            // }
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

                    <Form.Label column md={3}>
                      <Nav.Link href={`/master/employee/form`}>
                        Create New Employee
                      </Nav.Link>
                    </Form.Label>
                  </Form.Group>

                  <Form.Group as={Row} className="mb-3">
                    <Form.Label column md={2}>
                      User Type
                    </Form.Label>
                    <FastField name="user_type">
                      {({ field, form }) => (
                        <div style={{ maxWidth: 200 }}>
                          <SelectAsync
                            {...field}
                            isClearable
                            url={`user/user-types`}
                            fieldName="user_type_name"
                            onChange={(v) => {
                              setFieldValue("user_type", v)
                            }}
                            placeholder="Please choose"
                            className={`react-select ${
                              form.touched.user_type && form.errors.user_type
                                ? "is-invalid"
                                : null
                            }`}
                            // components={
                            //   isView
                            //     ? {
                            //         DropdownIndicator: () => null,
                            //         IndicatorSeparator: () => null,
                            //       }
                            //     : null
                            // }
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
                    <OverlayTrigger
                      placement="bottom"
                      overlay={
                        <Tooltip id={`tooltip`}>
                          <div
                            {...props}
                            style={{
                              position: "absolute",
                              backgroundColor: "#FFFFFF",
                              padding: "10px 50px",
                              color: "black",
                              borderRadius: 3,

                              boxShadow:
                                "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
                              ...props.style,
                            }}
                          >
                            MODULE ACCESS LIST
                            <FormHorizontal>
                              <Table responsive>
                                <thead
                                  style={{
                                    backgroundColor: "#5E5E5E",
                                  }}
                                >
                                  <tr
                                    style={{
                                      color: "white",
                                    }}
                                  >
                                    <th>Module Name</th>
                                    <th>Category</th>
                                    <th>View</th>
                                    <th>Create</th>
                                    <th>Delete</th>
                                    <th>Edit</th>
                                    <th>Mass Update</th>
                                    <th>Export</th>
                                  </tr>
                                </thead>
                                <tbody>{modules}</tbody>
                              </Table>
                            </FormHorizontal>
                          </div>
                        </Tooltip>
                      }
                    >
                      <Form.Label
                        column
                        md={2}
                        style={{ color: "#3E40AE", marginLeft: "14px" }}
                      >
                        {" "}
                        View module access list
                      </Form.Label>
                    </OverlayTrigger>
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
          </Form>
        )}
      </Formik>
    </>
  )
}

export default withRouter(FlightForm)
