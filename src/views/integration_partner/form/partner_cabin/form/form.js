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
import { setAlert, setReloadTable, setCreateModal } from "redux/ui-store"
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
import TabelFareFamily from "../tabel-fare-family"

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

  let duplicateValue = async(fieldName, value) => {
    let res = await api.get(`${endpoint}/${id}/cabin-types/${cabinId}/fare-families?filters=["fare_type_id","=","${value.value}"]`)
    if(!cabinId) {
      return res.data.items.length === 0
    } else {
      return res.data.items.length === 0 || value === fareFormValues[fieldName] || value === fareFormValues[fieldName].value
    }
  }

  Yup.addMethod(Yup.object, 'uniqueValueObject', function (fieldName, message) {
      return this.test('unique', message, function(field) {
          if(field) return duplicateValue(fieldName, field.value)
          return true
      })
  })


  const validationSchemaFare = Yup.object().shape( {
    fare_type_id: Yup.object()
      .required("Fare Family is required.")
      .uniqueValueObject("fare_type_id","Cabin already exists")
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
      let res={}
      if(fareFamilyId){
        res = await api.put(endpoint + "/" + id + "/cabin-types/" + cabinId + "/fare-families/" + fareFamilyId, formatted)
      } else {
        res = await api.post(endpoint + "/" + id + "/cabin-types/" + cabinId + "/fare-families/", formatted)
      }
      dispatch(setReloadTable(true))
      dispatch(
        setAlert({
          message: `Record 'Fare Family: ${values.fare_type_id.label}' has been successfully saved.`
        })
      )
      props.onHide()
      
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
    <Modal
      {...props}
      size="md"
      dialogClassName="modal-50w"
      aria-labelledby="example-custom-modal-styling-title"
      centered
    >
      <Modal.Body>
        <div style={{ padding: "0 2px 2px" }}>
          <div className="mb-5">
            <div className="modal-button-close" onClick={props.onHide}>
              <ReactSVG src="/img/icons/close.svg" />
            </div>
            <p className="modals-header mt-3">CREATE FARE FAMILY</p>
          </div>

          <Formik
            initialValues={fareFormValues || initialFareFormValues}
            validationSchema={validationSchemaFare}
            onSubmit={onSubmit}
            enableReinitialize
            validateOnMount
          >
            {({ dirty, handleSubmit, isSubmitting, setFieldValue, handleChange, values, errors }) =>(
              <Form onSubmit={handleSubmit}>
              {console.log(errors)}
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
                          maxLength={2}
                        />
                      </Col>
                      <Col>
                        <Form.Control 
                          style={{ maxWidth: "120px" }} 
                          onChange={handleChange}
                          name="booking_class_2"
                          maxLength={2}
                        />
                      </Col>
                      <Col>
                        <Form.Control 
                          style={{ maxWidth: "120px" }} 
                          onChange={handleChange}
                          name="booking_class_3"
                          maxLength={2}
                        />
                      </Col>
                      <Col>
                        <Form.Control 
                          style={{ maxWidth: "120px" }} 
                          onChange={handleChange}
                          name="booking_class_4"
                          maxLength={2}
                        />
                      </Col>
                      <Col>
                        <Form.Control 
                          style={{ maxWidth: "120px" }} 
                          onChange={handleChange}
                          name="booking_class_5"
                          maxLength={2}
                        />
                      </Col>
                      <Col>
                        <Form.Control 
                          style={{ maxWidth: "120px" }} 
                          onChange={handleChange}
                          name="booking_class_6"  
                          maxLength={2}
                        />
                      </Col>
                      <Col>
                        <Form.Control 
                          style={{ maxWidth: "120px" }} 
                          onChange={handleChange}
                          name="booking_class_7"
                          maxLength={2}
                        />
                      </Col>
                      <Col>
                        <Form.Control 
                          style={{ maxWidth: "120px" }} 
                          onChange={handleChange}
                          name="booking_class_8"
                          maxLength={2}
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
          
        </div>
      </Modal.Body>
    </Modal>
  )
}
const Cabins = (props) => {
  let dispatch = useDispatch()
  const { id } = useParams()
  const [cabinId, setCabinId] = useState(null)
  const [formValues, setFormValues] = useState(null)
  const [modalShow, setModalShow] = useState(false)
  const [isView, setIsView] = useState(false);
  const [loading, setLoading] = useState(true);
  let api = new Api()

  const duplicateValue = async(fieldName, value) => {
    let filters = encodeURIComponent(JSON.stringify([[fieldName,"=",value],["AND"],["integration_partner_id",id],["AND"],["status",1]]))
    let res = await api.get(endpoint + "/" + id + "/cabin-types?" + `filters=${filters}`)

    if(cabinId) {
      return res.data.items.length === 0 || value === formValues[fieldName] || value === formValues[fieldName].value
    } else {
      return res.data.items.length === 0
    }
}

Yup.addMethod(Yup.object, 'uniqueValueObject', function (fieldName, message) {
    return this.test('unique', message, function(field) {
        if(field) return duplicateValue(fieldName, field.value)
        return true
    })
})

Yup.addMethod(Yup.string, 'uniqueValueString', function (fieldName, message) {
    return this.test('unique', message, function(field) {
        if(field) return duplicateValue(fieldName, field)
        return true
    })
})
  // Initialize form
  const initialValues = {
    cabin_type_id: "",
    fare_type_id: "",
    cabin_type_code: "",
    cabin_type_name: "", 
  }

  // Schema for yup
  const validationSchema = Yup.object().shape({
    cabin_type_id: Yup.object().required("Cabin is required.")
    .uniqueValueObject("cabin_type_id","Cabin already exists"),
    cabin_type_code: Yup.string()
    .required("Partner Cabin Code is required")
    .uniqueValueString("cabin_type_code","Partner Cabin Code already exists"),
    
    cabin_type_name: Yup.string()
    .required("Partner Cabin Name is required")
    .uniqueValueString("cabin_type_name","Partner Cabin Name already exists"),
  })

  useEffect(async () => {
    let formId = props.partnerCabinId

    if(formId) {
      try {
        let res = await api.get(endpoint + "/" + id + "/cabin-types/" + formId);
        setFormValues({ 
          ...formValues,
          cabin_type_id: _.isEmpty(res.data.cabin_type) ? '' : {
            value: res.data.cabin_type.id,
            label: res.data.cabin_type.cabin_type_name,
          },
          cabin_type_code: res.data.cabin_type_code ? res.data.cabin_type_code : "",
          cabin_type_name: res.data.cabin_type_name ? res.data.cabin_type_name : ""
        })
      } catch (e) {
        console.log(e)
      }
    }
    
  }, [])
  const onSubmit = async (values, a) => {
    let formatted = {
      cabin_type_code: values.cabin_type_code,
      cabin_type_name: values.cabin_type_name,
      cabin_type_id: values.cabin_type_id.value,
      integration_partner_id: id
    }

    try {
      if(cabinId){
        let res = await api.put(endpoint + "/" + id + "/cabin-types/" + cabinId, formatted);
      }else{
        let res = await api.post(endpoint + "/" + id + "/cabin-types", formatted);
      }
      dispatch(
        setAlert({
            message: `Record 'Partner Cabin Name: ${values.cabin_type_name}' has been successfully saved.`,
        })
      );
      dispatch(setContentTitle("Partner Cabins"));
      props.handleReplaceTable(props.isReplaceTable);
      
    } catch (e) {
      dispatch(
        setAlert({
            message: "Failed to save this record.",
        })
    );
    }
  };
  useEffect(() => {
    if (!props.partnerCabinId) {
      setLoading(false);
    }

    if (formValues) {
      setLoading(false);
    }
    let docTitle = "Edit Partner Cabins";
    if(props.isDetail){
      docTitle = "Partner Cabins Details";
    }else{
      if (!props.partnerCabinId) {
          docTitle = "Create Partner Cabins";
      } 
    }

    dispatch(setContentTitle(docTitle));
    setCabinId(props.partnerCabinId)
    setIsView(props.isDetail)

  }, [props.partnerCabinId, formValues])

  const formSize = {
    label: {
        md: 5,
        lg: 5,
    },
    value: {
        md: 7,
        lg: 7,
    },
  };

  const formSizeModal = {
    label: {
        md: 3,
        lg: 3,
    },
    value: {
        md: 6,
        lg: 6,
    },
  };

  return (
    <div>
      <Formik initialValues={formValues || initialValues} validationSchema={validationSchema} onSubmit={onSubmit} validateOnMount enableReinitialize>
        {({ dirty, handleSubmit, isSubmitting, setFieldValue, handleChange, values }) => (
          <Form onSubmit={handleSubmit} className="ml-2">
            <FormikControl
                control="selectAsync"
                required={isView ? "" : "label-required"}
                label="Cabin"
                name="cabin_type_id"
                placeholder={"Please Choose."}
                url={`master/cabin-types`}
                fieldName={"cabin_type_name"}
                onChange={(v) => {
                    setFieldValue("cabin_type_id", v);
                }}
                style={{ maxWidth: 250 }}
                size={formSize}
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
                onChange={(e) => {
                    setFieldValue("cabin_type_code", e.target.value);
                }}
                maxLength={36}
            />

            <FormikControl
                control="input"
                required="label-required"
                label="Partner Cabin Name"
                name="cabin_type_name"
                style={{ maxWidth: 250 }}
                size={formSize}
                disabled={isView || loading}
                onChange={(e) => {
                    setFieldValue("cabin_type_name", e.target.value);
                }}
                maxLength={256}
            />
            {isView || !cabinId ? <h3 className="card-heading"></h3> : 
              <>
                <h3 className="card-heading"></h3>
                <Col sm={12}>
                  <div style={{ padding: "0 15px 15px 15px" }} >
                    <button
                      type="button"
                      className="btn float-right button-override"
                      onClick={() => setModalShow(true)}
                    >
                      <img src={createIcon} className="mr-1" alt="new" />
                      Add New Fare Family
                    </button>

                  </div>
                </Col>
                <br />
                <Col sm={12}>
                  <FareFamilyModal
                    show={modalShow}
                    isView={isView}
                    size={formSizeModal}
                    onHide={() => setModalShow(false)}
                    partnerCabinId={cabinId}

                  />
                </Col>  
              </>
            }
            {console.log(props.isDetail)}
            {props.partnerCabinId && <TabelFareFamily isView={props.isDetail} partnerCabinId={props.partnerCabinId} partnerId={id} FareFamilyModal={FareFamilyModal}/>}

            {!props.hideButton && (
                <div
                    style={{
                        marginBottom: 30,
                        marginTop: 30,
                        display: "flex",
                    }}
                >
                    {!isView && (
                        <Button variant="primary" type="submit" disabled={isSubmitting} style={{ marginRight: 15 }}>
                            SAVE
                        </Button>
                    )}
                    <CancelButton txtback={isView ? "BACK" : "CANCEL"} onClick={() => {
                      dispatch(setContentTitle("Partner Cabins"));
                      props.handleReplaceTable(props.isReplaceTable);
                    }} />
                </div>
            )}
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default Cabins
