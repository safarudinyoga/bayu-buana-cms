import React, { useEffect, useState } from "react"
import {
  Form,
  Row,
  Col,
  Button,
  Modal
} from "react-bootstrap"
import { Formik, FastField, Field, yupToFormErrors } from "formik"
import * as Yup from "yup"
import { useDispatch, useSelector } from "react-redux"
import { setAlert, setModalTitle, setCreateModal } from "redux/ui-store"
import Api from "config/api"
import _ from "lodash"
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css"
import "react-dropzone-uploader/dist/styles.css"
import { useParams } from "react-router-dom"
import CancelButton from "components/button/cancel";
import FormikControl from "../../../../../components/formik/formikControl"
import { setContentTitle } from "redux/ui-store"
import { ReactSVG } from "react-svg"
import createIcon from "assets/icons/create.svg"
const endpoint = "/master/integration-partners";
const FareFamilyModal = (props) => {
    let dispatch = useDispatch()
    const { id } = useParams()
    const [fareFormValues, setFareFormValues] = useState(null)
    const [cabinId, setCabinId] = useState(null)
    const [fareFamilyId, setFareFamilyId] = useState(null)
    const [loading, setLoading] = useState(true);
    let api = new Api()
    
    const initialFareFormValues = {
      fare_type_id: "",
      booking_class_1: "",
      booking_class_2: "",
      booking_class_3: "",
      booking_class_4: "",
      booking_class_5: "",
      booking_class_6: "",
      booking_class_7: "",
      booking_class_8: "",
    }
  
    Yup.addMethod(Yup.object, "optional", function(
      isOptional = true,
      defaultValue = ""
    ) {
      return this.transform(function(value){
        if(!isOptional) return value
  
        if (
          value &&
          Object.values(value).some(v => !(v === null || v === undefined || v === ""))
        ) {
          return value;
        }
  
        return defaultValue
      }).default(defaultValue)
    })
  
    const validationSchemaFare = Yup.object().shape( {
      fare_type_id: Yup.object()
        .shape({
          value: Yup.string(),
          label: Yup.string(),
        })
        .required("Fare Family is required.")
        .test(
          "unique-fare-family",
          "Fare Family already exists",
          async (value, context) => {
            let cabinId = props.partnerCabinId
            try {
              let res = await api.get(`${endpoint}/${id}/cabin-types/${cabinId}/fare-families?filters=["fare_type_id","=","${value.value}"]`)
              
              return res.data.items.length === 0
            } catch (error) {
              return false
            }
          }
        ),
      booking_class_1: Yup.string().optional(),
      booking_class_2: Yup.string().optional(),
      booking_class_3: Yup.string().optional(),
      booking_class_4: Yup.string().optional(),
      booking_class_5: Yup.string().optional(),
      booking_class_6: Yup.string().optional(),
      booking_class_7: Yup.string().optional(),
      booking_class_8: Yup.string().optional(),
    })
  
  
  
    const onSubmit = async (values, a) => {
      let datadata = []
      datadata.push(values.booking_class_1)
      let formatted = {
        fare_type_id: values.fare_type_id.value,
        booking_classes: datadata,
      }
  
      try {
        if(fareFamilyId){
          let res = await api.put(endpoint + "/" + id + "/cabin-types/" + cabinId + "/fare-families/" + fareFamilyId, formatted)
        } else {
          let res = await api.post(endpoint + "/" + id + "/cabin-types/" + cabinId + "/fare-families/", formatted)
        }
        dispatch(
          setAlert({
  
          })
        )
        
      } catch (error) {
        dispatch(
          setAlert({
              message: "Failed to save this record.",
          })
        );
      } 
    }
    useEffect(() => {
      if (!props.partnerCabinId) {
        setLoading(false);
      }
  
      if (fareFormValues) {
        setLoading(false);
      }
      setCabinId(props.partnerCabinId)
    }, [props.partnerCabinId, fareFormValues])
  
    return (
        <Formik
              initialValues={fareFormValues || initialFareFormValues}
              validationSchema={validationSchemaFare}
              onSubmit={onSubmit}
              enableReinitialize
              validateOnMount
            >
              {({ dirty, handleSubmit, isSubmitting, setFieldValue, handleChange, values }) =>(
                <Form onSubmit={handleSubmit}>
                  <FormikControl
                      control="selectAsync"
                      required={props.isView ? "" : "label-required"}
                      label="Fare Family"
                      name="fare_type_id"
                      placeholder={"Please Choose."}
                      url={`master/fare-types`}
                      fieldName={"fare_type_name"}
                      onChange={(v) => {
                        setFieldValue("fare_type_id", v)
                      }}
                      size={props.size}
                      components={
                        props.isView
                              ? {
                                    DropdownIndicator: () => null,
                                    IndicatorSeparator: () => null,
                                }
                              : null
                      }
                      isDisabled={props.isView}
                  />
  
  
                  <Form.Group as={Row} className="mb-4">
                    <Form.Label column md={3}>
                      Booking Class
                      <span className="form-label-required">*</span>
                    </Form.Label>
                    <Col md={9}>
                      <Row className="mt-md-2">
                        <Col>
                          <Form.Control 
                            style={{ maxWidth: "120px" }}
                            onChange={handleChange}
                            name="booking_class_1"
                          />
                        </Col>
                        <Col>
                          <Form.Control 
                            style={{ maxWidth: "120px" }} 
                            onChange={handleChange}
                            name="booking_class_2"
                          />
                        </Col>
                        <Col>
                          <Form.Control 
                            style={{ maxWidth: "120px" }} 
                            onChange={handleChange}
                            name="booking_class_3"
                          />
                        </Col>
                        <Col>
                          <Form.Control 
                            style={{ maxWidth: "120px" }} 
                            onChange={handleChange}
                            name="booking_class_4"
                          />
                        </Col>
                        <Col>
                          <Form.Control 
                            style={{ maxWidth: "120px" }} 
                            onChange={handleChange}
                            name="booking_class_5"
                          />
                        </Col>
                        <Col>
                          <Form.Control 
                            style={{ maxWidth: "120px" }} 
                            onChange={handleChange}
                            name="booking_class_6"  
                          />
                        </Col>
                        <Col>
                          <Form.Control 
                            style={{ maxWidth: "120px" }} 
                            onChange={handleChange}
                            name="booking_class_7"
                          />
                        </Col>
                        <Col>
                          <Form.Control 
                            style={{ maxWidth: "120px" }} 
                            onChange={handleChange}
                            name="booking_class_8"
                          />
                        </Col>
                      </Row>
                    </Col>
                  </Form.Group>
  
                  <div style={{ marginBottom: 30, marginTop: 30, display: "flex" }}>
                    <Button
                      variant="primary"
                      style={{ marginRight: 15 }}
                      type="submit"
                      disabled={isSubmitting}
                    >
                      SAVE
                    </Button>
                    <Button variant="secondary" onClick={props.onHide}>
                      CANCEL
                    </Button>
                  </div>
                </Form>
              )}
              
            </Formik>  
            
    )
  }

  export default FareFamilyModal