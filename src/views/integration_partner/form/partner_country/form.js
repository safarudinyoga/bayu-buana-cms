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

const endpoint = "/master/integration-partner-countries";
function ExchangeRateCreate(props) {
    const dispatch = useDispatch();
    const showCreateModal = useSelector((state) => state.ui.showCreateModal);
    const API = new Api();
    const isView = showCreateModal.disabled_form || props.isView;
    const [id, setId] = useState(null);
    const [loading, setLoading] = useState(true);
    const [formValues, setFormValues] = useState(null);

    useEffect(async () => {
        let formId = showCreateModal.id || props.id;

        let docTitle = "EDIT PARTNER COUNTRIES";
        if (!formId) {
            docTitle = "CREATE PARTNER COUNTRIES";
        } else if (isView) {
            docTitle = "Exchange Rate Details";
        }

        dispatch(setModalTitle(docTitle));

        if (formId) {
            try {
                let res = await API.get(endpoint + "/" + formId);
                setFormValues(res.data);
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

        setId(showCreateModal.id);
    }, [showCreateModal.id, formValues]);

    const initialValues = {
        country: "",
        country_code: "",
        country_name: "",
        nationality: "",
    };

    const validationSchema = Yup.object().shape({
        country: Yup.object().required("Country is required.."),
        country_code: Yup.string().required("Partner Country Code is required"),
        country_name: Yup.string().required("Partner Country Name is required"),
        nationality: Yup.string().required("Nationality is required"),
    });

    const onSubmit = async (values, a) => {
        try {
            let form = {
                country_name: values.country_name.value,
                country_code: values.country_code.value,
                nationality: values.nationality.value,
            };
            let res = await API.putOrPost("/master/integration-partner-countries", id, form);

            dispatch(setCreateModal({ show: false, id: null, disabled_form: false }));
            dispatch(
                setAlert({
                    message: `Record 'From Currency: ${form.country_code} and To Currency: ${form.country_name}' has been successfully saved.`,
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
                    <FormikControl control="input" required="label-required" label="Partner Country Code" name="country_code" style={{ maxWidth: 250 }} size={formSize} disabled={isView || loading} />
                    <FormikControl control="input" required="label-required" label="Partner Country Name" name="country_name" style={{ maxWidth: 250 }} size={formSize} disabled={isView || loading} />
                    <FormikControl control="input" required="label-required" label="Nationality" name="nationality" style={{ maxWidth: 250 }} size={formSize} disabled={isView || loading} />

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
