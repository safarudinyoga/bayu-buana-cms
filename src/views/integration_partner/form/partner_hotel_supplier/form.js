import React, { useEffect, useState } from "react"
import {
  Form,
  Row,
  Col,
  Button,
} from "react-bootstrap"
import { Formik, FastField, Field } from "formik"
import * as Yup from "yup"
import { useDispatch, useSelector } from "react-redux"
import { setAlert, setModalTitle, setCreateModal } from "redux/ui-store"
import Api from "config/api"
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css"
import "react-dropzone-uploader/dist/styles.css"
import { useParams } from "react-router-dom"
import CancelButton from "components/button/cancel";
import FormikControl from "../../../../components/formik/formikControl"

const endpoint = "/master/integration-partners";
const HotelSuppliers = (props) => {
  let dispatch = useDispatch()
  const showCreateModal = useSelector((state) => state.ui.showCreateModal)
  const { id } = useParams()
  const [hotelSupplierId, setHotelSupplierId] = useState(null)
  const [formValues, setFormValues] = useState(null)
  const isView = showCreateModal.disabled_form || props.isView;
  const [loading, setLoading] = useState(true);
  let api = new Api()

  const duplicateValue = async(fieldName, value) => {
    let filters = encodeURIComponent(JSON.stringify([[fieldName,"=",value],["AND"],["integration_partner_id",id],["AND"],["status",1]]))
    let res = await api.get(endpoint + "/" + id + "/hotel-suppliers?" + `filters=${filters}`)
    let sameId = res.data.items.find((v) => v.id === hotelSupplierId)
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
    hotel_supplier_id: "",
    hotel_supplier_code: "",
    hotel_supplier_name: "", 
  }

  // Schema for yup
  const validationSchema = Yup.object().shape({
    hotel_supplier_id: Yup.object()
    .required("Hotel Supplier is required.")
    .uniqueValueObject("hotel_supplier_id","Hotel Supplier already exists"),
    hotel_supplier_code: Yup.string()
    .required("Partner Hotel Supplier Code is required")
    .uniqueValueString('hotel_supplier_code', 'Partner Hotel Supplier Code already exists'),
    hotel_supplier_name: Yup.string()
    .required("Partner Hotel Supplier Name is required")
    .uniqueValueString('hotel_supplier_name', 'Partner Hotel Supplier Name already exists'),
  })

  useEffect(async () => {
    let formId = showCreateModal.id || props.id

    let docTitle = "Edit Partner Hotel Suppliers"
    if (!formId) {
      docTitle = "Create Partner Hotel Suppliers"
    }
    dispatch(setModalTitle(docTitle))

    if(formId) {
      try {
        let res = await api.get(endpoint + "/" + id + "/hotel-suppliers/" + formId);
        setFormValues({ 
          ...formValues,
          hotel_supplier_id: res.data.hotel_supplier_id ? res.data.hotel_supplier_id : "",
          hotel_supplier_code: res.data.hotel_supplier_code ? res.data.hotel_supplier_code : "",
          hotel_supplier_name: res.data.hotel_supplier_name ? res.data.hotel_supplier_name : "",
        })
      } catch (e) {
        console.log(e)
      }
    }
    
  }, [])
  const onSubmit = async (values, a) => {
    let formatted = {
      hotel_supplier_code: values.hotel_supplier_code,
      hotel_supplier_name: values.hotel_supplier_name,
      hotel_supplier_id: values.hotel_supplier_id.value,
      integration_partner_id: id
    }

    try {
      if(hotelSupplierId){
        let res = await api.put(endpoint + "/" + id + "/hotel-suppliers/" + hotelSupplierId, formatted);
      }else{
          let res = await api.post(endpoint + "/" + id + "/hotel-suppliers", formatted);
      }
      dispatch(
        setAlert({
            message: `Record 'Partner Hotel Supplier Name: ${values.hotel_supplier_name}' has been successfully saved.`,
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
    if (!showCreateModal.id) {
      setLoading(false);
  }

  if (formValues) {
      setLoading(false);
  }
    setHotelSupplierId(showCreateModal.id)
  }, [showCreateModal.id, formValues])

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

  return (
    <div>
      <Formik initialValues={formValues || initialValues} validationSchema={validationSchema} onSubmit={onSubmit} validateOnMount enableReinitialize>
            {({ dirty, handleSubmit, isSubmitting, setFieldValue, handleChange, values }) => (
                <Form onSubmit={handleSubmit} className="ml-2">
                    <FormikControl
                        control="selectAsync"
                        required={isView ? "" : "label-required"}
                        label="Hotel Supplier"
                        name="hotel_supplier_id"
                        placeholder={values.hotel_supplier_id || "Please Choose."}
                        url={`master/hotel-suppliers`}
                        fieldName={"hotel_supplier_name"}
                        onChange={(v) => {
                            setFieldValue("hotel_supplier_id", v);
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
                        label="Partner Hotel Supplier Code"
                        name="hotel_supplier_code"
                        style={{ maxWidth: 250 }}
                        size={formSize}
                        disabled={isView || loading}
                        onChange={(e) => {
                            setFieldValue("hotel_supplier_code", e.target.value);
                        }}
                        maxLength={36}
                    />

                    <FormikControl
                        control="input"
                        required="label-required"
                        label="Partner Hotel Supplier Name"
                        name="hotel_supplier_name"
                        style={{ maxWidth: 250 }}
                        size={formSize}
                        disabled={isView || loading}
                        onChange={(e) => {
                            setFieldValue("hotel_supplier_name", e.target.value);
                        }}
                        maxLength={256}
                    />

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
                            <CancelButton onClick={() => dispatch(setCreateModal({ show: false, id: null, disabled_form: false }))} />
                        </div>
                    )}
                </Form>
            )}
        </Formik>
    </div>
  )
}

export default HotelSuppliers
