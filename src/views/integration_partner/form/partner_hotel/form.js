import { withRouter } from "react-router";
import React, { useState, useEffect } from "react";
import { Form, Button, Col, Modal, OverlayTrigger, Tooltip } from "react-bootstrap";
import { Formik } from "formik";
import * as Yup from "yup";
import Api from "config/api";
import { useDispatch, useSelector } from "react-redux";
import { setAlert, setCreateModal, setModalTitle } from "redux/ui-store";
import CancelButton from "components/button/cancel";
import FormikControl from "../../../../components/formik/formikControl"
import { useParams } from "react-router-dom"
import createIcon from "assets/icons/create.svg";
import ModalCreate from 'components/Modal/bb-modal';
import ModalForm from './modalCreate'
const endpoint = "/master/integration-partners";

function PartnerHotelForm(props) {
    console.log(props, 'ini props');
    const dispatch = useDispatch();
    const { id } = useParams()
    console.log(id, 'id');
    const showCreateModal = useSelector((state) => state.ui.showCreateModal);
    const API = new Api();
    const isView = showCreateModal.disabled_form || props.isView;
    const [hotelId, setHotelId] = useState(null);
    const [visibleRoomModal, setVisibleRoomModal] = React.useState(false);
    const [loading, setLoading] = useState(true);
    const [formValues, setFormValues] = useState(null);

    useEffect(async () => {
        let formId = showCreateModal.id || props.id;
        if(formId){
            try {
                let res = await API.get(endpoint + "/" + id + "/hotels/" + formId);
                console.log(res, 'ini res');
                setFormValues(res.data);
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

        setHotelId(showCreateModal.id);
    }, [showCreateModal.id, formValues]);

    const initialValues = {
        hotel_code: "",
        hotel_name: "",
        hotel_id: "",
        integration_partner_id: "00000000-0000-0000-0000-000000000000",
        is_enabled: false,
        isSubmitting: true
    };

    const duplicateValue = async(fieldName, value) => {
        let filters = encodeURIComponent(JSON.stringify([[fieldName,"=",value],["AND"],["integration_partner_id",id],["AND"],["status",1]]))
        let res = await API.get(endpoint + "/" + id + "/hotels?" + `filters=${filters}`)
        let sameId = res.data.items.find((v) => v.id === hotelId)
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
        hotel_id: Yup.object()
        .required("Hotel is required.")
        .uniqueValueObject("hotel_id","Hotel already exists"),
        hotel_code: Yup.string()
        .required("Partner Hotel Code is required")
        .uniqueValueString('hotel_name', 'Partner Hotel Code already exists'),
        hotel_name: Yup.string()
        .required("Partner Hotel Name is required")
        .uniqueValueString('hotel_name', 'Partner Hotel Name already exists'),
    });

    const onSubmit = async (values, a) => {
        try {
            let form = {
                hotel_code: values.hotel_code,
                hotel_name: values.hotel_name,
                hotel_id: values.hotel_id.value,
                integration_partner_id: id,
                is_enabled: values.is_enabled
            };
            if(hotelId){
                let res = await API.put(endpoint + "/" + id + "/hotels/" + hotelId, form);
            }else{
                let res = await API.post(endpoint + "/" + id + "/hotels", form);
            }

            props.handleReplaceTable(props.isReplaceTable)
            dispatch(
                setAlert({
                    message: `Record 'From Integration Partner Hotels: ${values.hotel_code} - ${values.hotel_name}' has been successfully saved.`,
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
        <div>
        <Formik initialValues={formValues || initialValues} validationSchema={validationSchema} onSubmit={onSubmit} validateOnMount enableReinitialize>
            {({ dirty, handleSubmit, isSubmitting, setFieldValue, handleChange, values }) => {
                console.log(dirty);
                return(
                <Form onSubmit={handleSubmit} className="ml-2">
                    <FormikControl
                        control="selectAsync"
                        // required={isView ? "" : "label-required"}
                        label="Hotel"
                        name="hotel_id"
                        placeholder={values.hotel_name || "Please Choose."}
                        url={`master/hotels`}
                        fieldName={"hotel_name"}
                        onChange={(v) => {
                            setFieldValue("hotel_id", v);
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
                        label="Partner Hotel Code"
                        name="hotel_code"
                        style={{ maxWidth: 250 }}
                        size={formSize}
                        disabled={isView || loading}
                        onChange={(e) => {
                            setFieldValue("hotel_code", e.target.value);
                        }}
                        maxLength={36}
                    />

                    <FormikControl
                        control="input"
                        required="label-required"
                        label="Partner Hotel Name"
                        name="hotel_name"
                        style={{ maxWidth: 250 }}
                        size={formSize}
                        disabled={isView || loading}
                        onChange={(e) => {
                            setFieldValue("hotel_name", e.target.value);
                        }}
                        maxLength={128}
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
                    {
                        values.is_enabled ?
                        <div style={{width: '90%', display: 'flex', justifyContent: 'space-around'}}>
                            <div style={{width: '100%'}}>

                            </div>
                            <div style={{width: '100%'}}>
                                <Col>
                                    <Form.Check
                                        inline
                                        // label={isHotelCode || ""}
                                        label="Hotel Code"
                                        type={"checkbox"}
                                        id="custom-inline-checkbox-remember"
                                        // onChange={() => setIsHotelCodeBool(isHotelCodeBool ? false : true)}
                                        // checked={isHotelCodeBool}
                                    />
                                </Col>
                                <Col sm={8}>
                                    <Form.Check
                                        inline
                                        label="Hotel Information"
                                        // label={isHotelInformation || ""}
                                        type={"checkbox"}
                                        id="custom-inline-checkbox-remember"
                                        // onChange={() => setIsHotelInformationBool(isHotelInformationBool ? false : true)}
                                        // checked={isHotelInformationBool}
                                    />
                                </Col>
                            </div>
                        </div>
                        :null
                    }
                    <Modal.Footer>
                        <OverlayTrigger
                            placement="top"
                            overlay={<Tooltip>Click to create</Tooltip>}
                            >
                            <button
                                type="button"
                                onClick={() => setVisibleRoomModal(true)}
                                className="btn btn-warning float-right button-new"
                            >
                                <img src={createIcon} className="mr-1" alt="new" />
                                Add Partner Room Type
                            </button>
                        </OverlayTrigger>
                    </Modal.Footer>

                    {!props.hideButton && (
                        <div
                            style={{
                                marginBottom: 30,
                                marginTop: 30,
                                display: "flex",
                            }}
                        >
                            {!isView && (
                                <Button
                                 variant="primary" type="submit" disabled={!dirty} style={{ marginRight: 15 }}
                                >
                                    SAVE
                                </Button>
                            )}
                            <CancelButton onClick={() => props.handleReplaceTable(props.isReplaceTable)} />
                        </div>
                    )}
                </Form>
            )}}
        </Formik>
        {
        visibleRoomModal ?
            <ModalCreate
                show={visibleRoomModal}
                onClick={() => setVisibleRoomModal(false)}
                modalTitle={"CREATE ROOM TYPE"}
                modalContent={ModalForm}
                handleSubmit={() => console.log("ok")}
            />
            :null
        }
        </div>
    );
}

export default withRouter(PartnerHotelForm);
