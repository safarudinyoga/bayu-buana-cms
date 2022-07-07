import { withRouter } from "react-router";
import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { Formik } from "formik";
import * as Yup from "yup";
import Api from "config/api";
import { useDispatch, useSelector } from "react-redux";
import { setAlert, setCreateModal, setModalTitle } from "redux/ui-store";
import CancelButton from "components/button/cancel";
import FormikControl from "../../../../components/formik/formikControl";

function CreatePartnerCredential(props) {
  const integration_partner_code = props.integration_partner_code
  const partner_integration_id = props.match.params.id
  const endpoint = `/master/integration-partners/${partner_integration_id}/credentials`;
  const dispatch = useDispatch();

  const showCreateModal = useSelector((state) => state.ui.showCreateModal);
  const API = new Api();
  const isView = showCreateModal.disabled_form || props.isView;
  const [id, setId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formValues, setFormValues] = useState(null);

  
  useEffect(async () => {
    let formId = showCreateModal.id || props.id;

    let docTitle = "Edit Partner Credentials";
    if (!formId) {
      docTitle = "New Partner Credentials";
    } else if (isView) {
      docTitle = "Partner Credentials";
    }

    dispatch(setModalTitle(docTitle));

    if (formId) {
      try {
        let res = await API.get(endpoint + "/" + formId);
        console.log(res.data, "haha")
        setFormValues({
          ...res.data,
          office_id: {
            value: res.data.corporate_group_id || "",
            label: res.data.corporate_group_name || "",
          }
         
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

    setId(showCreateModal.id);
  }, [showCreateModal.id, formValues]);

  const isPCCRequired = () => {
    return integration_partner_code === 1 || integration_partner_code === 7 || integration_partner_code === 8 || integration_partner_code === 9 || integration_partner_code === 16
  }
  const isIPCCRequired = () => {
    return integration_partner_code === 1 || integration_partner_code === 8 
  }
  const isAgencyRequired = () => {
    return integration_partner_code === 7 || integration_partner_code === 9 || integration_partner_code === 16
  }
  const isIATARequired = () => {
    return integration_partner_code === 7 || integration_partner_code === 8 || integration_partner_code === 9 || integration_partner_code === 16
  }

  const initialValues = {
    integration_partner_code:integration_partner_code,
    isPCCRequired: isPCCRequired(),
    isIPCCRequired: isIPCCRequired(),
    isSystemIDRequired: integration_partner_code === 7,
    isAgencyRequired: isAgencyRequired(),
    isIATARequired: isIATARequired(),
    "office_id": "",
    "partner_username": "",
    "partner_password": "",
    "organization": "",
    "domain": "",
    "pcc": "",
    "ipcc": "",
    "printer_address": "",
    "agency_id": "",
    "customer_number": "",
    "iata_number": "",
    "system_id": ""
  };

  const duplicateValue = async(fieldName, value) => {
    let filters = encodeURIComponent(JSON.stringify([[fieldName,"=",value],["AND"],["integration_partner_id",id],["AND"],["status",1]]))
    let res = await API.get(endpoint + "?" + `filters=${filters}`)

    if(id){
      return res.data.items.length === 0 || value === (formValues[fieldName] || formValues[fieldName].value)
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
    office_id: Yup.object()
      .required("Company/ Branch Name is required.")
      .uniqueValueObject("office_id","Company/ Branch Name already exists"),
    partner_username: Yup.string()
      .required(`${integration_partner_code === 16 ? "Client ID" :"Partner Username"} is required`),
    partner_password: Yup.string()
      .required(`${integration_partner_code === 16 ? "Client Secret" :"Partner Password"} is required`),
    organization: Yup.string()
      .required(`${integration_partner_code === 16 ? "Grant Type" :"Organization"} is required`),
    domain: Yup.string()
      .required(`${integration_partner_code ===  16 
        ? "Scope" 
        : (integration_partner_code === 7 || integration_partner_code === 9) 
        ? "Duty Code" 
        :"Domain"} is required`),
    isPCCRequired: Yup.boolean(),
    isIPCCRequired: Yup.boolean(),
    isSystemIDRequired: Yup.boolean(),
    isAgencyRequired: Yup.boolean(),
    isIATARequired: Yup.boolean(),
    pcc: Yup.string()
      .when('isPCCRequired', {
        is: true,
        then: Yup.string().required(`PCC is required`)
      }),
    ipcc: Yup.string()
      .when('isIPCCRequired', {
        is: true,
        then: Yup.string().required(`IPCC is required`)
      }),
    agency_id: Yup.string()
      .when('isAgencyRequired', {
        is: true,
        then: Yup.string().required(`Agency ID is required`)
      }),
    iata_number: Yup.string()
      .when('isIATARequired', {
        is: true,
        then: Yup.string().required(`IATA Number is required`)
      }),
    system_id: Yup.string()
    .when('isSystemIDRequired', {
      is: true,
      then: Yup.string().required(`System ID is required`)
    }),
    customer_number: Yup.string(),
    printer_address: Yup.string(),
  });

  const onSubmit = async (values, a) => {
      try {
        let form = {
          ...values,
          office_id: values.office_id.value,
          agency_id: values.agency_id,
          system_id: values.system_id,
        };
        let res = await API.putOrPost(endpoint, id, form);
        console.log(res, "hihih")

        dispatch(setCreateModal({ show: false, id: null, disabled_form: false }));
        dispatch(
          setAlert({
            message: `Credentials for 'Company/ Branch Name: ${values.ofice_id.label}' has been successfully saved.`,
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
    <Formik 
      initialValues={formValues || initialValues} 
      validationSchema={validationSchema} 
      onSubmit={onSubmit} 
      validateOnMount 
      enableReinitialize
    >
        {({ dirty, handleSubmit, isSubmitting, setFieldValue, values, isValid }) => (
            <Form onSubmit={handleSubmit} className="ml-2">
                <FormikControl
                    control="selectAsync"
                    required={"label-required"}
                    label="Company/ Branch Name"
                    name="office_id"
                    placeholder={"Please choose"}
                    url={`master/offices`}
                    fieldName={"office_name"}
                    onChange={(v) => {
                      setFieldValue("office_id", v)
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
                    size={formSize}
                    status={`"!=", 0`}
                  />
                <FormikControl 
                    control="input" 
                    required="label-required" 
                    label={integration_partner_code === 16 ? "Client ID" : "Partner Username" }
                    name="partner_username" 
                    style={{ maxWidth: 250 }} 
                    size={formSize} 
                    disabled={isView || loading}
                    maxLength={256}
                />
                <FormikControl 
                    control="input" 
                    type={integration_partner_code === 16 ? "text" : "password"}
                    required="label-required" 
                    label={integration_partner_code === 16 ? "Client Secret" : "Partner Password" } 
                    name="partner_password" 
                    style={{ maxWidth: 250 }} 
                    size={formSize} 
                    disabled={isView || loading} 
                    maxLength={256}
                />
                <FormikControl
                    control="input"
                    required="label-required" 
                    label={integration_partner_code === 16 ? "Grant Type" : "Organization" } 
                    name="organization"
                    style={{ maxWidth: 250 }}
                    size={formSize}
                    disabled={isView || loading}
                    maxLength={256}
                />
                <FormikControl
                    control="input"
                    required="label-required" 
                    label={
                      integration_partner_code === 16 
                      ? "Scope" 
                      : (integration_partner_code === 7 || integration_partner_code === 9) 
                      ? "Duty Code" 
                      :"Domain"}  
                    name="domain"
                    style={{ maxWidth: 250 }}
                    size={formSize}
                    disabled={isView || loading}
                    maxLength={256}
                />
                {
                  isPCCRequired() && <FormikControl
                    control="input"
                    required="label-required" 
                    label="PCC" 
                    name="pcc"
                    style={{ maxWidth: 250 }}
                    size={formSize}
                    disabled={isView || loading}
                    maxLength={16}
                  />
                }
                
                {
                  isIPCCRequired() && <FormikControl
                    control="input"
                    required="label-required" 
                    label="IPCC" 
                    name="ipcc"
                    style={{ maxWidth: 250 }}
                    size={formSize}
                    disabled={isView || loading}
                    maxLength={16}
                  />
                }

                {
                  integration_partner_code === 7 && <FormikControl
                    control="input"
                    required="label-required" 
                    label="System ID" 
                    name="system_id"
                    style={{ maxWidth: 250 }}
                    size={formSize}
                    disabled={isView || loading}
                    maxLength={16}
                  />
                }
                {
                  isAgencyRequired() && <FormikControl
                    control="input"
                    required="label-required" 
                    label="Agency ID" 
                    name="agency_id"
                    style={{ maxWidth: 250 }}
                    size={formSize}
                    disabled={isView || loading}
                    maxLength={16}
                />
                }

                {
                  isIATARequired() && <FormikControl
                    control="input"
                    required="label-required" 
                    label="IATA Number" 
                    name="iata_number"
                    style={{ maxWidth: 250 }}
                    size={formSize}
                    disabled={isView || loading}
                    maxLength={16}
                  />
                }

                {
                  integration_partner_code === 8 && <FormikControl
                    control="input"
                    label="Customer Number" 
                    name="customer_number"
                    style={{ maxWidth: 250 }}
                    size={formSize}
                    disabled={isView || loading}
                    maxLength={16}
                  />
                }
                
                {
                  integration_partner_code === 1 && <FormikControl
                    control="input"
                    label="Printer Address" 
                    name="printer_address"
                    style={{ maxWidth: 250 }}
                    size={formSize}
                    disabled={isView || loading}
                    maxLength={16}
                  />
                }

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

export default withRouter(CreatePartnerCredential);
