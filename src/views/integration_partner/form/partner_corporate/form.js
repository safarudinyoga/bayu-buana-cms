import { withRouter } from "react-router";
import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { Formik } from "formik";
import * as Yup from "yup";
import Api from "config/api";
import { useDispatch, useSelector } from "react-redux";
import { setAlert, setCreateModal, setModalTitle } from "redux/ui-store";
import CancelButton from "components/button/cancel";
import FormikControl from "../../../../components/formik/formikControl"
import { useParams } from "react-router-dom"
const endpoint = "/master/integration-partners";

function IntegrationPartnerCorporateCreate(props) {
    const dispatch = useDispatch();
    const { id } = useParams()
    const showCreateModal = useSelector((state) => state.ui.showCreateModal);
    const API = new Api();
    const isView = showCreateModal.disabled_form || props.isView;
    const [corporateId, setCorporateId] = useState(null);
    const [loading, setLoading] = useState(true);
    const [formValues, setFormValues] = useState(null);

    useEffect(async () => {
        let formId = showCreateModal.id || props.id;

        let docTitle = "Edit Partner Corporates";
        if (!formId) {
            docTitle = "Create Partner Corporates";
        } else if (isView) {
            docTitle = "Partner Corporates Details";
        }

        dispatch(setModalTitle(docTitle));
        if(formId){
            try {
                let res = await API.get(endpoint + "/" + id + "/corporates/" + formId);
                setFormValues({
                    ...res.data,
                    corporate_id: !res.data.corporate?.id ? "" : {
                        label: res.data.corporate.corporate_name,
                        value:res.data.corporate.id
                    }
                });
            } catch (e) {}
        }
        setLoading(false);
    }, []);

    useEffect(() => {
        if (!showCreateModal.id) {
            setLoading(false);
        }

        if (formValues) {
            setLoading(false);
        }

        setCorporateId(showCreateModal.id);
    }, [showCreateModal.id, formValues]);

    const initialValues = {
        corporate_code: "",
        corporate_id: "",
        corporate_information_enabled: false,
        corporate_performance_enabled: false,
        credit_limit_enabled: false,
        integration_partner_id: "00000000-0000-0000-0000-000000000000",
        is_enabled: false
    };

    const duplicateValue = async(fieldName, value) => {
        let filters = encodeURIComponent(JSON.stringify([[fieldName,"=",value],["AND"],["integration_partner_id",id],["AND"],["status",1]]))
        let res = await API.get(endpoint + "/" + id + "/corporates?" + `filters=${filters}`)
        let sameId = res.data.items.find((v) => v.id === corporateId)
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

    const validationSchema = Yup.object().shape({
        corporate_id: Yup.object()
        .required("Corporate is required.")
        .uniqueValueObject("corporate_id","Corporate already exists"),
        corporate_code: Yup.string()
        .required("Partner Corporate Code is required")
        .uniqueValueString('corporate_code', 'Partner Corporate Code already exists'),
    });

    const onSubmit = async (values, a) => {
        try {
            let form = {
                corporate_code: values.corporate_code,
                corporate_id: values.corporate_id.value,
                corporate_information_enabled: values.corporate_information_enabled,
                corporate_performance_enabled: values.corporate_performance_enabled,
                credit_limit_enabled: values.credit_limit_enabled,
                integration_partner_id: id,
                is_enabled: values.is_enabled
            };
            if(corporateId){
                let res = await API.put(endpoint + "/" + id + "/corporates/" + corporateId, form);
            }else{
                let res = await API.post(endpoint + "/" + id + "/corporates", form);
            }

            dispatch(setCreateModal({ show: false, id: null, disabled_form: false }));
            dispatch(
                setAlert({
                    message: `Record 'From Integration Partner Corporates: ${form.corporate_code} - ${values.corporate_id.label}' has been successfully saved.`,
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
            {({ dirty, handleSubmit, isSubmitting, setFieldValue, handleChange, values }) => (
                <Form onSubmit={handleSubmit} className="ml-2">
                    <FormikControl
                        control="selectAsync"
                        required={isView ? "" : "label-required"}
                        label="Corporate"
                        name="corporate_id"
                        placeholder={values.currency_name || "Please Choose."}
                        url={`master/agent-corporates`}
                        fieldName={"agent_corporate.corporate.corporate_name"}
                        cstmValue={"agent_corporate.corporate_id"}
                        onChange={(v) => {
                            setFieldValue("corporate_id", v);
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
                        label="Partner Corporate Code"
                        name="corporate_code"
                        style={{ maxWidth: 250 }}
                        size={formSize}
                        disabled={isView || loading}
                        onChange={(e) => {
                            setFieldValue("corporate_code", e.target.value);
                        }}
                        maxLength={36}
                    />

                    <FormikControl
                      control="switch"
                      label="Enable"
                      name="is_enabled"
                      value={values.is_enabled}
                      onChange={(v) => setFieldValue("is_enabled", v)}
                      size={formSize}
                      disabled={isView || loading}
                    />

                    <Form.Group as={Row} className="form-group">
                      <Col sm={5}>
                        <p>Data Transfer Options</p>
                      </Col>
                      <Col sm={7}>
                        <Form.Check
                          type="checkbox"
                          label="Corporate Information"
                          name="corporate_information_enabled"
                          checked={values.corporate_information_enabled}
                          onChange={(v) => setFieldValue("corporate_information_enabled", v.target.checked)}                          
                          disabled={isView}
                        />
                        <Form.Check
                          type="checkbox"
                          label="Corporate Performance"
                          name="corporate_performance_enabled"
                          checked={values.corporate_performance_enabled}
                          onChange={(v) => setFieldValue("corporate_performance_enabled", v.target.checked)}
                          disabled={isView}
                        />
                        <Form.Check
                          type="checkbox"
                          label="Credit Limit"
                          name="credit_limit_enabled"
                          checked={values.credit_limit_enabled}
                          onChange={(v) => setFieldValue("credit_limit_enabled", v.target.checked)}
                          disabled={isView}
                        />
                      </Col>
                    </Form.Group>
                    
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

export default withRouter(IntegrationPartnerCorporateCreate);
