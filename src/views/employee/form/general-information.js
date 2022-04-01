import React, { useEffect, useState } from "react"
import { Card, Form, Row, Col, Button, Image, CloseButton } from "react-bootstrap"
import { Formik, FastField, Field } from "formik"
import * as Yup from "yup"
import ImageUploading from "react-images-uploading"
import axios from "axios"
import _ from "lodash"
import "./employee-form.css"
import { useWindowSize } from "rooks"
import { useSnackbar } from "react-simple-snackbar"
import useQuery from "lib/query"

import Api from "config/api"
import env from "config/environment"
import Select from "components/form/select"
import SelectAsync from "components/form/select-async"
import { auto } from "@popperjs/core"
import { useHistory } from "react-router"

const options = {
  position: "bottom-right",
}

const GeneralInformation = (props) => {
  const isView = useQuery().get("action") === "view"
  const history = useHistory()

  const [selectCurrentProvince, setSelectCurrentProvince] = useState([])
  const [selectCurrentCity, setSelectCurrentCity] = useState([])
  const [selectPermanentCountry, setSelectPermanentCountry] = useState([])
  const [selectPermanentProvince, setSelectPermanentProvince] = useState([])
  const [selectPermanentCity, setSelectPermanentCity] = useState([])
  const [selectNamePrefix, setSelectNamePrefix] = useState([])
  const [photoProfile, setPhotoProfile] = useState([])
  const [photoData, setPhotoData] = useState()
  const maxNumber = 1
  const { innerWidth, innerHeight, outerHeight, outerWidth } = useWindowSize();
  const [loading, setLoading]= useState(true)

  const [showCloseBtn, setShowCloseBtn] = useState(false)
  const [openSnackbar] = useSnackbar(options)
  let api = new Api()

  

  // Initialize form
  const [initialForm, setInitialForm] = useState({
    // General Information
    title: { value: "db24d53c-7d36-4770-8598-dc36174750af", label: "Mr" },
    firstName: "",
    middleName: "",
    lastName: "",
    // dateOfBirth: "",
    gender: "db24d53c-7d36-4770-8598-dc36174750af",
    idCardNumber: "",
    dobDay: "",
    dobMonth: "",
    dobYear: "",

    // Contacts
    homePhone: "",
    mobilePhone: "",
    email: "",
    otherEmail: "",

    // Current Address
    currentAddress: "",
    currentCountry: "",
    currentProvince: "",
    currentCity: "",
    currentZipCode: "",

    // Permanent Address
    sameAddress: false,
    permanentAddress: "",
    permanentCountry: "",
    permanentProvince: "",
    permanentCity: "",
    permanentZipCode: "",
  })

  const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

  // Schema for yup
  const validationSchema = Yup.object().shape({
    // General Information
    title: Yup.object().required("Title is required."),
    firstName: Yup.string().required("First Name is required."),
    middleName: Yup.string(),
    lastName: Yup.string().required("Last Name is required."),
    // dateOfBirth: Yup.string().required("Date of Birth is required."),
    gender: Yup.string().required("Gender is required."),
    idCardNumber: Yup.string(),

    // Contacts
    
    homePhone: Yup.string()
          .required("Home Phone is required.")
          .matches(phoneRegExp, 'Home Phone is not valid'),
    mobilePhone: Yup.string()
          .required("Mobile Phone is required.")
          .matches(phoneRegExp, 'Mobile Phone is not valid'),
    email: Yup.string()
      .email("Email is not valid.")
      .required("Email is required.")
      .test(
        "Unique Email Contacts",
        "Email already exists", // <- key, message
        (value) => {
          return new Promise((resolve, reject) => {
            axios
              .get(
                `${env.API_URL}/master/employees?filters=["email","=","${value}"]`,
              )
              .then((res) => {
                resolve(res.data.items.length == 0)
              })
              .catch((error) => {
                resolve(false)
              })
          })
        },
      ),
    otherEmail: Yup.string().email("Email is not valid."),

    // Current Address
    currentAddress: Yup.string(),
    currentCountry: Yup.object().required("Country is required."),
    currentProvince: Yup.object().nullable(true),
    currentCity: Yup.object().nullable(true),
    currentZipCode: Yup.string(),

    // Permanent Address
    sameAddress: Yup.boolean(),
    permanentAddress: Yup.string(),
    permanentCountry: Yup.object().when("sameAddress", {
      is: false,
      then: Yup.object().required("Country is required."),
    }),
    permanentProvince: Yup.object().nullable(true),
    permanentCity: Yup.object().nullable(true),
    permanentZipCode: Yup.string(),
  })

  // Birthday
  const selectDay = () => {
    const options = []
    const today = new Date();
    let currentYear = today.getFullYear();
    let currentMonth = today.getMonth()+1;
    let currentDate = today.getDate()
    if(initialForm.dobYear.value === currentYear && initialForm.dobMonth.value === currentMonth){
      for (let i = 1; i <= currentDate; i++) {
        options.push({
          label: i,
          value: i,
        })
      }
    } else {
      if(initialForm.dobMonth.value === 2 && initialForm.dobYear.value % 4 == 0){
        for (let i = 1; i <= 29; i++) {
          options.push({
            label: i,
            value: i,
          })
        }
      } else if(initialForm.dobMonth.value === 2 && initialForm.dobYear.value % 4 != 0){
        for (let i = 1; i <= 28; i++) {
          options.push({
            label: i,
            value: i,
          })
        }
      } else if(initialForm.dobMonth.value === 4 || initialForm.dobMonth.value === 6 || initialForm.dobMonth.value === 9 || initialForm.dobMonth.value === 11) {
        for (let i = 1; i <= 30; i++) {
          options.push({
            label: i,
            value: i,
          })
        }
      } else {
        for (let i = 1; i <= 31; i++) {
          options.push({
            label: i,
            value: i,
          })
        }
      }
      
    }
    
    return options
  }
  const selectMonth = () => {
    const options = []
    const today = new Date();
    let currentYear = today.getFullYear();
    let currentMonth = today.getMonth()+1;
    const month = Array.from({ length: initialForm.dobYear.value === currentYear ? currentMonth : 12 }, (e, i) => {
      return new Date(null, i + 1, null).toLocaleDateString("en", {
        month: "long",
      })
    })
    
    month.forEach((data, i) => {
      options.push({
        label: data,
        value: i + 1,
      })
    })
    return options
  }
  const selectYear = () => {
    const options = []

    const startYear = 1921
    const endYear = new Date().getFullYear()

    for (let i = endYear; i >= startYear; i--) {
      options.push({
        label: i,
        value: i,
      })
    }

    return options
  }

  // Current Country state
  const handleChangeCurrentCountry = async (v) => {
    try {
      let res = await api.get(
        `/master/state-provinces?filters=[["country_id","=","${v}"],["AND"],["status","=",1]]&sort=state_province_name`,
      )
      const options = []
      if(res.data.items.length > 0){
        res.data.items.forEach((data) => {
          options.push({
            label: data.state_province_name,
            value: data.id,
          })
          
          setSelectCurrentProvince(options)
        })
      } else {
        setSelectCurrentProvince([])
      }

      let res2 = await api.get(
        `/master/cities?filters=[["country_id","=","${v}"],["AND"],["status","=",1]]&sort=city_name`,
      )
      const optionsCity = []
      if(res2.data.items.length > 0){
        res2.data.items.forEach((data) => {
          optionsCity.push({
            label: data.city_name,
            value: data.id,
          })
          
          setSelectCurrentCity(optionsCity)
        })
      } else {
        setSelectCurrentCity([])
      }
      
      
    } catch (e) {}
  }

  // Permanent Country state
  const handleChangePermanentCountry = async (v) => {
    try {
      let res = await api.get(
        `/master/state-provinces?filters=[["country_id","=","${v}"],["AND"],["status","=",1]]&sort=state_province_name`,
      )
      const options = []
      if(res.data.items.length > 0){
        res.data.items.forEach((data) => {
          options.push({
            label: data.state_province_name,
            value: data.id,
          })
          
          setSelectPermanentProvince(options)
        })
      } else {
        setSelectPermanentProvince([])
      }
      let res2 = await api.get(
        `/master/cities?filters=[["country_id","=","${v}"],["AND"],["status","=",1]]&sort=city_name`,
      )
      const optionsCity = []
      if(res2.data.items.length > 0){
        res2.data.items.forEach((data) => {
          optionsCity.push({
            label: data.city_name,
            value: data.id,
          })
          
          setSelectPermanentCity(optionsCity)
        })
      } else {
        setSelectPermanentCity([])
      }
      
    } catch (e) {}
  }
  // Current Province state
  const handleChangeCurrentProvince = async (v) => {
    try {
      let res = await api.get(
        `/master/cities?filters=[["state_province_id","=","${v}"],["AND"],["status","=",1]]&sort=city_name`,
      )
      const options = []
      if(res.data.items.length > 0){
        res.data.items.forEach((data) => {
          options.push({
            label: data.city_name,
            value: data.id,
          })
          setSelectCurrentCity(options)
        })
      } else {
        setSelectCurrentCity([])
      }
      
    } catch (e) {}
  }
  // // Permanent Province state
  const handleChangePermanentProvince = async (v) => {
    try {
      let res = await api.get(
        `/master/cities?filters=[["state_province_id","=","${v}"],["AND"],["status","=",1]]&sort=city_name`,
      )
      const options = []
      if(res.data.items.length > 0){
        res.data.items.forEach((data) => {
          options.push({
            label: data.city_name,
            value: data.id,
          })
          setSelectPermanentCity(options)
        })
      } else {
        setSelectPermanentCity([])
      }
      
    } catch (e) {}
  }

  // Upload profile
  const onChangePhotoProfile = (imageList) => {
    setPhotoProfile(imageList)
  }

  useEffect(async () => {
    try {
      let res = await api.get("/master/countries")
      const options = []
      res.data.items.forEach((data) => {
        options.push({
          label: data.country_name,
          value: data.id,
        })
        setSelectPermanentCountry(options)
      })
    } catch (e) {}
  }, [])

  useEffect(async() => {
    try {
      let res = await api.get("/master/name-prefixes")
      const options = []
      res.data.items.forEach((data) => {
        options.push({
          label: data.name_prefix_name,
          value: data.id,
        })
        setSelectNamePrefix(options)
      })
    } catch(e) {

    }
  }, [])

  useEffect(async () => {
    try {
      if(props.employeeData) {
        let data = props.employeeData
        let formData = props.formData
        if(formData.given_name) {
          setInitialForm({
            ...initialForm,
            title: _.isEmpty(formData.name_prefix) ? "" : {
              ...initialForm.title,
              value: formData.name_prefix.id,
              label: formData.name_prefix.name_prefix_name
            },
            firstName: formData.given_name ? formData.given_name : "",
            middleName: formData.middle_name ? formData.middle_name : "",
            lastName: formData.surname ? formData.surname : "",
            gender: _.isEmpty(formData.gender) ? formData.gender_id : formData.gender.id,
            idCardNumber: formData.ktp ? formData.ktp : "",
            dobDay: formData.birth_date ? {
              value: parseInt(formData.birth_date.split("-")[2]),
              label: parseInt(formData.birth_date.split("-")[2]), 
            } : {
              value: 1,
              label: 1,
            },
            dobMonth: formData.birth_date ? {
              value: parseInt(formData.birth_date.split("-")[1]),
              label: new Date(null, parseInt(formData.birth_date.split("-")[1]), null).toLocaleDateString("en", {
                month: "long",
              }), 
            }: {
              value: 1,
              label: 1,
            },
            dobYear: formData.birth_date ? {
              value: parseInt(formData.birth_date.split("-")[0]),
              label: parseInt(formData.birth_date.split("-")[0]),  
            } : {
              value: 1921,
              label: 1921,
            },
            
            // Contacts
            homePhone: _.isEmpty(formData.contact) ? "" : formData.contact.phone_number ? formData.contact.phone_number : "",
            mobilePhone: _.isEmpty(formData.contact) ? "" : formData.contact.mobile_phone_number ? formData.contact.mobile_phone_number : "",
            email: _.isEmpty(formData.contact) ? "" : formData.contact.email ? formData.contact.email : "",
            otherEmail: _.isEmpty(formData.contact) ? "" : formData.contact.other_email ? formData.contact.other_email : "",
    
            // Current Address
            currentAddress: _.isEmpty(formData.address) ? "" : formData.address.address_line ? formData.address.address_line : "",
            currentCountry: _.isEmpty(formData.address) ? "" : formData.address.country ? {
              value: formData.address.country_id,
              label: formData.address.country.country_name
            } : "",
            currentProvince: _.isEmpty(formData.address) ? "" : formData.address.state_province ? {
              value: formData.address.state_province_id,
              label: formData.address.state_province.state_province_name
            } : "",
            currentCity: _.isEmpty(formData.address) ? "" : formData.address.city ? {
              value: formData.address.city.id,
              label: formData.address.city.city_name
            } : "",
            currentZipCode: _.isEmpty(formData.address) ? "" : formData.address.postal_code ? formData.address.postal_code : "",
    
            // Permanent Address
            sameAddress: (
              formData.permanent_address.address_line == formData.address.address_line && 
              formData.permanent_address.country_id == formData.address.country_id &&
              formData.permanent_address.city_id == formData.address.city_id &&
              formData.permanent_address.state_province_id == formData.address.state_province_id &&
              formData.permanent_address.postal_code == formData.address.postal_code
            ) ? true : false,
            permanentAddress: _.isEmpty(formData.permanent_address) ? "" : formData.permanent_address.address_line ? formData.permanent_address.address_line : "",
            permanentCountry: _.isEmpty(formData.permanent_address) ? "" : formData.permanent_address.country ? {
              value: formData.permanent_address.country_id,
              label: formData.permanent_address.country.country_name,
            } : "",
            permanentProvince: _.isEmpty(formData.permanent_address) ? "" : formData.permanent_address.state_province ? {
              value: formData.permanent_address.state_province_id,
              label: formData.permanent_address.state_province.state_province_name,
            } : "",
            permanentCity: _.isEmpty(formData.permanent_address) ? "" : formData.permanent_address.city ? {
              value: formData.permanent_address.city_id,
              label: formData.permanent_address.city.city_name
            } : "",
            permanentZipCode: _.isEmpty(formData.permanent_address) ? "" : formData.permanent_address.postal_code ? formData.permanent_address.postal_code : "",
            photoProfile: _.isEmpty(formData.employee_asset.multimedia_description) ? null : [{
              data_url: formData.employee_asset.multimedia_description.url
            }],
          });
        }else{
          setInitialForm({
            ...initialForm,
            title: _.isEmpty(data.name_prefix) ? "" : {
              ...initialForm.title,
              value: data.name_prefix.id,
              label: data.name_prefix.name_prefix_name
            },
            firstName: data.given_name ? data.given_name : "",
            middleName: data.middle_name ? data.middle_name : "",
            lastName: data.surname ? data.surname : "",
            gender: _.isEmpty(data.gender) ? data.gender_id : data.gender.id,
            idCardNumber: data.ktp ? data.ktp : "",
            dobDay: data.birth_date ? {
              value: parseInt(data.birth_date.split("-")[2]),
              label: parseInt(data.birth_date.split("-")[2]), 
            } : {
              value: 1,
              label: 1,
            },
            dobMonth: data.birth_date ? {
              value: parseInt(data.birth_date.split("-")[1]),
              label: new Date(null, parseInt(data.birth_date.split("-")[1]), null).toLocaleDateString("en", {
                month: "long",
              }), 
            }: {
              value: 1,
              label: 1,
            },
            dobYear: data.birth_date ? {
              value: parseInt(data.birth_date.split("-")[0]),
              label: parseInt(data.birth_date.split("-")[0]),  
            } : {
              value: 1921,
              label: 1921,
            },
            
            // Contacts
            homePhone: _.isEmpty(data.contact) ? "" : data.contact.phone_number ? data.contact.phone_number : "",
            mobilePhone: _.isEmpty(data.contact) ? "" : data.contact.mobile_phone_number ? data.contact.mobile_phone_number : "",
            email: _.isEmpty(data.contact) ? "" : data.contact.email ? data.contact.email : "",
            otherEmail: _.isEmpty(data.contact) ? "" : data.contact.other_email ? data.contact.other_email : "",
    
            // Current Address
            currentAddress: _.isEmpty(data.address) ? "" : data.address.address_line ? data.address.address_line : "",
            currentCountry: _.isEmpty(data.address) ? "" : data.address.country ? {
              value: data.address.country_id,
              label: data.address.country.country_name
            } : "",
            currentProvince: _.isEmpty(data.address) ? "" : data.address.state_province ? {
              value: data.address.state_province_id,
              label: data.address.state_province.state_province_name
            } : "",
            currentCity: _.isEmpty(data.address) ? "" : data.address.city ? {
              value: data.address.city.id,
              label: data.address.city.city_name
            } : "",
            currentZipCode: _.isEmpty(data.address) ? "" : data.address.postal_code ? data.address.postal_code : "",
    
            // Permanent Address
            sameAddress: (
              data.permanent_address.address_line == data.address.address_line && 
              data.permanent_address.country_id == data.address.country_id &&
              data.permanent_address.city_id == data.address.city_id &&
              data.permanent_address.state_province_id == data.address.state_province_id &&
              data.permanent_address.postal_code == data.address.postal_code
            ) ? true : false,
            permanentAddress: _.isEmpty(data.permanent_address) ? "" : data.permanent_address.address_line ? data.permanent_address.address_line : "",
            permanentCountry: _.isEmpty(data.permanent_address) ? "" : data.permanent_address.country ? {
              value: data.permanent_address.country_id,
              label: data.permanent_address.country.country_name,
            } : "",
            permanentProvince: _.isEmpty(data.permanent_address) ? "" : data.permanent_address.state_province ? {
              value: data.permanent_address.state_province_id,
              label: data.permanent_address.state_province.state_province_name,
            } : "",
            permanentCity: _.isEmpty(data.permanent_address) ? "" : data.permanent_address.city ? {
              value: data.permanent_address.city_id,
              label: data.permanent_address.city.city_name
            } : "",
            permanentZipCode: _.isEmpty(data.permanent_address) ? "" : data.permanent_address.postal_code ? data.permanent_address.postal_code : "",
            photoProfile: _.isEmpty(data.employee_asset.multimedia_description) ? null : [{
              data_url: data.employee_asset.multimedia_description.url
            }],
          });
        }
      }
    } catch(e) {
      console.log(e)
    }
  }, [props.employeeData, props.formData])

  return (
    <>
      <Formik
        initialValues={initialForm}
        validationSchema={validationSchema}
        validator={() => ({})}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          setSubmitting(true)
          let day = values.dobDay.value < 10 ? ("0"+values.dobDay.value) : values.dobDay.value;
          let month = values.dobMonth.value < 10 ? ("0"+values.dobMonth.value) : values.dobMonth.value;
          let year = values.dobYear.value;

          let formatted = {
            address: {
              address_line: values.currentAddress ? values.currentAddress : "",
              country_id: values.currentCountry ? values.currentCountry.value : "",
              state_province_id: values.currentProvince ? values.currentProvince.value : "00000000-0000-0000-0000-000000000000",
              city_id: values.currentCity ? values.currentCity.value : "00000000-0000-0000-0000-000000000000",
              postal_code: values.currentZipCode ? values.currentZipCode : ""
            },
            contact: {
              email: values.email,
              mobile_phone_number: values.mobilePhone,
              other_email: values.otherEmail,
              phone_number: values.homePhone
            },
            employee_asset: {
              multimedia_description_id: photoData,
            },
            ktp: values.idCardNumber,
            given_name: values.firstName,
            middle_name: values.middleName,
            surname: values.lastName,
            birth_date: year+"-"+month+"-"+day,
            name_prefix_id: values.title.value,
            gender_id: values.gender,
            permanent_address: values.sameAddress ? {
              address_line: values.currentAddress ? values.currentAddress : "",
              country_id: values.currentCountry ? values.currentCountry.value : "",
              state_province_id: values.currentProvince ? values.currentProvince.value : "00000000-0000-0000-0000-000000000000",
              city_id: values.currentCity ? values.currentCity.value : "00000000-0000-0000-0000-000000000000",
              postal_code: values.currentZipCode ? values.currentZipCode : ""
            } : {
              address_line: values.permanentAddress ? values.permanentAddress : "",
              country_id: values.permanentCountry ? values.permanentCountry.value : "",
              state_province_id: values.permanentProvince ? values.permanentProvince.value : "00000000-0000-0000-0000-000000000000",
              city_id: values.permanentCity ? values.permanentCity.value : "00000000-0000-0000-0000-000000000000",
              postal_code: values.permanentZipCode ? values.permanentZipCode : "" 
            }
          }
          console.log(formatted);

          await props.onSubmit(formatted)
          setSubmitting(false)
        }}

        enableReinitialize
      >
        {({
          values,
          errors,
          touched,
          dirty,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          isValid,
          setFieldValue,
          setFieldTouched,
        }) => (
          <Form onSubmit={handleSubmit}>
            <Card style={{marginBottom: 0}}>
              <Card.Body>
                {props.isMobile ? "" : <h3 className="card-heading">General Information</h3>}
                <div style={{ padding: "0 15px 15px" }}>
                  <Row>
                  {
                    // Tablet
                    innerWidth > 480 && innerWidth <= 768 ? (
                      <div>
                        <div
                          className="img-profile-wrapper"
                          style={{marginBottom: 20}}
                        >
                          <Row>
                            {photoProfile.length == 0 && (
                              <Image
                                src="/img/media/profile.svg"
                                className="img-profile"
                                roundedCircle
                              />
                            )}
                            <ImageUploading
                              value={photoProfile}
                              onChange={onChangePhotoProfile}
                              dataURLKey="data_url"
                              acceptType={["png", "jpg", "jpeg"]}
                            >
                              {({
                                imageList,
                                onImageUpload,
                                onImageUpdate,
                                onImageRemove,
                                errors,
                              }) => (
                                // write your building UI
                                <>
                                  {imageList.map((image, index) => (
                                    <div key={index} className="image-item" style={{position: "relative"}}
                                      onMouseEnter={e => {
                                        setShowCloseBtn(true)
                                      }}
                                      onMouseLeave={e => {
                                        setShowCloseBtn(false)
                                      }}
                                    >
                                      <Image
                                        src={image["data_url"]}
                                        roundedCircle
                                        className="img-profile"
                                      />
                                      {!isView && (
                                      <CloseButton                    
                                        style={{position: "absolute", top: 0, right: 0, display: showCloseBtn ? "block" : "none"}}
                                        onClick={() => onImageRemove(0)} 
                                      />
                                      )}
                                    </div>
                                  ))}
                                  {!isView && (
                                  <Button
                                    variant="secondary"
                                    style={{margin: "auto 20px"}}
                                    onClick={() => 
                                      photoProfile.length !== 0
                                        ? onImageUpload()
                                        : onImageUpdate(0)
                                    }
                                  >
                                    UPLOAD PHOTO
                                  </Button>
                                  )}
                                  {errors && (
                                    <>
                                      {errors.acceptType && (
                                        <p className="img-error-label">
                                          Only .png, .jpg, .jpeg file supported
                                        </p>
                                      )}
                                    </>
                                  )}
                                </>
                              )}
                            </ImageUploading>
                          </Row>
                        </div>
                      </div>
                    ) : ""
                  }
                  {
                    // Mobile
                    innerWidth > 480 ? "" : (
                      <div style={{ height: 170, margin: "0 auto" }}>
                        <div
                          className="img-profile-wrapper"
                          style={{ textAlign: "center" }}
                        >
                          <div>
                            {photoProfile.length == 0 && (
                              <Image
                                src="/img/media/profile.svg"
                                className="img-profile"
                                roundedCircle
                              />
                            )}
                            <ImageUploading
                              value={photoProfile}
                              onChange={onChangePhotoProfile}
                              dataURLKey="data_url"
                              acceptType={["png", "jpg", "jpeg"]}
                            >
                              {({
                                imageList,
                                onImageUpload,
                                onImageUpdate,
                                onImageRemove,
                                errors,
                              }) => (
                                // write your building UI
                                <>
                                  {imageList.map((image, index) => (
                                    <div key={index} className="image-item" style={{position: "relative"}}
                                      onMouseEnter={e => {
                                        setShowCloseBtn(true)
                                      }}
                                      onMouseLeave={e => {
                                        setShowCloseBtn(false)
                                      }}
                                    >
                                      <Image
                                        src={image["data_url"]}
                                        roundedCircle
                                        className="img-profile"
                                      />
                                      {!isView && (
                                        <CloseButton                    
                                          style={{position: "absolute", top: 0, right: 0, display: showCloseBtn ? "block" : "none"}}
                                          onClick={() => onImageRemove(0)} 
                                        />
                                      )}
                                    </div>
                                  ))}
                                  {!isView && (
                                  <Button
                                    variant="secondary"
                                    onClick={() => 
                                      photoProfile.length !== 0
                                        ? onImageUpload()
                                        : onImageUpdate(0)
                                    }
                                  >
                                    UPLOAD PHOTO
                                  </Button>
                                  )}
                                  {errors && (
                                    <>
                                      {errors.acceptType && (
                                        <p className="img-error-label">
                                          Only .png, .jpg, .jpeg file supported
                                        </p>
                                      )}
                                    </>
                                  )}
                                </>
                              )}
                            </ImageUploading>
                          </div>
                        </div>
                      </div>
                    )

                  }
                    <Col sm={9}>
                      <Form.Group as={Row} className="form-group">
                        <Form.Label column sm={4}>
                          Title <span className="form-label-required">*</span>
                        </Form.Label>
                        <Col sm={8}>
                          <FastField name="title">
                            {({ field, form }) => (
                              <>
                                <div style={{ width: 90 }}>
                                  <Select
                                    {...field}
                                    options={selectNamePrefix}
                                    isDisabled={isView}
                                    defaultValue={values.title}
                                    className={`react-select ${
                                      form.touched.title && form.errors.title
                                        ? "is-invalid"
                                        : null
                                    }`}
                                    onChange={(v) => {
                                      setFieldValue("title", v)
                                    }}
                                  />
                                  {form.touched.title && form.errors.title && (
                                    <Form.Control.Feedback type="invalid">
                                      {form.touched.title
                                        ? form.errors.title
                                        : null}
                                    </Form.Control.Feedback>
                                  )}
                                </div>
                              </>
                            )}
                          </FastField>
                        </Col>
                      </Form.Group>
                      <Form.Group as={Row} className="form-group">
                        <Form.Label column sm={4}>
                          First Name{" "}
                          <span className="form-label-required">*</span>
                        </Form.Label>
                        <Col sm={8}>
                          <FastField name="firstName" disabled>
                            {({ field, form }) => (
                              <>
                                <Form.Control
                                  type="text"
                                  disabled={isView}
                                  isInvalid={
                                    form.touched.firstName &&
                                    form.errors.firstName
                                  }
                                  minLength={1}
                                  maxLength={128}
                                  {...field}
                                  style={{ maxWidth: 300 }}
                                />
                                {form.touched.firstName &&
                                  form.errors.firstName && (
                                    <Form.Control.Feedback type="invalid">
                                      {form.touched.firstName
                                        ? form.errors.firstName
                                        : null}
                                    </Form.Control.Feedback>
                                  )}
                              </>
                            )}
                          </FastField>
                        </Col>
                      </Form.Group>
                      <Form.Group as={Row} className="form-group">
                        <Form.Label column sm={4}>
                          Middle Name
                        </Form.Label>
                        <Col sm={8}>
                          <FastField name="middleName">
                            {({ field }) => (
                              <Form.Control
                                {...field}
                                type="text"
                                disabled={isView}
                                minLength={1}
                                maxLength={128}
                                style={{ maxWidth: 300 }}
                              />
                            )}
                          </FastField>
                        </Col>
                      </Form.Group>
                      <Form.Group as={Row} className="form-group">
                        <Form.Label column sm={4}>
                          Last Name{" "}
                          <span className="form-label-required">*</span>
                        </Form.Label>
                        <Col sm={8}>
                          <FastField name="lastName">
                            {({ field, form }) => (
                              <>
                                <Form.Control
                                  {...field}
                                  disabled={isView}
                                  type="text"
                                  isInvalid={
                                    form.touched.lastName &&
                                    form.errors.lastName
                                  }
                                  minLength={1}
                                  maxLength={128}
                                  style={{ maxWidth: 300 }}
                                />
                                {form.touched.lastName &&
                                  form.errors.lastName && (
                                    <Form.Control.Feedback type="invalid">
                                      {form.touched.lastName
                                        ? form.errors.lastName
                                        : null}
                                    </Form.Control.Feedback>
                                  )}
                              </>
                            )}
                          </FastField>
                        </Col>
                      </Form.Group>
                      <Form.Group as={Row} className="form-group">
                        <Form.Label column sm={4}>
                          Date Of Birth{" "}
                          <span className="form-label-required">*</span>
                        </Form.Label>
                        <Col sm={8}>
                          <div style={{ width: 320, display: "flex" }}>
                            <div style={{ marginRight: 12, flex: 1 }}>
                              <Select
                                options={selectDay()}
                                value={values.dobDay}
                                isDisabled={isView}
                                placeholder="Day"
                                className={`react-select ${
                                  touched.title && Boolean(errors.title)
                                    ? "is-invalid"
                                    : ""
                                }`}
                                components={{
                                  IndicatorSeparator: () => null,
                                }}
                                style={{ marginRight: 12 }}
                                onChange={(v) => {
                                  setFieldValue("dobDay", v)
                                }}
                              />
                            </div>
                            <div style={{ marginRight: 12, flex: 2 }}>
                              <Select
                                options={selectMonth()}
                                value={values.dobMonth}
                                placeholder="Month"
                                isDisabled={isView}
                                disabled={true}
                                className={`react-select ${
                                  touched.title && Boolean(errors.title)
                                    ? "is-invalid"
                                    : ""
                                }`}
                                components={{
                                  IndicatorSeparator: () => null,
                                }}
                                style={{ marginRight: 12 }}
                                onChange={(v) => {
                                  setFieldValue("dobMonth", v)
                                  setInitialForm({
                                    ...initialForm,
                                    dobMonth: v
                                  })
                                }}
                              />
                            </div>
                            <div style={{ flex: 1 }}>
                              <Select
                                options={selectYear()}
                                value={values.dobYear}
                                placeholder="Year"
                                isDisabled={isView}
                                className={`react-select ${
                                  touched.title && Boolean(errors.title)
                                    ? "is-invalid"
                                    : ""
                                }`}
                                components={{
                                  IndicatorSeparator: () => null,
                                }}
                                style={{ marginRight: 12 }}
                                onChange={(v) => {
                                  setFieldValue("dobYear", v)
                                  setInitialForm({
                                    ...initialForm,
                                    dobYear: v
                                  })
                                }}
                              />
                            </div>
                          </div>
                          {touched.title && Boolean(errors.title) && (
                            <div className="invalid-feedback">
                              {touched.title ? errors.title : ""}
                            </div>
                          )}
                        </Col>
                      </Form.Group>
                      <Form.Group as={Row} className="form-group">
                        <Form.Label column sm={4}>
                          Gender <span className="form-label-required">*</span>
                        </Form.Label>
                        <Col sm={8}>
                          <div
                            style={{
                              height: 38,
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            <FastField name="gender">
                              {({ field, form }) => (
                                <Form.Check
                                  {...field}
                                  disabled={isView}
                                  checked={values.gender === "db24d53c-7d36-4770-8598-dc36174750af"}
                                  type="radio"
                                  label="Male"
                                  isInvalid={
                                    form.touched.gender && form.errors.gender
                                  }
                                  style={{ marginRight: 30 }}
                                  inline
                                  onChange={(e) =>
                                    setFieldValue("gender", "db24d53c-7d36-4770-8598-dc36174750af")
                                  }
                                />
                              )}
                            </FastField>
                            <FastField name="gender">
                              {({ field, form }) => (
                                <Form.Check
                                  {...field}
                                  disabled={isView}
                                  checked={values.gender === "db24d53c-7d36-4770-8598-dc36174750ad"}
                                  type="radio"
                                  label="Female"
                                  isInvalid={
                                    form.touched.gender && form.errors.gender
                                  }
                                  inline
                                  onChange={() =>
                                    setFieldValue("gender", "db24d53c-7d36-4770-8598-dc36174750ad")
                                  }
                                />
                              )}
                            </FastField>
                            {touched.gender && errors.gender && (
                              <Form.Control.Feedback type="invalid">
                                {touched.gender ? errors.gender : null}
                              </Form.Control.Feedback>
                            )}
                          </div>
                        </Col>
                      </Form.Group>
                      <Form.Group as={Row} className="form-group">
                        <Form.Label column sm={4}>
                          ID Card Number (KTP)
                        </Form.Label>
                        <Col sm={8}>
                          <FastField name="idCardNumber">
                            {({ field }) => (
                              <Form.Control
                                {...field}
                                type="text"
                                minLength={1}
                                maxLength={36}
                                disabled={isView}
                                style={{ maxWidth: 300 }}
                              />
                            )}
                          </FastField>
                        </Col>
                      </Form.Group>
                    </Col>
                    
                    {
                      innerWidth <= 768 ? "" : (
                        <Col sm={3} style={{ height: 170 }}>
                          <div
                            className="img-profile-wrapper"
                            style={{ textAlign: "center" }}
                          >
                            <div>
                              {photoProfile.length == 0 && (
                                <Image
                                  src="/img/media/profile.svg"
                                  className="img-profile"
                                  roundedCircle
                                />
                              )}
                              <ImageUploading
                                value={photoProfile}
                                onChange={onChangePhotoProfile}
                                dataURLKey="data_url"
                                acceptType={["png", "jpg", "jpeg"]}
                              >
                                {({
                                  imageList,
                                  onImageUpload,
                                  onImageUpdate,
                                  onImageRemove,
                                  errors,
                                }) => (
                                  // write your building UI
                                  <>
                                    {imageList.map((image, index) => (
                                      <div key={index} className="image-item" style={{position: "relative"}}
                                        onMouseEnter={e => {
                                          setShowCloseBtn(true)
                                        }}
                                        onMouseLeave={e => {
                                          setShowCloseBtn(false)
                                        }}
                                      >
                                        <Image
                                          src={image["data_url"]}
                                          roundedCircle
                                          className="img-profile"
                                        />
                                        {!isView && (
                                          <CloseButton                    
                                            style={{position: "absolute", top: 0, right: 0, display: showCloseBtn ? "block" : "none"}}
                                            onClick={() => onImageRemove(0)} 
                                          />
                                        )}
                                      </div>
                                    ))}
                                    {!isView && (
                                    <Button
                                      variant="secondary"
                                      onClick={() => 
                                        photoProfile.length !== 0
                                          ? onImageUpload()
                                          : onImageUpdate(0)
                                      }
                                    >
                                      UPLOAD PHOTO
                                    </Button>
                                    )}
                                    {errors && (
                                      <>
                                        {errors.acceptType && (
                                          <p className="img-error-label">
                                            Only .png, .jpg, .jpeg file supported
                                          </p>
                                        )}
                                      </>
                                    )}
                                  </>
                                )}
                              </ImageUploading>
                            </div>
                          </div>
                        </Col>
                      )
                    }
                    
                  </Row>
                </div>
                <h3 className="card-heading">Contacts</h3>
                <div style={{ padding: "0 15px 15px 15px" }}>
                  <Form.Group as={Row} className="form-group">
                    <Form.Label column sm={3}>
                      Home Phone <span className="form-label-required">*</span>
                    </Form.Label>
                    <Col sm={9}>
                      <FastField name="homePhone">
                        {({ field, form }) => (
                          <>
                            <Form.Control
                              {...field}
                              type="text"
                              disabled={isView}
                              style={{ maxWidth: 200 }}
                              isInvalid={
                                form.touched.homePhone && form.errors.homePhone
                              }
                              minLength={1}
                              maxLength={32}
                            />
                            {form.touched.homePhone &&
                              form.errors.homePhone && (
                                <Form.Control.Feedback type="invalid">
                                  {form.touched.homePhone
                                    ? form.errors.homePhone
                                    : null}
                                </Form.Control.Feedback>
                              )}
                          </>
                        )}
                      </FastField>
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} className="form-group">
                    <Form.Label column sm={3}>
                      Mobile Phone{" "}
                      <span className="form-label-required">*</span>
                    </Form.Label>
                    <Col sm={9}>
                      <FastField name="mobilePhone">
                        {({ field, form }) => (
                          <>
                            <Form.Control
                              {...field}
                              type="text"
                              disabled={isView}
                              style={{ maxWidth: 200 }}
                              isInvalid={
                                form.touched.mobilePhone &&
                                form.errors.mobilePhone
                              }
                              minLength={1}
                              maxLength={32}
                            />
                            {form.touched.mobilePhone &&
                              form.errors.mobilePhone && (
                                <Form.Control.Feedback type="invalid">
                                  {form.touched.mobilePhone
                                    ? form.errors.mobilePhone
                                    : null}
                                </Form.Control.Feedback>
                              )}
                          </>
                        )}
                      </FastField>
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} className="form-group">
                    <Form.Label column sm={3}>
                      Email <span className="form-label-required">*</span>
                    </Form.Label>
                    <Col sm={9}>
                      <FastField name="email">
                        {({ field, form }) => (
                          <>
                            <Form.Control
                              {...field}
                              type="email"
                              isInvalid={
                                form.touched.email && form.errors.email
                              }
                              minLength={1}
                              maxLength={256}
                              disabled={isView}
                              style={{ maxWidth: 300 }}
                            />
                            {form.touched.email && form.errors.email && (
                              <Form.Control.Feedback type="invalid">
                                {form.touched.email ? form.errors.email : null}
                              </Form.Control.Feedback>
                            )}
                          </>
                        )}
                      </FastField>
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} className="form-group">
                    <Form.Label column sm={3}>
                      Other Email
                    </Form.Label>
                    <Col sm={9}>
                      <FastField name="otherEmail">
                        {({ field, form }) => (
                          <>
                            <Form.Control
                              {...field}
                              type="email"
                              className={
                                form.touched.otherEmail &&
                                form.errors.otherEmail
                                  ? "is-invalid"
                                  : null
                              }
                              minLength={1}
                              maxLength={256}
                              disabled={isView}
                              style={{ maxWidth: 300 }}
                            />
                            {form.touched.otherEmail &&
                              form.errors.otherEmail && (
                                <Form.Control.Feedback type="invalid">
                                  {form.touched.otherEmail
                                    ? form.errors.otherEmail
                                    : null}
                                </Form.Control.Feedback>
                              )}
                          </>
                        )}
                      </FastField>
                    </Col>
                  </Form.Group>
                </div>
                <h3 className="card-heading">Current Address</h3>
                <div style={{ padding: "0 15px 15px 15px" }}>
                  <Form.Group as={Row} className="form-group">
                    <Form.Label column sm={3}>
                      Address
                    </Form.Label>
                    <Col sm={9}>
                      <FastField name="currentAddress">
                        {({ field }) => (
                          <Form.Control
                            {...field}
                            as="textarea"
                            rows={3}
                            minLength={1}
                            maxLength={512}
                            disabled={isView}
                            style={{ maxWidth: 416 }}
                          />
                        )}
                      </FastField>
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} className="form-group">
                    <Form.Label column sm={3}>
                      Country <span className="form-label-required">*</span>
                    </Form.Label>
                    <Col sm={9}>
                      <FastField name="currentCountry">
                        {({ field, form }) => (
                          <div style={{ width: 300 }}>
                            <SelectAsync
                              {...field}
                              isDisabled={isView}
                              url={`master/countries`}
                              fieldName="country_name"
                              onChange={(v) => {
                                setFieldValue("currentCountry", v)
                                setFieldValue("currentProvince", null)
                                setFieldValue("currentCity", null)
                                handleChangeCurrentCountry(v.value)
                              }}
                              placeholder="Please choose"
                              className={`react-select ${
                                form.touched.currentCountry &&
                                form.errors.currentCountry
                                  ? "is-invalid"
                                  : null
                              }`}
                            />
                            {form.touched.currentCountry &&
                              form.errors.currentCountry && (
                                <Form.Control.Feedback type="invalid">
                                  {form.touched.currentCountry
                                    ? form.errors.currentCountry
                                    : null}
                                </Form.Control.Feedback>
                              )}
                          </div>
                        )}
                      </FastField>
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} className="form-group">
                    <Form.Label column sm={3}>
                      State/Province
                    </Form.Label>
                    <Col sm={9}>
                      <Field name="currentProvince">
                        {({ field, form }) => (
                          <>
                            <div style={{ width: 200 }}>
                              <Select
                                {...field}
                                placeholder="Please choose"
                                options={selectCurrentProvince}
                                onChange={(v) => {
                                  setFieldValue("currentProvince", v)
                                  handleChangeCurrentProvince(v.value)
                                }}
                                isDisabled={isView}
                              />
                            </div>
                          </>
                        )}
                      </Field>
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} className="form-group">
                    <Form.Label column sm={3}>
                      City
                    </Form.Label>
                    <Col sm={9}>
                      <Field name="currentCity">
                        {({ field }) => (
                          <>
                            <div style={{ width: 200 }}>
                              <Select
                                {...field}
                                placeholder="Please choose"
                                options={selectCurrentCity}
                                onChange={(v) => {
                                  setFieldValue("currentCity", v)
                                }}
                                isDisabled={isView}
                              />
                            </div>
                          </>
                        )}
                      </Field>
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} className="form-group">
                    <Form.Label column sm={3}>
                      Zip Code
                    </Form.Label>
                    <Col sm={9}>
                      <FastField name="currentZipCode">
                        {({ field }) => (
                          <Form.Control
                            {...field}
                            type="text"
                            minLength={1}
                            maxLength={16}
                            style={{ maxWidth: 100 }}
                            disabled={isView}
                          />
                        )}
                      </FastField>
                    </Col>
                  </Form.Group>
                </div>
                <h3 className="card-heading">Permanent Address</h3>
                <div style={{ padding: "0 15px 15px 15px" }}>
                  <Form.Group as={Row} className="form-group">
                    <Col sm={9}>
                      <Form.Check
                        type="checkbox"
                        label="Same As Current Address"
                        name="sameAddress"
                        checked={values.sameAddress}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        disabled={isView}
                      />
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} className="form-group">
                    <Form.Label column sm={3}>
                      Address
                    </Form.Label>
                    <Col sm={9}>
                      <Form.Control
                        name="permanentAddress"
                        as="textarea"
                        rows={3}
                        minLength={1}
                        maxLength={512}
                        value={
                          values.sameAddress
                            ? values.currentAddress
                            : values.permanentAddress
                        }
                        onChange={handleChange}
                        onBlur={handleBlur}
                        disabled={values.sameAddress || isView}
                        style={{ maxWidth: 416 }}
                      />
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} className="form-group">
                    <Form.Label column sm={3}>
                      Country <span className="form-label-required">*</span>
                    </Form.Label>
                    <Col sm={9}>
                      {selectPermanentCountry.length !== 0 && (
                        <div style={{ width: 300 }}>
                          <SelectAsync
                            name="permanentCountry"
                            url={`master/countries`}
                            value={
                              values.sameAddress
                                ? values.currentCountry
                                : values.permanentCountry
                            }
                            placeholder="Please choose"
                            fieldName="country_name"
                            // options={selectCountry}
                            className={`react-select ${
                              !values.sameAddress &&
                              (touched.permanentCountry &&
                              errors.permanentCountry
                                ? "is-invalid"
                                : null)
                            }`}
                            onChange={(v) => {
                              setFieldValue("permanentCountry", v)
                              setFieldValue("permanentProvince", null)
                              setFieldValue("permanentCity", null)
                              handleChangePermanentCountry(v.value)
                            }}
                            onBlur={setFieldTouched}
                            isDisabled={values.sameAddress || isView}
                          />
                          {!values.sameAddress && (
                            <>
                              {touched.permanentCountry &&
                                errors.permanentCountry && (
                                  <Form.Control.Feedback type="invalid">
                                    {touched.permanentCountry
                                      ? errors.permanentCountry
                                      : null}
                                  </Form.Control.Feedback>
                                )}
                            </>
                          )}
                        </div>
                      )}
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} className="form-group">
                    <Form.Label column sm={3}>
                      State/ Province
                    </Form.Label>
                    <Col sm={9}>
                      <div style={{ width: 200 }}>
                        <Select
                          name="permanentProvince"
                          value={
                            values.sameAddress
                              ? values.currentProvince
                              : values.permanentProvince
                          }
                          placeholder="Please choose"
                          options={selectPermanentProvince}
                          onChange={(v) => {
                            setFieldValue("permanentProvince", v)
                            handleChangePermanentProvince(v.value)
                          }}
                          onBlur={setFieldTouched}
                          isDisabled={values.sameAddress || isView}
                        />
                      </div>
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} className="form-group">
                    <Form.Label column sm={3}>
                      City
                    </Form.Label>
                    <Col sm={9}>
                      <div style={{ width: 200 }}>
                        <Select
                          name="permanentCity"
                          value={
                            values.sameAddress
                              ? values.currentCity
                              : values.permanentCity
                          }
                          placeholder="Please choose"
                          options={selectPermanentCity}
                          onChange={(v) => {
                            setFieldValue("permanentCity", v)
                          }}
                          onBlur={setFieldTouched}
                          isDisabled={ values.sameAddress || isView}
                        />
                      </div>
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} className="form-group">
                    <Form.Label column sm={3}>
                      Zip Code
                    </Form.Label>
                    <Col sm={9}>
                      <Form.Control
                        name="permanentZipCode"
                        type="text"
                        minLength={1}
                        maxLength={16}
                        style={{ maxWidth: 100 }}
                        value={
                          values.sameAddress
                            ? values.currentZipCode
                            : values.permanentZipCode
                        }
                        onChange={handleChange}
                        onBlur={handleBlur}
                        disabled={values.sameAddress || isView}
                      />
                    </Col>
                  </Form.Group>
                </div>
                {
                  props.isMobile 
                  ? isView 
                  ? (<>
                      <Button
                        variant="secondary"
                        onClick={() => props.history.goBack()}
                      >
                        BACK
                      </Button>
                    </>) 
                  : (<div className="mb-5 ml-1 row justify-content-md-start justify-content-center">
                      <Button
                        variant="primary"
                        type="submit"
                        disabled={props.finishStep > 0 || props.employeeData?.id ? (!isValid || isSubmitting) : (!dirty || isSubmitting)}
                        style={{ marginRight: 15 }}
                      >
                        {props.employeeData?.id ? "SAVE" : "SAVE & NEXT"}
                      </Button>
                      <Button
                        variant="secondary"
                        onClick={() => props.history.goBack()}
                      >
                        CANCEL
                      </Button>
                    </div>)
                  : ""
                }
              </Card.Body>
            </Card>
            {
              !props.isMobile 
              ? isView 
              ? (<>
                  <Button
                    variant="secondary"
                    onClick={() => props.history.goBack()}
                    className="mt-3"
                  >
                    BACK
                  </Button>
                </>) 
              : (<div className="mb-5 ml-1 mt-3 row justify-content-md-start justify-content-center">
                  <Button
                    variant="primary"
                    type="submit"
                    disabled={props.finishStep > 0 || props.employeeData?.id ? (!isValid || isSubmitting) : (!dirty || isSubmitting)}
                    style={{ marginRight: 15 }}
                  >
                    {props.employeeData?.id ? "SAVE" : "SAVE & NEXT"}
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={() => props.history.goBack()}
                  >
                    CANCEL
                  </Button>
                </div>)
              : ""
            }
          </Form>
        )}
      </Formik>
    </>
  )
}

export default GeneralInformation
