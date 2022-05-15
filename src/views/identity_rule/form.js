import { withRouter } from "react-router";
import React, { useState, useEffect } from "react";
import { Form, FormGroup, InputGroup, Button, Col } from "react-bootstrap";
import { Formik, FastField, Field } from "formik";
import useQuery from "lib/query";
import * as Yup from "yup";
import Api from "config/api";
import { useDispatch, useSelector } from "react-redux";
import { setAlert, setCreateModal, setModalTitle } from "redux/ui-store";
import CancelButton from "components/button/cancel";
import FormikControl from "../../components/formik/formikControl";
import { ReactSVG } from "react-svg"
import Select, {components} from "react-select"

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
        corporate_code: "",
        corporate_id: "",
        corporate_information_enabled: false,
        corporate_performance_enabled: false,
        credit_limit_enabled: false,
        integration_partner_id: "00000000-0000-0000-0000-000000000000",
        is_enabled: false
    };

    const validationSchema = Yup.object().shape({
        // corporate_code: Yup.string().required("Partner Corporates Code is required."),
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
            md: 8,
            lg: 8,
        },
        value: {
            md: 4,
            lg: 4,
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

    // const options = [
    //     {
    //       label: "Monthly",
    //       selected: "Montly",
          
    //     },
    //     {
    //       label: "Yearly",
    //       selected: "Yearly",
    //     }
    // ]

    return (
        <Formik initialValues={formValues || initialValues} validationSchema={validationSchema} onSubmit={onSubmit} validateOnMount enableReinitialize>
            {({ dirty, handleSubmit, isSubmitting, setFieldValue, values }) => (
                <Form onSubmit={handleSubmit} className="ml-2">
                    <div style={{display: "inline-flex", marginBottom: 15}}>
                        <FormikControl
                            control="input"
                            size={formTextSize}
                            label="Prefix"
                            name="corporate_code"
                            style={{ maxWidth: 250 }}
                            disabled={isView || loading}
                            onChange={(e) => {
                            setFieldValue("corporate_code", e.target.value);
                            }}
                        />

                        <FormikControl
                            control="input"
                            size={formTextSize}
                            label="Dynamic Prefix"
                            name="corporate_code"
                            style={{ maxWidth: 250 }}
                            disabled={isView || loading}
                            onChange={(e) => {
                            setFieldValue("corporate_code", e.target.value);
                            }}
                        />  

                        <FormikControl
                            control="input"
                            size={formTextSize}
                            label="Next Number"
                            name="corporate_code"
                            style={{ maxWidth: 250 }}
                            disabled={isView || loading}
                            onChange={(e) => {
                            setFieldValue("corporate_code", e.target.value);
                            }}
                        />               
                    </div>

                    <FormikControl
                      control="switch"
                      required="label-required"
                      label="Reset numbers periodically?"
                      name="is_enabled"
                      value={values.is_enabled}
                      onChange={(v) => setFieldValue("is_enabled", v)}
                      size={formSize}
                      disabled={isView || loading}
                    />

                    <FormikControl
                        control="select"
                        // options={options}
                        options={[
                            { value: "economy", label: "Economy"},
                            { value: "bc", label: "Business Class"}
                          ]}
                        required={isView ? "" : "label-required"}
                        label="How often do you want to reset numbering?"
                        name="corporate_id"
                        placeholder={values.currency_name || "Please Choose."}
                        value={values.last_used_counter} 
                        onChange={(v) => {
                            setFieldValue("last_used_counter", v);
                            console.log(v.value)
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
