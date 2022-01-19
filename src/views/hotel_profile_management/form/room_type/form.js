import React, { useEffect } from "react"
import { useDispatch } from "react-redux"
import { setAlert, setUIParams } from "redux/ui-store"
import useQuery from "lib/query"
import { withRouter } from "react-router"
import { Formik, FastField, Field } from "formik"
import * as Yup from "yup"
import { Card, Form, Row, Col, Button, Tab, Nav } from "react-bootstrap"
import axios from "axios"

import Api from "config/api"
import env from "config/environment"
import Select from "components/form/select-async"

const backUrl = "/master/hotel-profile-management/form#room-type"

const HotelRoomType = (props) => {
  let dispatch = useDispatch()
  let api = new Api()

  const isView = useQuery().get("action") === "view"

  // Initialize form
  const initialForm = {
    roomTypeName: "",
    numberOfRooms: "",
    description: "",
    roomView: "",
    roomLocation: "",
    roomClassification: "",
    roomSize: "",
    maximumOccupancy: "",
  }

  // Schema for yup
  const validationSchema = Yup.object().shape({
    roomTypeName: Yup.string()
      .required("Room Type Name is required.")
      .test(
        "Unique Name",
        "Room Type Name already exists", // <- key, message
        (value) => {
          return new Promise((resolve, reject) => {
            axios
              .get(
                `${env.API_URL}/master/room-types?filters=["room_type_name","=","${value}"]`,
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
    numberOfRooms: Yup.string(),
    description: Yup.string(),
    roomView: Yup.string(),
    roomLocation: Yup.string(),
    roomClassification: Yup.string(),
    roomSize: Yup.string(),
    maximumOccupancy: Yup.string(),
  })

  useEffect(async () => {
    let formId = props.match.params.id

    let docTitle = "Edit Hotel Supplier"
    if (!formId) {
      docTitle = "Create Room Type"
    } else if (isView) {
      docTitle = "View Hotel Supplier"
    }

    dispatch(
      setUIParams({
        title: isView ? "Room Type Details" : docTitle,
        breadcrumbs: [
          {
            text: "Master Data Management",
          },
          {
            link: backUrl,
            text: "Hotel Profile Management",
          },
          {
            text: docTitle,
          },
        ],
      }),
    )
  })

  return (
    <Formik
      initialValues={initialForm}
      validationSchema={validationSchema}
      validateOnChange={false}
      onSubmit={async (values, { setSubmitting, resetForm }) => {
        console.log(values)
        console.log(props)
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
      }) => (
        <Form onSubmit={handleSubmit}>
          <Card>
            <Card.Body>
              <Row>
                <Col sm={12}>
                  <Form.Group as={Row} className="form-group">
                    <Form.Label column sm={2}>
                      Room Type Name
                      <span className="form-label-required">*</span>
                    </Form.Label>
                    <Col sm={10}>
                      <FastField name="roomTypeName">
                        {({ field, form }) => (
                          <>
                            <Form.Control
                              type="text"
                              isInvalid={
                                form.touched.roomTypeName &&
                                form.errors.roomTypeName
                              }
                              minLength={1}
                              maxLength={128}
                              {...field}
                            />
                            {form.touched.roomTypeName &&
                              form.errors.roomTypeName && (
                                <Form.Control.Feedback type="invalid">
                                  {form.touched.roomTypeName
                                    ? form.errors.roomTypeName
                                    : null}
                                </Form.Control.Feedback>
                              )}
                          </>
                        )}
                      </FastField>
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} className="form-group">
                    <Form.Label column sm={2}>
                      Number Of Rooms
                    </Form.Label>
                    <Col sm={10}>
                      <FastField name="numberOfRooms">
                        {({ field }) => (
                          <>
                            <Form.Control
                              type="number"
                              minLength={1}
                              maxLength={128}
                              {...field}
                            />
                          </>
                        )}
                      </FastField>
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} className="form-group">
                    <Form.Label column sm={2}>
                      Descriptions
                    </Form.Label>
                    <Col sm={10}>
                      <FastField name="description">
                        {({ field }) => (
                          <Form.Control
                            {...field}
                            as="textarea"
                            rows={3}
                            minLength={1}
                            maxLength={4000}
                          />
                        )}
                      </FastField>
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} className="form-group">
                    <Form.Label column sm={2}>
                      Room View
                    </Form.Label>
                    <Col sm={3}>
                      <FastField name="roomView">
                        {({ field, form }) => (
                          <Select
                            {...field}
                            url={`master/room-view-types`}
                            fieldName="room_view_type_name"
                            onChange={(v) => setFieldValue("roomView", v)}
                            placeholder="Please choose Room View"
                          />
                        )}
                      </FastField>
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} className="form-group">
                    <Form.Label column sm={2}>
                      Room Location
                    </Form.Label>
                    <Col sm={3}>
                      <FastField name="roomLocation">
                        {({ field, form }) => (
                          <Select
                            {...field}
                            url={`master/room-location-types`}
                            fieldName="room_location_type_name"
                            onChange={(v) => setFieldValue("roomLocation", v)}
                            placeholder="Please choose Room Location"
                          />
                        )}
                      </FastField>
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} className="form-group">
                    <Form.Label column sm={2}>
                      Room Classification
                    </Form.Label>
                    <Col sm={3}>
                      <FastField name="roomClassification">
                        {({ field, form }) => (
                          <Select
                            {...field}
                            url={`master/room-classifications`}
                            fieldName="room_classification_name"
                            onChange={(v) =>
                              setFieldValue("roomClassification", v)
                            }
                            placeholder="Please choose Room Location"
                          />
                        )}
                      </FastField>
                    </Col>
                  </Form.Group>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Form>
      )}
    </Formik>
  )
}

export default withRouter(HotelRoomType)
