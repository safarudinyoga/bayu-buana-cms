import { withRouter } from "react-router";
import React, { useState, useEffect } from "react";
import { Form, FormGroup, InputGroup, Button } from "react-bootstrap";
import { Formik, FastField } from "formik";
import useQuery from "lib/query";
import * as Yup from "yup";
import Api from "config/api";
import { useDispatch, useSelector } from "react-redux";
import { setAlert, setCreateModal, setModalTitle } from "redux/ui-store";
import CancelButton from "components/button/cancel";
import FormikControl from "../../components/formik/formikControl";

const endpoint = "/master/integration-partner-currencies";

function IntegrationPartnerCurrenciesCreate(props) {
    const dispatch = useDispatch();
    const showCreateModal = useSelector((state) => state.ui.showCreateModal);
    const API = new Api();
    const isView = showCreateModal.disabled_form || props.isView;
    const [id, setId] = useState(null);
    const [loading, setLoading] = useState(true);
    const [formValues, setFormValues] = useState(null);

    useEffect(async () => {
        let formId = showCreateModal.id || props.id;

        let docTitle = "Edit Partner Currencies";
        if (!formId) {
            docTitle = "Create Partner Currencies";
        } else if (isView) {
            docTitle = "Partner Currencies Details";
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
        currency_id: "",
        currency_code: "",
        currency_symbol: "",
        currency_name: "",
        integration_partner_id: "00000000-0000-0000-0000-000000000000"
    };

    const validationSchema = Yup.object().shape({
        currency_code: Yup.string().required("Partner Currency Code is required."),
        currency_name: Yup.string().required("Partner Currency Name is required."),
    });

    const onSubmit = async (values, a) => {
        try {
            let form = {
                currency_id: values.currency_id.value,
                currency_symbol: values.currency_symbol,
                currency_code: values.currency_code,
                currency_name: values.currency_name,
                integration_partner_id: values.integration_partner_id
            };
            let res = await API.putOrPost("/master/integration-partner-currencies", id, form);

            dispatch(setCreateModal({ show: false, id: null, disabled_form: false }));
            dispatch(
                setAlert({
                    message: `Record 'From Integration Partner Currency: ${form.currency_code} and To Currency: ${form.currency_name}' has been successfully saved.`,
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
            {({ dirty, handleSubmit, isSubmitting, setFieldValue, values }) => (
                <Form onSubmit={handleSubmit} className="ml-2">
                    <FormikControl
                        control="selectAsync"
                        required={isView ? "" : "label-required"}
                        label="Currencies"
                        name="currencies_id"
                        placeholder={values.currency_name || "Please Choose."}
                        url={`master/currencies`}
                        fieldName={"currency_name"}
                        onChange={(v) => {
                            setFieldValue("currency_id", v);
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
                        label="Partner Currency Code"
                        name="currency_code"
                        style={{ maxWidth: 250 }}
                        size={formSize}
                        disabled={isView || loading}
                        onChange={(e) => {
                            setFieldValue("currency_code", e.target.value);
                        }}
                    />

                    <FormikControl
                        control="input"
                        required="label-required"
                        label="Partner Currency Name"
                        name="currency_name"
                        style={{ maxWidth: 250 }}
                        size={formSize}
                        disabled={isView || loading}
                        onChange={(e) => {
                            setFieldValue("currency_name", e.target.value);
                        }}
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

export default withRouter(IntegrationPartnerCurrenciesCreate);
