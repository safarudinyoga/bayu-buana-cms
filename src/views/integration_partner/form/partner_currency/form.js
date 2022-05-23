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
import FormikControl from "../../../../components/formik/formikControl";

function IntegrationPartnerCurrenciesCreate(props) {
    const dispatch = useDispatch();
    const partner_integration_id = props.match.params.id;
    const endpoint = `master/integration-partners/${partner_integration_id}/currencies`;

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
            docTitle = "New Partner Currencies";
        } else if (isView) {
            docTitle = "Partner Currencies Details";
        }

        dispatch(setModalTitle(docTitle));

        try {
            let res = await API.get(endpoint + "/" + formId);
            setFormValues({
                ...res.data,
                currency: {
                    value: res.data.currency?.id || "",
                    label:res.data.currency?.currency_name || "",
                }
            });
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

    const duplicateValue = async(fieldName, value) => {
        let filters = encodeURIComponent(JSON.stringify([[fieldName,"=",value],["AND"],["integration_partner_id",props.match.params.id],["AND"],["status",1]]))
        let res = await API.get(endpoint + "?" + `filters=${filters}`)
        let sameId = res.data.items.find((v) => v.id === id)
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

    const initialValues = {
        currency: "",
        currency_code: "",
        currency_symbol: "",
        currency_name: "",
        integration_partner_id: props.match.params.id || "00000000-0000-0000-0000-000000000000"
    };

    const validationSchema = Yup.object().shape({
        currency: Yup.object().required("Currency is required.")
        .uniqueValueObject('currency_id', 'Currency already exists'),
        currency_code: Yup.string().required("Partner Currency Code is required.")
        .uniqueValueString('currency_code', 'Partner Currency Code already exists'),
        currency_name: Yup.string().required("Partner Currency Name is required.")
        .uniqueValueString('currency_name', 'Partner Currency Name already exists'),
    });

    const onSubmit = async (values, a) => {
        try {
            let form = {
                currency_id: values.currency.value || "00000000-0000-0000-0000-000000000000",
                currency_symbol: values.currency_symbol,
                currency_code: values.currency_code,
                currency_name: values.currency_name,
                integration_partner_id: values.integration_partner_id
            };
            let res = await API.putOrPost(endpoint, id, form);

            dispatch(setCreateModal({ show: false, id: null, disabled_form: false }));
            dispatch(
                setAlert({
                    message: `Record 'Partner Currency Name: ${values.currency_name}' has been successfully saved.`,
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
                        label="Currency"
                        name="currency"
                        placeholder={values.currency_name || "Please Choose"}
                        url={`master/currencies`}
                        fieldName={"currency_name"}
                        onChange={(v) => {
                            setFieldValue("currency", v);
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
                        style={{ maxWidth: 100 }}
                        size={formSize}
                        disabled={isView || loading}
                        maxLength={3}
                    />

                    <FormikControl
                        control="input"
                        required="label-required"
                        label="Partner Currency Name"
                        name="currency_name"
                        style={{ maxWidth: 250 }}
                        size={formSize}
                        disabled={isView || loading}
                        maxLength={64}
                    />

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
                </Form>
            )}
        </Formik>
    );
}

export default withRouter(IntegrationPartnerCurrenciesCreate);
