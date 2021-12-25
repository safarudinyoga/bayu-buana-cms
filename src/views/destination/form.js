import FormBuilder from "components/form/builder"
import FormHorizontal from "components/form/horizontal"
import FormInputControl from "components/form/input-control"
import FormInputSelectAjax from "components/form/input-select-ajax"
import Api from "config/api"
import useQuery from "lib/query"
import React, {useEffect, useState} from "react"
import {useDispatch} from "react-redux"
import {withRouter} from "react-router"
import {setAlert, setUIParams} from "redux/ui-store"
import $ from "jquery"
import env from "../../config/environment"

const endpoint = "/master/destinations"
const backUrl = "/master/destinations"

function DestinationForm(props) {
  let api = new Api()
  let dispatch = useDispatch()
  let formId = props.match.params.id

  const isView = useQuery().get("action") === "view"
  const [formBuilder, setFormBuilder] = useState(null)
  const [loading, setLoading] = useState(true)
  const [translations, setTranslations] = useState([])
  const [countryData, setCountryData] = useState([])
  const [cityData, setCityData] = useState([])
  const [id, setId] = useState(null)
  const [form, setForm] = useState({
    id: "",
    destination_name: "",
    country_id: "",
    destination_city_id: "",
    description: "",
    destination_code: "",
    destination_asset_desktop: {
      multimedia_description_id: null,
      multimedia_description: {
        url: "",
      },
    },
    destination_asset_mobile: {
      multimedia_description_id: null,
      multimedia_description: {
        url: "",
      },
    },
    destination_asset_tablet: {
      multimedia_description_id: null,
      multimedia_description: {
        url: "",
      },
    },
  })
  const translationFields = [
    {
      label: "Destination Name",
      name: "destination_name",
      type: "text",
    },
    {
      label: "Description",
      name: "description",
      type: "textarea",
      maxLength: 4000
    },
  ]

  const [validationRules, setValidationRules] = useState({
    destination_name: {
      required: true,
      minlength: 1,
      maxlength: 256,
      checkName: true,
    },
    country_id: {
      required: true,
    },
    destination_city_id: {
      required: true,
    },
    description: {
      required: false,
      minlength: 1,
      maxlength: 4000,
    },
    destination_code: {
      required: true,
      minlength: 1,
      maxlength: 36,
      checkCode: true,
    },
    destination_asset_desktop: {
      required: true,
    },
    destination_asset_mobile: {
      required: true,
    },
    destination_asset_tablet: {
      required: true,
    },
  })

  const validationMessages = {
    destination_name: {
      required: "Destination Name is required",
    },
    destination_code: {
      required: "Destination Code is required",
    },
    country_id: {
      required: "Country is required",
    },
   destination_city_id: {
      required: "City is required",
    },
    destination_asset_desktop: {
      required: "Banner (Desktop) Image is required"
    },
    destination_asset_mobile: {
      required: "Banner (Mobile) Image is required"
    },
    destination_asset_tablet: {
      required: "Banner (Tablet) Image is required"
    },
  }

  useEffect(async () => {
    let api = new Api()
    let formId = props.match.params.id

    let docTitle = "Edit Destination"
    if (!formId) {
      docTitle = "Create Destination"
    } else if (isView) {
      docTitle = "View Destination"
    }

    dispatch(
      setUIParams({
        title: isView ? "Destination Details" : docTitle,
        breadcrumbs: [
          {
            text: "Master Data Management",
          },
          {
            link: backUrl,
            text: "Destinations",
          },
          {
            text: docTitle,
          },
        ],
      }),
    )
    if (formId) {
      try {
        let res = await api.get(endpoint + "/" + formId)
        setForm(res.data)
        if (res.data.destination_city) {
          setCityData([{...res.data.destination_city, text: res.data.destination_city.city_name}])
        }

        if (res.data.country) {
          setCountryData([{...res.data.country, text: res.data.country.country_name}])
        }

        if (res.data) {
          let currentName = res.data.destination_name
          let currentCode = res.data.destination_code
          let currentDesktopImage = res.data.destination_asset_desktop?.multimedia_description_id
          let currentMobileImage = res.data.destination_asset_mobile?.multimedia_description_id
          let currentTabletImage = res.data.destination_asset_tablet?.multimedia_description_id

          setValidationRules({
            ...validationRules,
            destination_asset_desktop: {
              required: !currentDesktopImage
            },
            destination_asset_mobile: {
              required: !currentMobileImage
            },
            destination_asset_tablet: {
              required: !currentTabletImage
            },
          })
          $.validator.addMethod(
            "checkName",
            function (value, element) {
              var req = false
              $.ajax({
                type: "GET",
                async: false,
                url: `${env.API_URL}/master/destinations?filters=["destination_name","=","${element.value}"]`,
                success: function (res) {
                  if (res.items.length !== 0) {
                    if(currentName === element.value){
                      req = true
                    } else {
                      req = false
                    }
                  } else {
                    req = true
                  }
                },
              })
    
              return req
            },
            "Destination Name already exists",
          )
          $.validator.addMethod(
            "checkCode",
            function (value, element) {
              var req = false
              $.ajax({
                type: "GET",
                async: false,
                url: `${env.API_URL}/master/destinations?filters=["destination_code","=","${element.value}"]`,
                success: function (res) {
                  if (res.items.length !== 0) {
                    if(currentCode === element.value){
                      req = true
                    } else {
                      req = false
                    }
                  } else {
                    req = true
                  }
                },
              })
    
              return req
            },
            "Code already exists",
          )
        }
      } catch (e) { }

      try {
        let res = await api.get(endpoint + "/" + formId + "/translations", {
          size: 50,
        })
        setTranslations(res.data.items)
      } catch (e) { }
      setLoading(false)
    } else {
      setValidationRules({
        ...validationRules,
        destination_asset_desktop: {
          required: true
        },
        destination_asset_mobile: {
          required: true
        },
        destination_asset_tablet: {
          required: true
        },
      })
      $.validator.addMethod(
        "checkName",
        function (value, element) {
          var req = false
          $.ajax({
            type: "GET",
            async: false,
            url: `${env.API_URL}/master/destinations?filters=["destination_name","=","${element.value}"]`,
            success: function (res) {
              if (res.items.length !== 0) {
                req = false
              } else {
                req = true
              }
            },
          })

          return req
        },
        "Destination Name already exists",
      )
      $.validator.addMethod(
        "checkCode",
        function (value, element) {
          var req = false
          $.ajax({
            type: "GET",
            async: false,
            url: `${env.API_URL}/master/destinations?filters=["destination_code","=","${element.value}"]`,
            success: function (res) {
              if (res.items.length !== 0) {
                req = false
              } else {
                req = true
              }
            },
          })

          return req
        },
        "Code already exists",
      )
    }
  }, [])

  useEffect(() => {
    if (!props.match.params.id) {
      setLoading(false)
    }
    setId(props.match.params.id)
  }, [props.match.params.id])

  const onSave = async () => {
    let translated = formBuilder.getTranslations()

    setLoading(true)
    let api = new Api()
    try {
      if (!form.country_id) {
        form.country_id = null
      }
      if (!form.destination_city_id) {
        form.destination_city_id = null
      }
      if (!form.description) {
        form.description = null
      }

      if (!form.destination_asset_desktop) {
        form.destination_asset_desktop = null
      } else {
        if (!form.destination_asset_desktop.multimedia_description_id) {
          form.destination_asset_desktop = null
        }
      }

      if (!form.destination_asset_mobile) {
        form.destination_asset_mobile = null
      } else {
        if (!form.destination_asset_mobile.multimedia_description_id) {
          form.destination_asset_mobile = null
        }
      }

      if (!form.destination_asset_mobile) {
        form.destination_asset_mobile = null
      } else {
        if (!form.destination_asset_mobile.multimedia_description_id) {
          form.destination_asset_mobile = null
        }
      }

      let res = await api.putOrPost(endpoint, id, form)
      setId(res.data.id)
      for (let i in translated) {
        let tl = translated[i]
        let path = endpoint + "/" + res.data.id + "/translations"
        await api.putOrPost(path, tl.id, tl)
      }
    } catch (e) {
      dispatch(
        setAlert({
          message: `Failed to ${formId ? "update" : "save"} this record.`,
        }),
      )
    } finally {
      setLoading(false)
      props.history.push(backUrl)
      dispatch(
        setAlert({
          message: `Record ${form.destination_code} - ${form.destination_name} has been successfully ${formId ? "updated" : "saved"}..`,
        }),
      )
    }
  }

  const doUploadMedia = async (e, media_type = "desktop") => {
    try {
      let media_code = ["desktop", "tablet", "mobile"].indexOf(media_type) + 1
      let payload = new FormData()
      payload.append("files", e.target.files[0])
      media_type !== "desktop" && payload.append("dimension_category_code", media_code)

      let res = await api.post("/multimedia/files", payload)
      if (res.data) {
        setForm({
          ...form,
          ["destination_asset_" + media_type]: {
            multimedia_description_id: res.data.id,
            multimedia_description: res.data,
          },
        })
      }
    } catch (e) { }
  }

  return (
    <FormBuilder
      onBuild={(el) => setFormBuilder(el)}
      isView={isView || loading}
      onSave={onSave}
      back={backUrl}
      translations={translations}
      translationFields={translationFields}
      alertMessage={"Incomplete data"}
      isValid={false}
      rules={validationRules}
      validationMessages={validationMessages}
      showMedia={true}
      uploadMedia={doUploadMedia}
      mediaData={form}
      moduleName={"destination"}
    >
      <FormHorizontal>
        <FormInputControl
          label="Destination Name"
          labelRequired="label-required"
          value={form.destination_name}
          name="destination_name"
          onChange={(e) => setForm({...form, destination_name: e.target.value})}
          disabled={isView || loading}
          type="text"
          minLength="1"
          maxLength="256"
        />
        {
          !loading &&
        <FormInputSelectAjax
          label="Country"
          value={form.country_id}
          labelRequired="label-required"
          name="country_id"
          endpoint="/master/countries"
          column="country_name"
          filter={`["status", "=", 1]`}
          data={countryData}
          onChange={(e) => {
            setForm({...form, country_id: e.target.value || null})
            $('#attr_city').empty();
          }}
          disabled={isView || loading}
          type="select"
          placeholder="Country"
        />
        }
        {
          !loading &&
        <FormInputSelectAjax
          label="City"
          id="attr_city"
          labelRequired="label-required"
          value={form.destination_city_id}
          name="destination_city_id"
          endpoint="/master/cities"
          filter={`[["country.id", "=", "${form.country_id}"],["AND"],["status", "=", 1]]`}
          column="city_name"
          data={cityData}
          onChange={(e) =>
            setForm({...form, destination_city_id: e.target.value || null})
          }
          disabled={isView || loading}
          type="select"
          placeholder="City"
        />
        }

        <FormInputControl
          value={form.description}
          name="description"
          onChange={(e) => setForm({...form, description: e.target.value})}
          label="Description"
          disabled={isView || loading}
          type="textarea"
          minLength="1"
          maxLength="4000"
        />
      </FormHorizontal>

      <FormHorizontal>
        <FormInputControl
          value={form.destination_code}
          name="destination_code"
          onChange={(e) => setForm({...form, destination_code: e.target.value})}
          cl={{md:"12"}}
          cr="12"
          disabled={isView || loading}
          type="text"
          label="Destination Code"
          labelRequired="label-required"
          minLength="1"
          maxLength="36"
          hint="Destination code maximum 36 characters"
        />

      </FormHorizontal>
    </FormBuilder>
  )
}

export default withRouter(DestinationForm)
