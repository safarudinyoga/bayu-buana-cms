import { withRouter } from "react-router";
import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { Formik } from "formik";
import * as Yup from "yup";
import Api from "config/api";
import _ from "lodash"
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom"
import { setAlert, setCreateModal, setModalTitle } from "redux/ui-store";
import CancelButton from "components/button/cancel";
import FormikControl from "../../../../components/formik/formikControl";

function ExchangeRateCreate(props) {
    // const partner_integration_id = props.match.params.id
    const endpoint = "/master/integration-partners";
    const dispatch = useDispatch();

    const showCreateModal = useSelector((state) => state.ui.showCreateModal);
    const API = new Api();
    const { id } = useParams()
    const isView = showCreateModal.disabled_form || props.isView;
    const [countriesId, setCountriesId] = useState(null);
    const [loading, setLoading] = useState(true);
    const [formValues, setFormValues] = useState(null);

    
    useEffect(async () => {
        let formId = showCreateModal.id || props.id

        let docTitle = "Edit Partner Countries";
        if (!formId) {
            docTitle = "Create Partner Countries";
        }

        dispatch(setModalTitle(docTitle));

        if (formId) {
            try {
                let res = await API.get(endpoint + "/" + id + "/countries/" + formId);
                setFormValues({
                    ...res.data,
                    country_id : _.isEmpty(res.data.country) ? '' : {
                        value: res.data.country.id,
                        label: res.data.country.country_name,
                      },
                    country_name:res.data.country_name,
                    nationality: res.data.nationality,
                });
            } catch (e) {
                console.log(e);
            }
        }
    }, []);

    useEffect(() => {
        if (!showCreateModal.id) {
            setLoading(false);
        }

        if (formValues) {
            setLoading(false);
        }

        setCountriesId(showCreateModal.id);
    }, [showCreateModal.id, formValues]);

    const initialValues = {
        country_id: "",
        country_code: "",
        country_name: "",
        nationality: "",
    };

    const duplicateValue = async(fieldName, value) => {
        let filters = encodeURIComponent(JSON.stringify([[fieldName,"=",value],["AND"],["integration_partner_id",id],["AND"],["status",1]]))
        let res = await API.get(endpoint + "/" + id + "/countries?" + `filters=${filters}`)
    
        if(countriesId){
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

    const validationSchema = Yup.object().shape({
        country_id: Yup.object()
            .required("Country is required.")
            .uniqueValueObject("country_id","Country already exists"),
        country_code: Yup.string()
            .required("Partner Country Code is required")
            .uniqueValueString('country_code', 'Partner Country Code already exists'),
        country_name: Yup.string()
            .required("Partner Country Name is required")
            .uniqueValueString('country_name', 'Partner Country Name already exists'),
        nationality: Yup.string()
            .uniqueValueString('nationality', 'Nationality already exists'),
    });

    const onSubmit = async (values, a) => {
        try {
            let form = {
                country_id: values.country_id.value,
                country_name: values.country_name,
                country_code: values.country_code,
                nationality: values.nationality,
                integration_partner_id: id
            };
            // console.log(endpoint + "/" + id + "/countries/" + countriesId, "ini endpoint")

            if(countriesId){
                let res = await API.put(endpoint + "/" + id + "/countries/" + countriesId, form);
              }else{
                  let res = await API.post(endpoint + "/" + id + "/countries/", form);
              }

            dispatch(setCreateModal({ show: false, id: null, disabled_form: false }));
            dispatch(
                setAlert({
                    message: `Record 'Partner Country Name: ${values.country_name}' has been successfully saved.`,
                })
            );
        } catch (e) {
            dispatch(
                setAlert({
                    message: "Failed to save this record.",
                })
            );
        }
    };
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
        <Formik initialValues={formValues || initialValues} validationSchema={validationSchema} onSubmit={onSubmit} validateOnMount enableReinitialize>
            {({ dirty, handleSubmit, isSubmitting, setFieldValue, values, isValid }) => (
                <Form onSubmit={handleSubmit} className="ml-2">
                    <FormikControl
                        control="selectAsync"
                        required={isView ? "" : "label-required"}
                        label="Country"
                        name="country_id"
                        placeholder={"Please choose"}
                        url={`master/countries`}
                        fieldName={"country_name"}
                        onChange={(v) => {
                          setFieldValue("country_id", v)
                        }}
                        style={{ maxWidth: 250 }}
                        components={
                          isView
                            ? {
                                DropdownIndicator: () => null,
                                IndicatorSeparator: () => null,
                              }
                            : null
                        }
                        isDisabled={isView|| loading}
                        size={formSize}
                        status={`"!=", 0`}
                      />
                    <FormikControl 
                        control="input" 
                        required="label-required" 
                        label="Partner Country Code" 
                        name="country_code" 
                        style={{ maxWidth: 250 }} 
                        size={formSize} 
                        disabled={isView || loading}
                        maxLength={36}
                    />
                    <FormikControl 
                        control="input" 
                        required="label-required" 
                        label="Partner Country Name" 
                        name="country_name" 
                        style={{ maxWidth: 250 }} 
                        size={formSize} 
                        disabled={isView || loading} 
                        maxLength={64}
                    />
                    <FormikControl
                        control="input"
                        label="Nationality" 
                        name="nationality"
                        style={{ maxWidth: 250 }}
                        size={formSize}
                        disabled={isView || loading}
                        maxLength={36}
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
    );
}

export default withRouter(ExchangeRateCreate);
