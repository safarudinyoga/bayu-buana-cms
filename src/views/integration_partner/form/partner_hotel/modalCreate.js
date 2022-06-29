import React, { useEffect, useState } from "react"
import {
  Form,
  Row,
  Col,
  Button,
} from "react-bootstrap"
import { Formik, FastField, Field } from "formik"
import * as Yup from "yup"
import { useDispatch, useSelector } from "react-redux"
import { setAlert, setModalTitle, setCreateModal } from "redux/ui-store"
import Api from "config/api"
import _ from "lodash"
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css"
import "react-dropzone-uploader/dist/styles.css"
import axios from 'axios'
import { useParams } from "react-router-dom"
import CancelButton from "components/button/cancel";
import FormikControl from "../../../../components/formik/formikControl"

const endpoint = "/master/integration-partners";
const ModalCreate = (props) => {
  let dispatch = useDispatch()
  const showCreateModal = useSelector((state) => state.ui.showCreateModal)
  const { id } = useParams()
  const [cityId, setCityId] = useState(null)
  const [formValues, setFormValues] = useState(null)
  const isView = showCreateModal.disabled_form || props.isView;
  const [loading, setLoading] = useState(true);
  const [integrationPartnerCode, setIntegrationPartnerCode] = useState(2);
  let api = new Api()

  const duplicateValue = async(fieldName, value) => {
    let filters = encodeURIComponent(JSON.stringify([[fieldName,"=",value],["AND"],["integration_partner_id",id],["AND"],["status",1]]))
    let res = await api.get(endpoint + "/" + id + "/cities?" + `filters=${filters}`)

    if(cityId){
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
  // Initialize form
  const initialValues = {
    city_id: "",
    city_code: "",
    city_name: "", 
    latitude: "",
    longitude: ""
  }

  // Schema for yup
  const validationSchema = Yup.object().shape({
    city_id: Yup.object()
    .required("Room Type is required.")
    .uniqueValueObject("city_id","City already exists"),
    city_code: Yup.string()
    .required("Partner Room Type Code is required")
    .uniqueValueString('city_code', 'Partner City Code already exists'),
    city_name: Yup.string()
    .required("Partner Room Type Name is required")
    .uniqueValueString('city_name', 'Partner City Name already exists'),
  })

  useEffect(async () => {
    let formId = showCreateModal.id || props.id

    let docTitle = "Edit Partner Cities"
    if (!formId) {
      docTitle = "Create Partner Cities"
    }
    dispatch(setModalTitle(docTitle))

    try {
      let res = await api.get(endpoint + "/" + id);
      setIntegrationPartnerCode(res.data.integration_partner_code)
    } catch (e) {
      console.log(e)
    }
    if(formId) {
      try {
        let res = await api.get(endpoint + "/" + id + "/cities/" + formId);
        console.log(res);
        setFormValues({ 
          ...formValues,
          city_id: _.isEmpty(res.data.city) ? '' : {
            value: res.data.city.id,
            label: res.data.city.city_name,
          },
          city_code: res.data.city_code ? res.data.city_code : "",
          city_name: res.data.city_name ? res.data.city_name : "",
          latitude: res.data.latitude ? res.data.latitude : "",
          longitude: res.data.longitude ? res.data.longitude : "",
        })
      } catch (e) {
        console.log(e)
      }
    }
    
  }, [])
  const onSubmit = async (values, a) => {
    let formatted = {
      city_code: values.city_code,
      city_name: values.city_name,
      city_id: values.city_id.value,
      integration_partner_id: id,
      latitude: values.latitude == "" ? 0.0 : parseFloat(values.latitude),
      longitude: values.longitude == "" ? 0.0 : parseFloat(values.longitude)
    }

    try {
      if(cityId){
        let res = await api.put(endpoint + "/" + id + "/cities/" + cityId, formatted);
      }else{
          // let res = await api.post(endpoint + "/" + id + "/master/room-types", formatted);
          const payload = {
            "description": "esse eu laboris do ullamco",
            "hotel_id": "ebfe7458-2d01-fe1e-0dd1-625270611b41",
            "is_accrual": false,
            "is_non_smoking": true,
            "is_redeemable": false,
            "max_occupancy": 10,
            "number_of_beds": 10,
            "number_of_rooms": 10,
            "room_classification_id": "249ac09c-a6d7-1e94-b5a6-bbe44ecb2b50",
            "room_location_type_id": "urn:uuid:d2960df5-4149-b218-64b1-d2f8ebee9de5",
            "room_size": 25,
            "room_size_unit_of_measure_id": "bd2b8335-124f-e1d1-32f0-48397e60e70e",
            "room_type_code": values.city_code,
            "room_type_name": values.city_name,
            "room_view_type_id": "urn:uuid:5a8fe6c1-e625-aa8e-1db9-84bff6383356",
            "segment_category_id": "db7c7f00-5273-2d33-9cf4-6dfe6c1bdeac"
          };
          console.log(payload);
          return new Promise((resolve, rejecet) => {
            axios.post(api.env.endpoint("/master/room-types"), payload)
                .then((res) => {
                    // props.history.goBack()
                    if (res.status === 200) {
                      dispatch(
                        setAlert({
                            message: `Record 'Partner Room Type: ${values.city_name}' has been successfully saved.`,
                        })
                      );
                      props.onHide(false)
                      // return (
                      //   <FormAlert
                      //     isValid={true}
                      //     message={"succes"}
                      //   />
                      // )
                    }
                })
                .catch((error) => {
                    resolve(false)
                })
          })
      }
      dispatch(
        setAlert({
            message: `Record 'Partner City Name: ${values.city_name}' has been successfully saved.`,
        })
      );
      dispatch(setCreateModal({ show: false, id: null, disabled_form: false }));
      
    } catch (e) {
      dispatch(
        setAlert({
            message: "Failed to save this record.",
        })
    );
    }
};
  useEffect(() => {
    if (!showCreateModal.id) {
      setLoading(false);
  }

  if (formValues) {
      setLoading(false);
  }
    setCityId(showCreateModal.id)
  }, [showCreateModal.id, formValues])

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

  console.log('formValues', formValues)
  return (
    <div>
      <Formik initialValues={formValues || initialValues} validationSchema={validationSchema} onSubmit={onSubmit} validateOnMount enableReinitialize>
            {({ dirty, handleSubmit, isSubmitting, setFieldValue, handleChange, values }) => (
                <Form onSubmit={handleSubmit} className="ml-2">
                    <FormikControl
                        control="selectAsync"
                        required={isView ? "" : "label-required"}
                        label="Room Type"
                        name="city_id"
                        placeholder={"Please Choose."}
                        url={`master/room-types`}
                        fieldName={"room_type_name"}
                        onChange={(v) => {
                            setFieldValue("city_id", v);
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
                        maxLength={512}
                    />

                    <FormikControl
                        control="input"
                        required="label-required"
                        label="Partner Room Type Code"
                        name="city_code"
                        style={{ maxWidth: 250 }}
                        size={formSize}
                        disabled={isView || loading}
                        onChange={(e) => {
                            setFieldValue("city_code", e.target.value);
                        }}
                        maxLength={256}
                    />

                    <FormikControl
                        control="input"
                        required="label-required"
                        label="Partner Room Type Name"
                        name="city_name"
                        style={{ maxWidth: 250 }}
                        size={formSize}
                        disabled={isView || loading}
                        onChange={(e) => {
                            setFieldValue("city_name", e.target.value);
                        }}
                        maxLength={256}
                    />
                    {
                    integrationPartnerCode != 2 ? 
                    <FormikControl
                        control="input"
                        label="Latitude"
                        name="latitude"
                        style={{ maxWidth: 250 }}
                        size={formSize}
                        disabled={isView || loading}
                        onChange={(e) => {
                            setFieldValue("latitude", e.target.value);
                        }}
                        maxLength={16}
                    />
                    : null }
                  {
                    integrationPartnerCode != 2 ? 
                    <FormikControl
                        control="input"
                        label="Longitude"
                        name="longitude"
                        style={{ maxWidth: 250 }}
                        size={formSize}
                        disabled={isView || loading}
                        onChange={(e) => {
                            setFieldValue("longitude", e.target.value);
                        }}
                        maxLength={16}
                    /> : null }

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
    </div>
  )
}

export default ModalCreate


// import React, { useEffect, useState } from "react"
// import {
//   Card,
//   Form,
//   Row,
//   Col,
//   Button,
//   Image,
//   Tab,
//   Nav,
//   Modal,
// } from "react-bootstrap"
// import { Formik, FastField, Field } from "formik"
// import * as Yup from "yup"
// import { Editor } from "react-draft-wysiwyg"
// import FormAlert from "components/form/alert";
// import { ReactSVG } from "react-svg"
// import Dropzone from "react-dropzone-uploader"
// import axios from "axios"
// import useQuery from "lib/query"
// import { useDispatch } from "react-redux"
// import { setAlert, setUIParams } from "redux/ui-store"

// import Api from "config/api"
// import env from "config/environment"
// import Select from "components/form/select-async"

// import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css"
// import "react-dropzone-uploader/dist/styles.css"

// const endpoint = "/integration-partner-hotels"

// const ModalCreate = (props) => {
//   console.log(props);
//   const isView = useQuery().get("action") === "view"
//   let dispatch = useDispatch()

//   const [selectCountry, setSelectCountry] = useState([])
//   const [selectHotelBrand, setSelectHotelBrand] = useState([])
//   const [modalShow, setModalShow] = useState(false)
//   const [translations, setTranslations] = useState([])
//   const [loading, setLoading] = useState(true)
//   const [value1, setValue1] = useState("")

//   let api = new Api()

//   // Initialize form
//   const initialForm = {
//     // General Information
//     hotelCode: "",
//     hotelName: "",
//     hotelBrand: "",
//     starRating: "",
//     numberOfRooms: "",
//   }

//   const initialFormAdd = {
//     roomType: "",
//     roomTypeCode: "",
//     roomTypeName: "",
//   }
//   // Schema for yup
//   // const validationSchema = Yup.object().shape({
//   //   // General Information
//   //   hotelCode: Yup.string()
//   //     .required("Hotel Code is required.")
//   //     .test(
//   //       "Unique Code",
//   //       "Hotel Code already exists", // <- key, message
//   //       (value) => {
//   //         return new Promise((resolve, reject) => {
//   //           axios
//   //             .get(
//   //               `${env.API_URL}/integration-partner-hotels/`,
//   //             )
//   //             .then((res) => {
//   //               resolve(res.data.items.length == 0)
//   //             })
//   //             .catch((error) => {
//   //               resolve(false)
//   //             })
//   //         })
//   //       },
//   //     ),
//   // })

//   const validationSchemaModalAddMap = Yup.object().shape({
//     roomType: Yup.string().required("Caption is required."),
//     roomTypeCode: Yup.string().required("Caption is required."),
//     roomTypeName: Yup.string().required("Caption is required."),
//   })


  

//   useEffect(async () => {
//     let api = new Api()
//     let formId = ""

//     let docTitle = "Edit Aircraft"
//     if (!formId) {
//       docTitle = "Create Aircraft"
//     } else if (isView) {
//       docTitle = "View Aircraft"
//     }

//     dispatch(
//       setUIParams({
//         title: isView ? "Aircraft Details" : docTitle,
//         breadcrumbs: [
//           {
//             text: "Setup and Configurations",
//           },
//           {
//             link: props.backUrl,
//             text: "Aircrafts",
//           },
//           {
//             text: docTitle,
//           },
//         ],
//       }),
//     )
//     if (formId) {
//       try {
//         let res = await api.get(endpoint + "/" + formId)
//       } catch (e) {}

//       try {
//         let res = await api.get(endpoint + "/" + formId + "/translations", {
//           size: 50,
//         })
//         setTranslations(res.data.items)
//       } catch (e) {}
//       setLoading(false)
//     } else {
//     }
//   }, [])

//   const save = async (e, value) => {
//       e.preventDefault()
//       console.log(value, "masuk save");
//       const payload = {
//         "description": "esse eu laboris do ullamco",
//         "hotel_id": "ebfe7458-2d01-fe1e-0dd1-625270611b41",
//         "is_accrual": false,
//         "is_non_smoking": true,
//         "is_redeemable": false,
//         "max_occupancy": 10,
//         "number_of_beds": 10,
//         "number_of_rooms": 10,
//         "room_classification_id": "249ac09c-a6d7-1e94-b5a6-bbe44ecb2b50",
//         "room_location_type_id": "urn:uuid:d2960df5-4149-b218-64b1-d2f8ebee9de5",
//         "room_size": 25,
//         "room_size_unit_of_measure_id": "bd2b8335-124f-e1d1-32f0-48397e60e70e",
//         "room_type_code": value.roomTypeCode,
//         "room_type_name": value.roomTypeName,
//         "room_view_type_id": "urn:uuid:5a8fe6c1-e625-aa8e-1db9-84bff6383356",
//         "segment_category_id": "db7c7f00-5273-2d33-9cf4-6dfe6c1bdeac"
//       };
//       console.log(payload);
//       return new Promise((resolve, rejecet) => {
//         axios.post(api.env.endpoint("/master/room-types"), payload)
//             .then((res) => {
//                 // props.history.goBack()
//                 if (res.status === 200) {
//                   props.onHide(false)
//                   return (
//                     <FormAlert
//                       isValid={true}
//                       message={"succes"}
//                     />
//                   )
//                 }
//             })
//             .catch((error) => {
//                 resolve(false)
//             })
//       })
//   }

//   const validationSchema = Yup.object().shape({
//     hotel_id: Yup.object()
//     .required("Hotel is required.")
//     .uniqueValueObject("hotel_id","Hotel already exists"),
//     hotel_code: Yup.string()
//     .required("Partner Hotel Code is required")
//     .uniqueValueString('hotel_name', 'Partner Hotel Code already exists'),
//     hotel_name: Yup.string()
//     .required("Partner Hotel Name is required")
//     .uniqueValueString('hotel_name', 'Partner Hotel Name already exists'),
// });

//   return (
//     <div>
//       <Formik
//         initialValues={initialFormAdd}
//         validationSchema={validationSchema}
//         validateOnChange={false}
//         validateOnMount enableReinitialize
//         // onSubmit={async (values, { setSubmitting, resetForm }) => {
//         // }}
//         onSubmit={save}
//       >
//         {({
//           values,
//           errors,
//           touched,
//           dirty,
//           handleChange,
//           handleBlur,
//           handleSubmit,
//           isSubmitting,
//           setFieldValue,
//           setFieldTouched,
//         }) => (
//           <Form onSubmit={(e) => save(e, values)}
//             style={{background: 'transparent'}}
//           >
//                 <div style={{ padding: "0 10px 10px" }}>
//                   <Row>
//                     <Col sm={12}>
//                       <Form.Group as={Row} className="form-group" style={{display: 'flex', justifyContent: 'space-between'}}>
//                         <Form.Label column sm={4} style={{fontSize: 15}} >
//                           Room Type
//                           <span style={{marginRight: 10}} className="form-label-required">*</span>
//                         </Form.Label>
//                         <Col sm={7}>
//                           <FastField name="roomType">
//                             {({ field, form }) => (
//                               <div style={{ }}>
//                                 <Select
//                                   {...field}
//                                   url={`master/room-types`}
//                                   fieldName="room_type_name"
//                                   onChange={(v) => {
//                                       setFieldValue("roomType", v)
//                                   }}
//                                   placeholder="Please choose"
//                                   className={`react-select ${
//                                     form.touched.starRating &&
//                                     form.errors.starRating
//                                       ? "is-invalid"
//                                       : null
//                                   }`}
//                                 />
//                                 {form.touched.starRating &&
//                                   form.errors.starRating && (
//                                     <Form.Control.Feedback type="invalid">
//                                       {form.touched.starRating
//                                         ? form.errors.starRating
//                                         : null}
//                                     </Form.Control.Feedback>
//                                   )}
//                               </div>
//                             )}
//                           </FastField>
//                         </Col>
//                       </Form.Group>
//                       <Form.Group as={Row} className="form-group" style={{display: 'flex'}}>
//                         <Form.Label column sm={4.5} style={{fontSize: 15}}>
//                             Partner Room Type Code
//                           <span className="form-label-required">*</span>
//                         </Form.Label>
//                         <Col sm={7} style={{marginLeft: 25}}>
//                           <FastField name="roomTypeCode">
//                             {({ field }) => (
//                               <>
//                                 <Form.Control
//                                   type="text"
//                                   maxLength={9999}
//                                   style={{ width: 100 }}
//                                   {...field}
//                                 />
//                               </>
//                             )}
//                           </FastField>
//                         </Col>
//                       </Form.Group>
//                       <Form.Group as={Row} className="form-group" style={{display: 'flex'}}>
//                         <Form.Label column sm={4.5} style={{fontSize: 15}}>
//                             Partner Room Type Name
//                           <span className="form-label-required">*</span>
//                         </Form.Label>
//                         <Col sm={7} style={{marginLeft: 20}}>
//                           <FastField name="roomTypeName">
//                             {({ field }) => {
//                                 return(
//                                     <>
//                                         <Form.Control
//                                             onChange={() => console.log("diganti<<")}
//                                             value={field.name}
//                                             type="text"
//                                             maxLength={9999}
//                                             style={{ width: 200 }}
//                                             {...field}
//                                         />
//                                     </>
//                                 )
//                             }}
//                           </FastField>
//                         </Col>
//                       </Form.Group>
//                     </Col>
//                   </Row>
//                 </div>
//             <div style={{ marginBottom: 30, marginTop: 30, display: "flex" }}>
//               <Button
//                 variant="primary"
//                 type="submit"
//                 disabled={isSubmitting || !dirty}
//                 style={{ marginRight: 15 }}
//               >
//                 SAVE
//               </Button>
//               <Button
//                 variant="secondary"
//                 onClick={() => props.onHide(false)}
//               >
//                 CANCEL
//               </Button>
//             </div>
//           </Form>
//         )}
//       </Formik>
//     </div>
//   )
// }

// export default ModalCreate
