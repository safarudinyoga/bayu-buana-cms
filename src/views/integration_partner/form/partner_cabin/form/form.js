import React, { useEffect, useState } from "react"
import {
  Form,
  Row,
  Col,
  Button,
  Modal
} from "react-bootstrap"
import { Formik, FastField, Field } from "formik"
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

          <Form>
            <FormikControl
                control="selectAsync"
                required={props.isView ? "" : "label-required"}
                label="Fare Family"
                name="fare_type_id"
                placeholder={"Please Choose."}
                url={`master/fare-types`}
                fieldName={"fare_type_name"}
                onChange={(v) => {
                    
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
                            <Form.Control style={{ maxWidth: "120px" }} />
                          </Col>
                          <Col>
                            <Form.Control style={{ maxWidth: "120px" }} />
                          </Col>
                          <Col>
                            <Form.Control style={{ maxWidth: "120px" }} />
                          </Col>
                          <Col>
                            <Form.Control style={{ maxWidth: "120px" }} />
                          </Col>
                          <Col>
                            <Form.Control style={{ maxWidth: "120px" }} />
                          </Col>
                          <Col>
                            <Form.Control style={{ maxWidth: "120px" }} />
                          </Col>
                          <Col>
                            <Form.Control style={{ maxWidth: "120px" }} />
                          </Col>
                          <Col>
                            <Form.Control style={{ maxWidth: "120px" }} />
                          </Col>
                </Row>
              </Col>
            </Form.Group>

            <div style={{ marginBottom: 30, marginTop: 30, display: "flex" }}>
              <Button
                variant="primary"
                style={{ marginRight: 15 }}
              >
                SAVE
              </Button>
              <Button variant="secondary" onClick={props.onHide}>
                CANCEL
              </Button>
            </div>
          </Form>
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
  const isView = props.isView;
  const [loading, setLoading] = useState(true);
  let api = new Api()

  const duplicateValue = async(fieldName, value) => {
    let filters = encodeURIComponent(JSON.stringify([[fieldName,"=",value],["AND"],["integration_partner_id",id],["AND"],["status",1]]))
    let res = await api.get(endpoint + "/" + id + "/cabins?" + `filters=${filters}`)
    let sameId = res.data.items.find((v) => v.id === cabinId)
    if(!sameId) return res.data.items.length === 0 

    return true
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
    cabin_type_id: Yup.object()
    .required("Cabin is required.")
    .uniqueValueObject("cabin_type_id","Cabin already exists"),
    cabin_type_code: Yup.string()
    .required("Partner Cabin Code is required")
    .uniqueValueString('cabin_type_code', 'Partner Cabin Code already exists'),
    cabin_type_name: Yup.string()
    .required("Partner Cabin Name is required")
    .uniqueValueString('cabin_type_name', 'Partner Cabin Name already exists'),
  })

  useEffect(async () => {
    let formId = props.partnerCabinId
    let docTitle = "Edit Partner Cabins";
    if (!formId) {
        docTitle = "Create Partner Cabins";
    } else if (isView) {
        docTitle = "Partner Cabins Details";
    }

    dispatch(setContentTitle(docTitle));
    if(formId) {
      try {
        let res = await api.get(endpoint + "/" + id + "/cabins/" + formId);
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
        let res = await api.put(endpoint + "/" + id + "/cabins/" + cabinId, formatted);
      }else{
          let res = await api.post(endpoint + "/" + id + "/cabins", formatted);
      }
      dispatch(
        setAlert({
            message: `Record 'Partner Cabin Name: ${values.cabin_type_name}' has been successfully saved.`,
        })
      );
      dispatch(setCreateModal({ show: false, id: null, disabled_form: false }));
      
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
  console.log(props.partnerCabinId)
    setCabinId(props.partnerCabinId)
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

  console.log('formValues', formValues)
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
                    {isView ? <h3 className="card-heading"></h3> : <><h3 className="card-heading"></h3>
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
                          />
                        </Col>  </>}

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
                            <CancelButton onClick={() => {
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
