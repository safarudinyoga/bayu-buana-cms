import React, { useEffect, useState } from "react"
import { Card, Form, Row, Col, Button, Image, CloseButton } from "react-bootstrap"
import { Formik, FastField, Field, ErrorMessage } from "formik"
import TextError from "components/formik/textError"
import FormikControl from "../../../components/formik/formikControl"
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
  //const [selectNamePrefix, setSelectNamePrefix] = useState([])
  const [photoProfile, setPhotoProfile] = useState([])
  const [photoData, setPhotoData] = useState()
  const maxNumber = 1
  const { innerWidth, innerHeight, outerHeight, outerWidth } = useWindowSize();
  const [loading, setLoading]= useState(true)
  const [defmonths, setMonths] = useState({ value: 1, label: "" })
  const [defyears, setYears] = useState({ value: 1921, label: "" }) 

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
    birth_date: [],
    gender: "db24d53c-7d36-4770-8598-dc36174750af",
    idCardNumber: "",

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

  // const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

  const phoneRegExp = /^\d+$/

  // Schema for yup
  const validationSchema = Yup.object().shape({
    // General Information
    title: Yup.object().required("Title is required."),
    firstName: Yup.string().required("Employee First Name is required."),
    middleName: Yup.string(),
    lastName: Yup.string().required("Employee Last Name is required."),
    birth_date: Yup.array().min(3, "Date of Birth is required."),
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
          let formId = props?.employeeData?.id
            if (formId === undefined) {
              return new Promise((resolve, reject) => {
                axios
                  .get(
                    `${env.API_URL}/master/employees?filters=["contact.email","like","${value}"]`,
                  )
                  .then((res) => {
                    resolve(
                      !res.data.items.find(
                        (e) =>
                          e.contact.email.toUpperCase() === value.toUpperCase(),
                      ),
                    )
                  })
                  .catch((res, error) => {
                    resolve(
                      res.data.items.find(
                        (e) =>
                          e.contact.email.toUpperCase() === value.toUpperCase(),
                      ),
                    )
                  })
              })
            } else {
              return new Promise((resolve, reject) => {
                axios
                  .get(
                    `${env.API_URL}/master/employees?filters=["contact.email","like","${value}"]`,
                  )
                  .then((res) => {
                    resolve(
                      !res.data.items.find(
                        (e) =>
                          e.contact.email.toUpperCase() === value.toUpperCase(),
                      ) || value === initialForm.email,
                    )
                  })
                  .catch((res, error) => {
                    resolve(
                      res.data.items.find(
                        (e) =>
                          e.contact.email.toUpperCase() === value.toUpperCase(),
                      ),
                    )
                  })
              })
            }
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

  const resetDate = (date, months=defmonths, years=defyears) => {
    const today = new Date()
    let currentYear = today.getFullYear()
    let currentMonth = today.getMonth() + 1
    let currentDate = today.getDate()

    if (years.value === currentYear) {
      if (months.value > currentMonth) {
        return true
      } else {
        if(date.value > currentDate) {
          return true
        } else {
          return false
        }
      }
    }

    if (months.value === 2 && years.value % 4 == 0) {
      return date.value > 29
    }
    if (months.value === 2 && years.value % 4 != 0) {
      return date.value > 28
    }
    if (
      months.value === 4 ||
      months.value === 6 ||
      months.value === 9 ||
      months.value === 11
    ) {
      return date.value > 30
    }
    return false
  }

  // Birthday
  const selectDay = (months=defmonths, years=defyears) => {
    const options = []
    const today = new Date()
    let currentYear = today.getFullYear()
    let currentMonth = today.getMonth() + 1
    let currentDate = today.getDate()
    if (years.value === currentYear && months.value === currentMonth) {
      for (let i = 1; i <= currentDate; i++) {
        options.push({
          label: i,
          value: i,
        })
      }
    } else {
      if (months.value === 2 && years.value % 4 == 0) {
        for (let i = 1; i <= 29; i++) {
          options.push({
            label: i,
            value: i,
          })
        }
      } else if (months.value === 2 && years.value % 4 != 0) {
        for (let i = 1; i <= 28; i++) {
          options.push({
            label: i,
            value: i,
          })
        }
      } else if (
        months.value === 4 ||
        months.value === 6 ||
        months.value === 9 ||
        months.value === 11
      ) {
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
  const selectMonth = (years=defyears) => {
    const options = []
    const today = new Date();
    let currentYear = today.getFullYear();
    let currentMonth = today.getMonth()+1;
    const month = Array.from({ length: years.value === currentYear ? currentMonth : 12 }, (e, i) => {
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
        `/master/state-provinces?size=-1&filters=[["country_id","=","${v}"],["AND"],["status","=",1]]&sort=state_province_name`,
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
        `/master/cities?size=-1&filters=[["country_id","=","${v}"],["AND"],["status","=",1]]&sort=city_name`,
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
        `/master/state-provinces?size=-1&filters=[["country_id","=","${v}"],["AND"],["status","=",1]]&sort=state_province_name`,
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
        `/master/cities?size=-1&filters=[["country_id","=","${v}"],["AND"],["status","=",1]]&sort=city_name`,
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
  const handleChangeProvince = async (type, province_id, country_id) => {
    try {
      let filters = `[["country_id","=","${country_id}"],["AND"],["status","=",1]]`

      if(province_id && province_id !== "00000000-0000-0000-0000-000000000000") {
        filters = `[["state_province_id","=","${province_id}"],["AND"],["country_id","=","${country_id}"],["AND"],["status","=",1]]`
      }
      let res = await api.get(
        `/master/cities?filters=${filters}&sort=city_name`,
      )
      const options = []
      if(res.data.items.length > 0){
        res.data.items.forEach((data) => {
          options.push({
            label: data.city_name,
            value: data.id,
          })
          if(type === "current") {
            setSelectCurrentCity(options)
          } else {
            setSelectPermanentCity(options)
          }
        })
      } else {
        if(type=== "current") {
          setSelectCurrentCity([])
        } else {
          setSelectPermanentCity([])
        }
      }
      
    } catch (e) {}
  }

  const getProvince = async (type, v) => {
    try {
      let res = await api.get(
        `/master/state-provinces?size=-1&filters=[["country_id","=","${v}"],["AND"],["status","=",1]]&sort=state_province_name`,
      )
      const options = []
      if(res.data.items.length > 0){
        res.data.items.forEach((data) => {
          options.push({
            label: data.state_province_name,
            value: data.id,
          })
          if(type === "current") {
            setSelectCurrentProvince(options)
          } else {
            setSelectPermanentProvince(options)
          }
        })
      } else {
        if(type === "current") {
          setSelectCurrentProvince([])
        } else {
          setSelectPermanentProvince([])
        }
      }
    }catch(e){
      console.log(e)
    }
  }

  // Upload profile
  const onChangePhotoProfile = (imageList) => {
    if(imageList.length > 0) {
      var files = imageList[0].file;
      var filesize = ((files.size/1024)/1024).toFixed(4);
        if(filesize > 4){
          openSnackbar("Logo size is more than 4MB.")
          return;
        }
    }
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

  // useEffect(async() => {
  //   try {
  //     let res = await api.get("/master/name-prefixes")
  //     const options = []
  //     res.data.items.forEach((data) => {
  //       options.push({
  //         label: data.name_prefix_name,
  //         value: data.id,
  //       })
  //       setSelectNamePrefix(options)
  //     })
  //   } catch(e) {

  //   }
  // }, [])

  useEffect(async () => {
    try {
      if(props.employeeData) {
        let data = props.formData && props.formData.given_name ? props.formData : props.employeeData
        if(data) {
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
            birth_date: data.birth_date ? [
              {
                value: parseInt(data.birth_date.split("-")[2]),
                label: parseInt(data.birth_date.split("-")[2]),
              },
              {
                value: parseInt(data.birth_date.split("-")[1]),
                  label: new Date(null, parseInt(data.birth_date.split("-")[1]), null).toLocaleDateString("en", {
                  month: "long",
                })
              },
              {
                value: parseInt(data.birth_date.split("-")[0]),
                label: parseInt(data.birth_date.split("-")[0]),  
              },
            ] : [],
            
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
            currentProvince: (!data.address?.state_province_id || data.address?.state_province_id === "00000000-0000-0000-0000-000000000000")
            ? isView ? {
              value: "",
              label: ""
            }
            : "" 
            : {
              value: data.address.state_province_id,
              label: data.address.state_province.state_province_name
            },

            currentCity: (_.isEmpty(data.address?.city) || data.address?.city_id ===  "00000000-0000-0000-0000-000000000000")
            ? isView ? {
              value: "",
              label: ""
            }
            : "" 
            : {
              value: data.address.city.id,
              label: data.address.city.city_name
            },

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

            permanentProvince: (_.isEmpty(data.permanent_address?.state_province) || data.permanent_address?.state_province_id ===  "00000000-0000-0000-0000-000000000000")
            ? isView ? {
              value: "",
              label: ""
            } 
            : "" 
            :{
              value: data.permanent_address.state_province_id,
              label: data.permanent_address.state_province.state_province_name
            },
            permanentCity: (_.isEmpty(data.permanent_address?.city) || data.permanent_address?.city_id ===  "00000000-0000-0000-0000-000000000000")
            ? isView ? {
              value: "",
              label: ""
            } : "" 
            : {
              value: data.permanent_address.city.id,
              label: data.permanent_address.city.city_name
            },
            permanentZipCode: _.isEmpty(data.permanent_address) ? "" : data.permanent_address.postal_code ? data.permanent_address.postal_code : "",
          });

          setPhotoProfile(
            _.isEmpty(data.photo_profile) 
            ? _.isEmpty(data.employee_asset.multimedia_description) 
            ? [] 
            : [{
                data_url: data.employee_asset.multimedia_description.url,
                id: data.employee_asset.multimedia_description.id,
              }]
            : data.photo_profile
          )

          getProvince("current", data?.address?.country_id)
          getProvince("permanent", data?.permanent_address?.country_id)

          if(data.permanent_address.state_province) {
            handleChangeProvince("permanent", data.permanent_address.state_province.id, data.permanent_address.country_id)
          } else { 
            handleChangePermanentCountry(data.permanent_address.country_id)
          }

          if(data.address.state_province) {
            handleChangeProvince("current", data.address.state_province.id, data.address.country_id)
          } else { 
            handleChangeCurrentCountry(data.address.country_id)
          }
        }
      }
    } catch(e) {
      console.log(e)
    }
  }, [props.employeeData, props.formData])

  const dateFormat = (d,m,y) => {
    let day = d < 10 ? ("0"+d) : d;
    let month = m < 10 ? ("0"+m) : m;
    let year = y;

    return year+"-"+month+"-"+day
  }

  return (
    <>
      <Formik
        initialValues={initialForm}
        validationSchema={validationSchema}
        validator={() => ({})}
        onSubmit={async (values, { setSubmitting, resetForm }) => {

          let formatted = {
            address: {
              address_line: values.currentAddress ? values.currentAddress : "",
              country_id: values.currentCountry ? values.currentCountry.value : "",
              state_province_id: values.currentProvince ? values.currentProvince.value : "00000000-0000-0000-0000-000000000000",
              city_id: values.currentCity ? values.currentCity.value : "00000000-0000-0000-0000-000000000000",
              city: values.currentCity,
              state_province: values.currentProvince,
              country: values.currentCountry,
              postal_code: values.currentZipCode ? values.currentZipCode : ""
            },
            contact: {
              email: values.email,
              mobile_phone_number: values.mobilePhone,
              other_email: values.otherEmail,
              phone_number: values.homePhone
            },
            ktp: values.idCardNumber,
            given_name: values.firstName,
            middle_name: values.middleName,
            surname: values.lastName,
            birth_date: dateFormat(values.birth_date[0].value, values.birth_date[1].value, values.birth_date[2].value),
            name_prefix_id: values.title.value,
            gender_id: values.gender,
            permanent_address: values.sameAddress ? {
              address_line: values.currentAddress ? values.currentAddress : "",
              country_id: values.currentCountry ? values.currentCountry.value : "",
              state_province_id: values.currentProvince ? values.currentProvince.value : "00000000-0000-0000-0000-000000000000",
              city_id: values.currentCity ? values.currentCity.value : "00000000-0000-0000-0000-000000000000",
              postal_code: values.currentZipCode ? values.currentZipCode : "",
              city: values.currentCity,
              state_province: values.currentProvince,
              country: values.currentCountry,
            } : {
              address_line: values.permanentAddress ? values.permanentAddress : "",
              country_id: values.permanentCountry ? values.permanentCountry.value : "",
              state_province_id: values.permanentProvince ? values.permanentProvince.value : "00000000-0000-0000-0000-000000000000",
              city_id: values.permanentCity ? values.permanentCity.value : "00000000-0000-0000-0000-000000000000",
              postal_code: values.permanentZipCode ? values.permanentZipCode : "" ,
              city: values.permanentCity,
              state_province: values.permanentProvince,
              country: values.permanentCountry,
            },
            photo_profile: photoProfile
          }

          await props.onSubmit(formatted)
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
                <div style={props.isMobile ? {padding: "0"} : { padding: "0 15px 15px 15px" }}>
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
                    <Col sm={9} md={12} lg={9}>
                    <FormikControl
                        control="selectAsync"
                        required={isView ? "" : "label-required"}
                        label="Title"
                        name="title"
                        placeholder={values.name_prefixName || "Mr."}
                        url={`master/name-prefixes`}
                        fieldName={"name_prefix_name"}
                        onChange={(v) => {
                          setFieldValue("title", v)
                        }}
                        style={{ maxWidth: 120 }}
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
                      {/* <Form.Group as={Row} className="form-group">
                        <Form.Label column md={3} lg={4}>
                          Title <span className="form-label-required">*</span>
                        </Form.Label>
                        <Col md={9} lg={8}>
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
                                    components={
                                      isView
                                        ? {
                                            DropdownIndicator: () => null,
                                            IndicatorSeparator: () => null,
                                          }
                                        : null
                                    }
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
                      </Form.Group> */}
                      <Form.Group as={Row} className="form-group">
                        <Form.Label column md={3} lg={4}>
                          First Name{" "}
                          <span className="form-label-required">*</span>
                        </Form.Label>
                        <Col md={9} lg={8}>
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
                        <Form.Label column md={3} lg={4}>
                          Middle Name
                        </Form.Label>
                        <Col md={9} lg={8}>
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
                        <Form.Label column md={3} lg={4}>
                          Last Name{" "}
                          <span className="form-label-required">*</span>
                        </Form.Label>
                        <Col md={9} lg={8}>
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
                        <Form.Label column md={3} lg={4}>
                          Date Of Birth{" "}
                          <span className="form-label-required">*</span>
                        </Form.Label>
                        <Col  md={9} lg={8}>
                          <div style={{ maxWidth: 300, display: "flex" }}>
                            <div style={{ marginRight: 12, maxWidth: 60, flex: 1 }}>
                              <Select
                                options={selectDay(values.birth_date[1], values.birth_date[2])}
                                value={values.birth_date[0]}
                                isDisabled={isView}
                                placeholder="Day"
                                className={`react-select ${
                                  touched.title && Boolean(errors.title)
                                    ? "is-invalid"
                                    : ""
                                }`}
                                components={
                                  isView
                                    ? {
                                        DropdownIndicator: () => null,
                                        IndicatorSeparator: () => null,
                                      }
                                    : null
                                }                                
                                onChange={(v) => {
                                  setFieldValue("birth_date[0]", v)
                                }}
                              />
                            </div>
                            <div style={{ marginRight: 12, maxWidth: 140, flex: 1 }}>
                              <Select
                                options={selectMonth(values.birth_date[2])}
                                value={values.birth_date[1]}
                                placeholder="Month"
                                isDisabled={isView}
                                disabled={true}
                                className={`react-select ${
                                  touched.title && Boolean(errors.title)
                                    ? "is-invalid"
                                    : ""
                                }`}
                                components={
                                  isView
                                    ? {
                                        DropdownIndicator: () => null,
                                        IndicatorSeparator: () => null,
                                      }
                                    : null
                                }                                
                                onChange={(v) => {
                                  setFieldValue("birth_date[1]", v)
                                  if (resetDate(values.birth_date[0], v, values.birth_date[2])) {
                                    setFieldValue("birth_date[0]", {value: 1, label: "1"})
                                  }
                                }}
                              />
                            </div>
                            <div style={{  maxWidth: 80, flex: 1 }}>
                              <Select
                                options={selectYear()}
                                value={values.birth_date[2]}
                                placeholder="Year"
                                isDisabled={isView}
                                className={`react-select ${
                                  touched.title && Boolean(errors.title)
                                    ? "is-invalid"
                                    : ""
                                }`}
                                components={
                                  isView
                                    ? {
                                        DropdownIndicator: () => null,
                                        IndicatorSeparator: () => null,
                                      }
                                    : null
                                }                               
                                onChange={(v) => {
                                  setFieldValue("birth_date[2]", v)
                                  
                                  if (resetDate(values.birth_date[0], values.birth_date[1], v)) {
                                    setFieldValue("birth_date[0]", {value: 1, label: "1"})
                                    setFieldValue("birth_date[1]", {value: 1, label: "January"})
                                  }
                                }}
                              />
                            </div>
                          </div>
                          <ErrorMessage
                            component={TextError}
                            name="birth_date"
                          />
                          {touched.title && Boolean(errors.title) && (
                            <div className="invalid-feedback">
                              {touched.title ? errors.title : ""}
                            </div>
                          )}
                        </Col>
                      </Form.Group>
                      <Form.Group as={Row} className="form-group">
                        <Form.Label column md={3} lg={4}>
                          Gender <span className="form-label-required">*</span>
                        </Form.Label>
                        <Col md={9} lg={8}>
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
                        <Form.Label column md={3} lg={4}>
                          ID Card Number (KTP)
                        </Form.Label>
                        <Col md={9} lg={8}>
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
                        <Col sm={3} lg={3}  style={{ height: 170 }}>
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
                <div style={props.isMobile ? {padding: "0 15px 15px 0"} : { padding: "0 15px 15px 15px" }}>
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
                <div style={props.isMobile ? {padding: "0 15px 15px 0"} : { padding: "0 15px 15px 15px" }}>
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
                          <div style={{ maxWidth: 300 }}>
                            <SelectAsync
                              {...field}
                              isClearable
                              isDisabled={isView}
                              url={`master/countries`}
                              fieldName="country_name"
                              onChange={(v) => {                               
                                setFieldValue("currentProvince", null)
                                setFieldValue("currentCity", null)
                                setFieldValue("currentCountry", v)
                                if(v) handleChangeCurrentCountry(v.value)
                              }}
                              placeholder="Please choose"
                              className={`react-select ${
                                form.touched.currentCountry &&
                                form.errors.currentCountry
                                  ? "is-invalid"
                                  : null
                              }`}
                              components={
                                isView
                                  ? {
                                      DropdownIndicator: () => null,
                                      IndicatorSeparator: () => null,
                                    }
                                  : null
                              }                              
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
                      State/ Province
                    </Form.Label>
                    <Col sm={9}>
                      <Field name="currentProvince">
                        {({ field, form }) => (
                          <>
                            <div style={{ maxWidth: 200 }}>
                              <Select
                                {...field}
                                isClearable
                                placeholder="Please choose"
                                options={selectCurrentProvince}
                                onChange={(v) => {
                                  setFieldValue("currentProvince", v)
                                  if(v) {
                                    setFieldValue("currentCity", "")
                                  }
                                  handleChangeProvince("current", v?.value || null, values.currentCountry.value)
                                }}
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
                                isClearable
                                placeholder="Please choose"
                                options={selectCurrentCity}
                                onChange={(v) => {
                                  setFieldValue("currentCity", v)
                                }}
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
                <div style={props.isMobile ? {padding: "0 0 30px 0"} : { padding: "0 15px 30px 15px" }}>
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
                        <div style={{ maxWidth: 300 }}>
                          <SelectAsync
                            isClearable
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
                              setFieldValue("permanentProvince", null)
                              setFieldValue("permanentCity", null)
                              setFieldValue("permanentCountry", v)
                              if(v) handleChangePermanentCountry(v.value)
                            }}
                            onBlur={setFieldTouched}
                            components={
                              isView
                                ? {
                                    DropdownIndicator: () => null,
                                    IndicatorSeparator: () => null,
                                  }
                                : null
                            }
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
                      <div style={{ maxWidth: 200 }}>
                        <Select
                          isClearable
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

                            if(v) {
                              setFieldValue("permanentCity", "")
                            }
                            handleChangeProvince("permanent", v?.value || null, values.permanentCountry.value)
                          }}
                          onBlur={setFieldTouched}
                          components={
                            isView
                              ? {
                                  DropdownIndicator: () => null,
                                  IndicatorSeparator: () => null,
                                }
                              : null
                          }
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
                      <div style={{ maxWidth: 200 }}>
                        <Select
                          name="permanentCity"
                          isClearable
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
                          components={
                            isView
                              ? {
                                  DropdownIndicator: () => null,
                                  IndicatorSeparator: () => null,
                                }
                              : null
                          }
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
                  ? (<div className="mb-2 mt-1 row justify-content-md-start justify-content-center">
                      <Button
                        variant="secondary"
                        onClick={() => props.history.goBack()}
                      >
                        BACK
                      </Button>
                    </div>) 
                  : (<div className="ml-3 row justify-content-md-start justify-content-center">
                      <Button
                        variant="primary"
                        type="submit"
                        disabled={props.finishStep > 0 || props.employeeData?.id ? (!isValid || isSubmitting) : (!dirty || isSubmitting)}
                        style={{ marginRight: 15, marginBottom: 40, marginTop: 95 }}
                      >
                        {props.employeeData?.id ? "SAVE" : "SAVE & NEXT"}
                      </Button>
                      <Button
                        variant="secondary"
                        onClick={() => props.history.goBack()}
                        style={{ marginRight: 15, marginBottom: 40, marginTop: 95 }}
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
              : (<div className="ml-1 mt-3 row justify-content-md-start justify-content-center">
                  <Button                    
                    variant="primary"
                    type="submit"
                    disabled={props.finishStep > 0 || props.employeeData?.id ? (!isValid || isSubmitting) : (!dirty || isSubmitting)}
                    style={{ marginRight: 15, marginBottom: 135 }}
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
