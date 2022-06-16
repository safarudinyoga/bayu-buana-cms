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
import _ from "lodash"
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css"
import "react-dropzone-uploader/dist/styles.css"
import { useParams } from "react-router-dom"
import CancelButton from "components/button/cancel";
import FormikControl from "../../../../components/formik/formikControl"

const endpoint = "/master/integration-partners";
const Cities = (props) => {
  let dispatch = useDispatch()
  const showCreateModal = useSelector((state) => state.ui.showCreateModal)
  const { id } = useParams()
  const [cityId, setCityId] = useState(null)
  const [formValues, setFormValues] = useState(null)
  const isView = showCreateModal.disabled_form || props.isView;
  const [loading, setLoading] = useState(true);
  const [integrationPartnerCode, setIntegrationPartnerCode] = useState(2);
  let api = new Api()

  const duplicateValue = async(fieldName, value) => {
    let filters = encodeURIComponent(JSON.stringify([[fieldName,"=",value],["AND"],["integration_partner_id",id],["AND"],["status",1]]))
    let res = await api.get(endpoint + "/" + id + "/cities?" + `filters=${filters}`)

    if(cityId){
      return res.data.items.length === 0 || value === formValues[fieldName] || formValues[fieldName].value
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
    city_id: "",
    city_code: "",
    city_name: "", 
    latitude: "",
    longitude: ""
  }

  // Schema for yup
  const validationSchema = Yup.object().shape({
    city_id: Yup.object()
    .required("City is required.")
    .uniqueValueObject("city_id","City already exists"),
    city_code: Yup.string()
    .required("Partner City Code is required")
    .uniqueValueString('city_code', 'Partner City Code already exists'),
    city_name: Yup.string()
    .required("Partner City Name is required")
    .uniqueValueString('city_name', 'Partner City Name already exists'),
  })

  useEffect(async () => {
    let formId = showCreateModal.id || props.id

    let docTitle = "Edit Partner Cities"
    if (!formId) {
      docTitle = "Create Partner Cities"
    }
    dispatch(setModalTitle(docTitle))

    try {
      let res = await api.get(endpoint + "/" + id);
      setIntegrationPartnerCode(res.data.integration_partner_code)
    } catch (e) {
      console.log(e)
    }
    if(formId) {
      try {
        let res = await api.get(endpoint + "/" + id + "/cities/" + formId);
        console.log(res);
        setFormValues({ 
          ...formValues,
          city_id: _.isEmpty(res.data.city) ? '' : {
            value: res.data.city.id,
            label: res.data.city.city_name,
          },
          city_code: res.data.city_code ? res.data.city_code : "",
          city_name: res.data.city_name ? res.data.city_name : "",
          latitude: res.data.latitude ? res.data.latitude : "",
          longitude: res.data.longitude ? res.data.longitude : "",
        })
      } catch (e) {
        console.log(e)
      }
    }
    
  }, [])
  const onSubmit = async (values, a) => {
    let formatted = {
      city_code: values.city_code,
      city_name: values.city_name,
      city_id: values.city_id.value,
      integration_partner_id: id,
      latitude: values.latitude == "" ? 0.0 : parseFloat(values.latitude),
      longitude: values.longitude == "" ? 0.0 : parseFloat(values.longitude)
    }

    try {
      if(cityId){
        let res = await api.put(endpoint + "/" + id + "/cities/" + cityId, formatted);
      }else{
          let res = await api.post(endpoint + "/" + id + "/cities", formatted);
      }
      dispatch(
        setAlert({
            message: `Record 'Partner City Name: ${values.city_name}' has been successfully saved.`,
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
    setCityId(showCreateModal.id)
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

  console.log('formValues', formValues)
  return (
    <div>
      <Formik initialValues={formValues || initialValues} validationSchema={validationSchema} onSubmit={onSubmit} validateOnMount enableReinitialize>
            {({ dirty, handleSubmit, isSubmitting, setFieldValue, handleChange, values }) => (
                <Form onSubmit={handleSubmit} className="ml-2">
                    <FormikControl
                        control="selectAsync"
                        required={isView ? "" : "label-required"}
                        label="City"
                        name="city_id"
                        placeholder={"Please Choose."}
                        url={`master/cities`}
                        fieldName={"city_name"}
                        onChange={(v) => {
                            setFieldValue("city_id", v);
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
                        label="Partner City Code"
                        name="city_code"
                        style={{ maxWidth: 250 }}
                        size={formSize}
                        disabled={isView || loading}
                        onChange={(e) => {
                            setFieldValue("city_code", e.target.value);
                        }}
                        maxLength={36}
                    />

                    <FormikControl
                        control="input"
                        required="label-required"
                        label="Partner City Name"
                        name="city_name"
                        style={{ maxWidth: 250 }}
                        size={formSize}
                        disabled={isView || loading}
                        onChange={(e) => {
                            setFieldValue("city_name", e.target.value);
                        }}
                        maxLength={256}
                    />
                    {
                    integrationPartnerCode != 2 ? 
                    <FormikControl
                        control="input"
                        label="Latitude"
                        name="latitude"
                        style={{ maxWidth: 250 }}
                        size={formSize}
                        disabled={isView || loading}
                        onChange={(e) => {
                            setFieldValue("latitude", e.target.value);
                        }}
                        maxLength={16}
                    />
                    : null }
                  {
                    integrationPartnerCode != 2 ? 
                    <FormikControl
                        control="input"
                        label="Longitude"
                        name="longitude"
                        style={{ maxWidth: 250 }}
                        size={formSize}
                        disabled={isView || loading}
                        onChange={(e) => {
                            setFieldValue("longitude", e.target.value);
                        }}
                        maxLength={16}
                    /> : null }

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

export default Cities
