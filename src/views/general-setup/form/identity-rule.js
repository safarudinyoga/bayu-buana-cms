import { withRouter } from "react-router";
import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { Formik } from "formik";
import useQuery from "lib/query";
import * as Yup from "yup";
import Api from "config/api";
import { useDispatch, useSelector } from "react-redux";
import { setAlert, setCreateModal, setModalTitle } from "redux/ui-store";
import CancelButton from "components/button/cancel";
import FormikControl from "components/formik/formikControl";
import "./identity-rule.css"


const endpoint = "/master/configurations/identity-rules";

function IdentityRuleCreate(props) {
    const dispatch = useDispatch();
    const showCreateModal = useSelector((state) => state.ui.showCreateModal);
    const API = new Api();
    const isView = showCreateModal.disabled_form || props.isView;
    const [id, setId] = useState(null);
    const [loading, setLoading] = useState(true);
    const [formValues, setFormValues] = useState(null);

    useEffect(async () => {
        let formId = showCreateModal.id || props.id;

        let docTitle = "Edit Identity Rule";
        if (!formId) {
            docTitle = "Create Identity Rule";
        } else if (isView) {
            docTitle = "Identity Rule Details";
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
        prefix: "",
        dynamic_prefix: "",
        next_number: "",
        is_reset: true,
        reset_frequency: "",

        identity_code: "",
        identity_name: "",
    };

    const validationSchema = Yup.object().shape({
        is_reset: Yup.boolean().required("Identity Rule is Reset is required."),
        reset_frequency: Yup.string().required("Identity Rule Reset Frequency is required."),
    });

    const onSubmit = async (values, a) => {
        try {
            let form = {
                prefix: values.prefix,
                dynamic_prefix: values.dynamic_prefix,
                next_number: values.next_number,
                is_reset: values.is_reset,
                reset_frequency: values.reset_frequency,

                identity_code: values.identity_code,
                identity_name: values.identity_name,
            };
            let res = await API.putOrPost("/master/configurations/identity-rules", id, form);

            dispatch(setCreateModal({ show: false, id: null, disabled_form: false }));
            dispatch(
                setAlert({
                    message: `Record 'From Identity Rule: ${form.identity_code} - ${form.identity_name}' has been successfully saved.`,
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
            md: 6,
            lg: 6,
        },
        value: {
            md: 5,
            lg: 5,
        },
    };

    const formTextSize = {
        label: {
            md: 10,
            lg: 10,
        },
        value: {
            md: 11,
            lg: 11,
        },
    };

    return (
        <Formik initialValues={formValues || initialValues} validationSchema={validationSchema} onSubmit={onSubmit} validateOnMount enableReinitialize>
            {({ dirty, handleSubmit, isSubmitting, setFieldValue, values }) => (
                <Form onSubmit={handleSubmit} className="ml-2">
                    <div style={{ display: "inline-flex", marginBottom: 15 }}>
                        <FormikControl
                            control="input"
                            size={formTextSize}
                            label="Prefix"
                            name="prefix"
                            maxLength= {36}
                            style={{ 
                                maxWidth: 150,
                                paddingRight: 0
                            }}
                            disabled={isView || loading}
                            onChange={(e) => {
                                setFieldValue("prefix", e.target.value);
                            }}
                        />
                        
                        <Form.Control 
                            type="text" 
                            value="-"
                            disabled
                            className="form-group disabled-dash"
                            style= {{
                                maxWidth: 45,
                                textAlign: "center",
                                marginTop: 32,
                                marginRight: 10,
                            }}
                        /> 
                        

                        <FormikControl
                            control="input"
                            size={formTextSize}
                            label="Dynamic Prefix"
                            name="dynamic_prefix"
                            maxLength= {36}
                            style={{ 
                                maxWidth: 250,
                                paddingRight: 0,
                            }}
                            disabled={isView || loading}
                            onChange={(e) => {
                                setFieldValue("dynamic_prefix", e.target.value);
                            }}
                        />
                        
                        <Form.Control 
                            type="text" 
                            value="-"
                            disabled
                            className="form-group disabled-dash"
                            style= {{
                                maxWidth: 45,
                                textAlign: "center",
                                marginTop: 32,
                                marginRight: 10,
                                marginLeft: -10
                            }}
                        /> 

                        <FormikControl
                            control="input"
                            size={formTextSize}
                            label="Next Number"
                            name="next_number"
                            style={{ maxWidth: 250 }}
                            disabled={isView || loading}
                            onChange={(e) => {
                                setFieldValue("next_number", e.target.value);
                            }}
                        />
                    </div>
                    
                    <FormikControl
                        control="switch"
                        required="label-required"
                        className={"identity-rule-switch"}
                        label="Reset numbers periodically?"
                        name="is_reset"
                        value={values.is_reset}
                        onChange={(v) => setFieldValue("is_reset", v)}
                        size={formSize}
                        disabled={isView || loading}
                        useHint={true}
                    />

                    <FormikControl
                        control="select"
                        options={[
                            { value: "Y", label: "Yearly" },
                            { value: "M", label: "Monthly" },
                        ]}
                        required={isView ? "" : "label-required"}
                        label="How often do you want to reset numbering?"
                        name="reset_frequency"
                        placeholder={values.reset_frequency === "Y" ? "Yearly" : "Monthly" || "Please Choose."}
                        value={values.reset_frequency}
                        onChange={(v) => {
                            setFieldValue("reset_frequency", v.value);
                            console.log(v.value);
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
                        useHint={true}
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

export default withRouter(IdentityRuleCreate);
