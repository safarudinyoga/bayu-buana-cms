import React, { useEffect, useState } from "react"
import {
  Card,
  Form,
  Row,
  Col,
  Button,
  Image,
  Tab,
  Nav,
  Modal,
} from "react-bootstrap"
import { Formik, FastField, Field } from "formik"
import * as Yup from "yup"
import { Editor } from "react-draft-wysiwyg"
import FormAlert from "components/form/alert";
import { ReactSVG } from "react-svg"
import Dropzone from "react-dropzone-uploader"
import axios from "axios"
import useQuery from "lib/query"
import { useDispatch } from "react-redux"
import { setAlert, setUIParams } from "redux/ui-store"

import Api from "config/api"
import env from "config/environment"
import Select from "components/form/select-async"

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css"
import "react-dropzone-uploader/dist/styles.css"

const endpoint = "/integration-partner-hotels"

const ModalCreate = (props) => {
  const isView = useQuery().get("action") === "view"
  let dispatch = useDispatch()

  const [selectCountry, setSelectCountry] = useState([])
  const [selectHotelBrand, setSelectHotelBrand] = useState([])
  const [modalShow, setModalShow] = useState(false)
  const [translations, setTranslations] = useState([])
  const [loading, setLoading] = useState(true)
  const [value1, setValue1] = useState("")

  let api = new Api()

  // Initialize form
  const initialForm = {
    // General Information
    hotelCode: "",
    hotelName: "",
    hotelBrand: "",
    starRating: "",
    numberOfRooms: "",
  }

  const initialFormAdd = {
    roomType: "",
    roomTypeCode: "",
    roomTypeName: "",
  }
  // Schema for yup
  const validationSchema = Yup.object().shape({
    // General Information
    hotelCode: Yup.string()
      .required("Hotel Code is required.")
      .test(
        "Unique Code",
        "Hotel Code already exists", // <- key, message
        (value) => {
          return new Promise((resolve, reject) => {
            axios
              .get(
                `${env.API_URL}/integration-partner-hotels/`,
              )
              .then((res) => {
                resolve(res.data.items.length == 0)
              })
              .catch((error) => {
                resolve(false)
              })
          })
        },
      ),
  })

  const validationSchemaModalAddMap = Yup.object().shape({
    roomType: Yup.string().required("Caption is required."),
    roomTypeCode: Yup.string().required("Caption is required."),
    roomTypeName: Yup.string().required("Caption is required."),
  })


  

  useEffect(async () => {
    let api = new Api()
    let formId = ""

    let docTitle = "Edit Aircraft"
    if (!formId) {
      docTitle = "Create Aircraft"
    } else if (isView) {
      docTitle = "View Aircraft"
    }

    dispatch(
      setUIParams({
        title: isView ? "Aircraft Details" : docTitle,
        breadcrumbs: [
          {
            text: "Setup and Configurations",
          },
          {
            link: props.backUrl,
            text: "Aircrafts",
          },
          {
            text: docTitle,
          },
        ],
      }),
    )
    if (formId) {
      try {
        let res = await api.get(endpoint + "/" + formId)
      } catch (e) {}

      try {
        let res = await api.get(endpoint + "/" + formId + "/translations", {
          size: 50,
        })
        setTranslations(res.data.items)
      } catch (e) {}
      setLoading(false)
    } else {
    }
  }, [])

  const save = async (e, value) => {
      e.preventDefault()
      const payload = {
        "description": "esse eu laboris do ullamco",
        "hotel_id": "ebfe7458-2d01-fe1e-0dd1-625270611b41",
        "is_accrual": false,
        "is_non_smoking": true,
        "is_redeemable": false,
        "max_occupancy": 10,
        "number_of_beds": 10,
        "number_of_rooms": 10,
        "room_classification_id": "249ac09c-a6d7-1e94-b5a6-bbe44ecb2b50",
        "room_location_type_id": "urn:uuid:d2960df5-4149-b218-64b1-d2f8ebee9de5",
        "room_size": 25,
        "room_size_unit_of_measure_id": "bd2b8335-124f-e1d1-32f0-48397e60e70e",
        "room_type_code": value.roomTypeCode,
        "room_type_name": value.roomTypeName,
        "room_view_type_id": "urn:uuid:5a8fe6c1-e625-aa8e-1db9-84bff6383356",
        "segment_category_id": "db7c7f00-5273-2d33-9cf4-6dfe6c1bdeac"
      };
      console.log(payload, 'payload');
      return new Promise((resolve, rejecet) => {
        axios.post(api.env.endpoint("/master/room-types"), payload)
            .then((res) => {
                // props.history.goBack()
                if (res.status === 200) {
                  props.onHide(false)
                  return (
                    <FormAlert
                      isValid={true}
                      message={"succes"}
                    />
                  )
                }
            })
            .catch((error) => {
                resolve(false)
            })
      })
  }

  return (
    <div>
      <Formik
        initialValues={initialFormAdd}
        validationSchema={validationSchemaModalAddMap}
        validateOnChange={false}
        // onSubmit={async (values, { setSubmitting, resetForm }) => {
        //   console.log(values, 'sini ya<<<')
        // }}
        onSubmit={save}
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
          <Form onSubmit={(e) => save(e, values)}
            style={{background: 'transparent'}}
          >
                <div style={{ padding: "0 10px 10px" }}>
                  <Row>
                    <Col sm={12}>
                      <Form.Group as={Row} className="form-group" style={{display: 'flex', justifyContent: 'space-between'}}>
                        <Form.Label column sm={4.5} style={{fontSize: 15}} >
                          Room Type
                          <span className="form-label-required">*</span>
                        </Form.Label>
                        <Col sm={7}>
                          <FastField name="roomType">
                            {({ field, form }) => (
                              <div style={{ }}>
                                <Select
                                  {...field}
                                  url={`master/room-types`}
                                  fieldName="room_type_name"
                                  onChange={(v) => {
                                      setFieldValue("roomType", v)
                                  }}
                                  placeholder="Please choose Star Rating"
                                  className={`react-select ${
                                    form.touched.starRating &&
                                    form.errors.starRating
                                      ? "is-invalid"
                                      : null
                                  }`}
                                />
                                {form.touched.starRating &&
                                  form.errors.starRating && (
                                    <Form.Control.Feedback type="invalid">
                                      {form.touched.starRating
                                        ? form.errors.starRating
                                        : null}
                                    </Form.Control.Feedback>
                                  )}
                              </div>
                            )}
                          </FastField>
                        </Col>
                      </Form.Group>
                      <Form.Group as={Row} className="form-group" style={{display: 'flex'}}>
                        <Form.Label column sm={4.5} style={{fontSize: 15}}>
                            Partner Room Type Code
                          <span className="form-label-required">*</span>
                        </Form.Label>
                        <Col sm={7} style={{marginLeft: 25}}>
                          <FastField name="roomTypeCode">
                            {({ field }) => (
                              <>
                                <Form.Control
                                  type="text"
                                  maxLength={9999}
                                  style={{ width: 100 }}
                                  {...field}
                                />
                              </>
                            )}
                          </FastField>
                        </Col>
                      </Form.Group>
                      <Form.Group as={Row} className="form-group" style={{display: 'flex'}}>
                        <Form.Label column sm={4.5} style={{fontSize: 15}}>
                            Partner Room Type Name
                          <span className="form-label-required">*</span>
                        </Form.Label>
                        <Col sm={7} style={{marginLeft: 20}}>
                          <FastField name="roomTypeName">
                            {({ field }) => {
                                return(
                                    <>
                                        <Form.Control
                                            onChange={() => console.log("diganti<<")}
                                            value={field.name}
                                            type="text"
                                            maxLength={9999}
                                            style={{ width: 200 }}
                                            {...field}
                                        />
                                    </>
                                )
                            }}
                          </FastField>
                        </Col>
                      </Form.Group>
                    </Col>
                  </Row>
                </div>
            <div style={{ marginBottom: 30, marginTop: 30, display: "flex" }}>
              <Button
                variant="primary"
                type="submit"
                disabled={isSubmitting || !dirty}
                style={{ marginRight: 15 }}
              >
                SAVE
              </Button>
              <Button
                variant="secondary"
                onClick={() => props.onHide(false)}
              >
                CANCEL
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default ModalCreate
