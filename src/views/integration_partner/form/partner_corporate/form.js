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

const endpoint = "/master/integration-partner-corporates";

function IntegrationPartnerCorporateCreate(props) {
    const dispatch = useDispatch();
    const showCreateModal = useSelector((state) => state.ui.showCreateModal);
    const API = new Api();
    const isView = showCreateModal.disabled_form || props.isView;
    const [id, setId] = useState(null);
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

        try {
            let res = await API.get(endpoint + "/" + formId);
            setFormValues(res.data);
        } catch (e) {}
        setLoading(false);
    }, []);

    useEffect(() => {
        if (!showCreateModal.id) {
            setLoading(false);
        }

        if (formValues) {
            setLoading(false);
        }

        setId(showCreateModal.id);
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

    const validationSchema = Yup.object().shape({
        corporate_code: Yup.string().required("Partner Corporates Code is required."),
        // corporate_name: Yup.string().required("Partner Corporates Name is required."),
    });

    const onSubmit = async (values, a) => {
        try {
            let form = {
                corporate_code: values.corporate_code,
                corporate_id: values.corporate_id.value,
                corporate_information_enabled: values.corporate_information_enabled,
                corporate_performance_enabled: values.corporate_performance_enabled,
                credit_limit_enabled: values.credit_limit_enabled,
                integration_partner_id: values.integration_partner_id,
                is_enabled: values.is_enabled
            };
            let res = await API.putOrPost("/master/integration-partner-corporates", id, form);

            dispatch(setCreateModal({ show: false, id: null, disabled_form: false }));
            dispatch(
                setAlert({
                    message: `Record 'From Integration Partner Corporates: ${form.corporate_code} - ${form.corporate_name}' has been successfully saved.`,
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
                        url={`master/companies`}
                        fieldName={"company_name"}
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
