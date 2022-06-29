import {withRouter} from "react-router"
import React, {useEffect, useState} from "react"
import Api from "config/api"
import FormHorizontal from "components/form/horizontal"
import FormInputControl from "components/form/input-control"
import FormBuilder from "components/form/builder"
import useQuery from "lib/query"
import {useDispatch} from "react-redux"
import {setAlert, setUIParams} from "redux/ui-store"
import $ from "jquery"
import env from "../../config/environment"


const endpoint = "/master/corporate-rating-type-levels"
const backUrl = "/master/corporate-rating"

function CorporateRatingForm(props) {
  let api = new Api()
  let dispatch = useDispatch()
  let formId = props.match.params.id

  const isView = useQuery().get("action") === "view"
  const [formBuilder, setFormBuilder] = useState(null)
  const [loading, setLoading] = useState(true)
  const [translations, setTranslations] = useState([])
  const [RatingTranslations, setRatingTranslations] = useState([])
  const [id, setId] = useState(null)
  const [corporateRatingId, setCorporateRatingId] = useState(null)
  const [form, setForm] = useState({
    corporate_rating_type_level_code: "",
    corporate_rating_type_level_name: "",
    rating: "",
    corporate_rating_type_id: ""
  })
  const translationFields = [
    {
      label: "Rating Name",
      name: "corporate_rating_type_level_name",
      type: "text",
      unique: true
    },   
  ]

  const validationRules = {
    corporate_rating_type_level_code: {
      required: true,
      min: 1,
      max: 32767,
      checkCode: true,
    },
    corporate_rating_type_level_name: {
      required: true,
      minlength: 1,
      maxlength: 256,
      checkName: true,
    },
    rating: {
      required: false,
      min: 1,
      max: 9999,
      checkRating: true,
    },
  }

  const validationMessages = {
    corporate_rating_type_level_name: {
      required: "Rating Name is required",
    },
    corporate_rating_type_level_code: {
      required: "Rating Code is required",
    },
  } 

  useEffect(async() => {
    try {
      let {data} = await api.get("/master/agent-languages", { size: -1, sort: "sort,language_name" })
      let valRules = {}
      for (let lang of data.items) {
        valRules["corporate_rating_type_level_name_"+lang.language_code] = { checkLangName: true }
      }
    } catch (e) {

    }
  }, [])

  const fetchTranslation = async () => {
    let translationData = []
    let api = new Api()
    let res  = await api.get(endpoint)
    // console.log(res, "data endpoint")
    // res.data.items.map(async(value, key) => {
    //   console.log(value)
    //   let dataTranslation = await api.get(endpoint + "/" + value.id + "/translations")
    //   translationData.push(dataTranslation.data.items)
    //   translationData = [...translationData, ...dataTranslation.data.items]
    //   console.log(translationData, "hahaha")
    //   setRatingTranslations([...translationData, ...dataTranslation.data.items])
    //   return translationData
    // })
    
  // console.log(RatingTranslations, "xixixi")
    for(let i = 0; i < res.data.items.length; i++) {
      let corporateRatingId = res.data.items[i].id  
      // console.log(corporateRatingId)
      let dataTranslation = await api.get(endpoint + "/" + corporateRatingId + "/translations")
      translationData = [...translationData, ...dataTranslation.data.items]
    }
    setRatingTranslations(translationData)
  }

  // console.log(RatingTranslations)
  useEffect(async () => {
    fetchTranslation()
    
  })


  useEffect(async () => {
    let api = new Api()
    let formId = props.match.params.id

    let docTitle = "Edit Corporate Rating"
    if (!formId) {
      docTitle = "Create Corporate Rating"
    } else if (isView) {
      docTitle = "Corporate Rating Details"
    }

    dispatch(
      setUIParams({
        title: isView ? "Corporate Rating Details" : docTitle,
        breadcrumbs: [
          {
            text: "Setup and Configurations",
          },
          {
            link: backUrl,
            text: "Corporate Rating",
          },
          {
            text: docTitle,
          },
        ],
      }),
    )
    getCorporateRatingType(api);
    if (formId) {
      try {
        let res = await api.get(endpoint + "/" + formId)
        setForm(res.data)

        if (res.data) {
          let currentCode = res.data.corporate_rating_type_level_code
          let currentName = res.data.corporate_rating_type_level_name
          let rating = res.data.rating

          $.validator.addMethod(
            "checkLangName",
            function (value, element) {
              //ambil array yang sudah diset sebelumnya
              console.log(value)
            },
            "Rating Name already exists",
          )
          $.validator.addMethod(
            "checkName",
            function (value, element) {
              var req = false
              let filters = JSON.stringify([["corporate_rating_type.corporate_rating_type_code","6"],["AND"],["corporate_rating_type_level_name","like",element.value]])
              $.ajax({
                type: "GET",
                async: false,
                url: `${env.API_URL}/master/corporate-rating-type-levels?filters=${encodeURIComponent(filters)}`,
                success: function (res) {
                  if (res.items.length !== 0) {
                    if(currentName.toUpperCase() === element.value.toUpperCase()){
                      req = true
                    } else {
                      let duplicateVal = res.items.find( e => e.corporate_rating_type_level_name.toUpperCase() === element.value.toUpperCase())
                      req = !duplicateVal
                    }
                  } else {
                    req = true
                  }
                },
              })
    
              return req
            },
            "Rating Name already exists",
          )
          $.validator.addMethod(
            "checkCode",
            function (value, element) {
              var req = false
              $.ajax({
                type: "GET",
                async: false,
                url: `${env.API_URL}/master/corporate-rating-type-levels?filters=[["corporate_rating_type.corporate_rating_type_code","6"],["AND"],["corporate_rating_type_level_code","=","${element.value}"]]`,
                success: function (res) {
                  if (res.items.length !== 0) {
                    if(currentCode == element.value){
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
            "Rating Code already exists",
          )

          $.validator.addMethod(
            "checkRating",
            function (value, element) {
              var req = false
              $.ajax({
                type: "GET",
                async: false,
                url: `${env.API_URL}/master/corporate-rating-type-levels?filters=[["corporate_rating_type.corporate_rating_type_code","6"],["AND"],["rating","=","${element.value}"]]`,
                success: function (res) {
                  if (res.items.length !== 0) {
                    if(rating == element.value){
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
            "Rating already exists",
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
      // $.validator.addMethod(
      //   "checkLangName",
      //   function (value, element) {
      //     let req = false
      //     let lang_code = element.name.slice(12)
      //     let filters = JSON.stringify(["corporate_rating_type_level_name","=",element.value])
      //     // let filters = JSON.stringify([["language_code", "=", lang_code], ["AND"], ["office_name","=",element.value]])
      //     $.ajax({
      //       type: "GET",
      //       async: false,
      //       url: `${env.API_URL}/master/corporate-rating-type-levels?filters=${encodeURIComponent(filters)}`,
      //       success: function (res) {
      //         if (res.items.length !== 0) {
      //           if (currentName === element.value) {
      //             req = true
      //           } else {
      //             req = false
      //           }
      //         } else {
      //           req = true
      //         }
      //       },
      //     })

      //     return req
      //   },
      //   "Rating Name already exists",
      // )
      $.validator.addMethod(
        "checkLangName",
        function (value, element) {
          //ambil array yang sudah diset sebelumnya
          console.log(value)
        },
        "Rating Name already exists",
      )
      $.validator.addMethod(
        "checkName",
        function (value, element) {
          var req = false
          let filters = JSON.stringify([["corporate_rating_type.corporate_rating_type_code","6"],["AND"],["corporate_rating_type_level_name","like",element.value]])
          $.ajax({
            type: "GET",
            async: false,
            url: `${env.API_URL}/master/corporate-rating-type-levels?filters=${encodeURIComponent(filters)}`,
            success: function (res) {
              if (res.items.length !== 0) {
                let duplicateVal = res.items.find( e => e.corporate_rating_type_level_name.toUpperCase() === element.value.toUpperCase())
                req = !duplicateVal
              } else {
                req = true
              }
            },
          })

          return req
        },
        "Rating Name already exists",
      )
      $.validator.addMethod(
        "checkCode",
        function (value, element) {
          var req = false
          $.ajax({
            type: "GET",
            async: false,
            url: `${env.API_URL}/master/corporate-rating-type-levels?filters=[["corporate_rating_type.corporate_rating_type_code","6"],["AND"],["corporate_rating_type_level_code","=","${element.value}"]]`,
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
        "Rating Code already exists",
      )

      $.validator.addMethod(
        "checkRating",
        function (value, element) {
          var req = false
          $.ajax({
            type: "GET",
            async: false,
            url: `${env.API_URL}/master/corporate-rating-type-levels?filters=[["corporate_rating_type.corporate_rating_type_code","6"],["AND"],["rating","=","${element.value}"]]`,
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
        "Rating already exists",
      )
    }
  }, [])

  useEffect(() => {
    if (!props.match.params.id) {
      setLoading(false)
    }
    setId(props.match.params.id)
  }, [props.match.params.id])

  const getCorporateRatingType = async (api) => {
    let urlRating = '/master/corporate-rating-types?filters=[["corporate_rating_type_code","=","6"],["AND"],["status","=",1]]';
    let res = await api.get(urlRating)
    res.data.items.forEach((data) => {
      setCorporateRatingId(data.id)
    })
  }

  const onSave = async () => {
    let translated = formBuilder.getTranslations()
    setLoading(true)
    let api = new Api()
    try {
      if (!form.rating) {
        form.rating = null
      }
      form.corporate_rating_type_id = corporateRatingId

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
      props.history.goBack()
      dispatch(
        setAlert({
          message: `Record ${form.corporate_rating_type_level_code} - ${form.corporate_rating_type_level_name} has been successfully ${formId ? "updated" : "saved"}.`,
        }),
      )
    }
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
    >
      <FormHorizontal>
        <FormInputControl
          label="Rating Name"
          required={true}
          value={form.corporate_rating_type_level_name}
          name="corporate_rating_type_level_name"
          cl="4"          
          onChange={(e) => setForm({...form, corporate_rating_type_level_name: e.target.value})}
          disabled={isView || loading}
          type="text"
          minLength="1"
          maxLength="256"
        />       
        {
          loading ? null :
          <FormInputControl
          label="Rating"
          value={form.rating}
          name="rating"
          onChange={(e) => setForm({...form, rating: parseInt(e.target.value)})}
          disabled={isView || loading}
          type="number"
          min="1"
          max="9999"
          onKeyPress={(event) => {
            if (!/[0-9]/.test(event.key)) {
              event.preventDefault();
            }
          }}
        />
        }

      </FormHorizontal>
      <FormHorizontal>
        <FormInputControl
          label="Rating Code"
          required={true}
          value={form.corporate_rating_type_level_code}
          name="corporate_rating_type_level_code"
          cl={{md:"12"}}
          cr="12"
          onChange={(e) =>
            setForm({...form, corporate_rating_type_level_code: parseInt(e.target.value)})
          }
          disabled={isView || loading}
          type="number"
          min="1"
          max="32767"
          onKeyPress={(event) => {
            if (!/[0-9]/.test(event.key)) {
              event.preventDefault();
            }
          }}
        />
      </FormHorizontal>

      
    </FormBuilder>
  )
}

export default withRouter(CorporateRatingForm)
