import FormBuilder from "components/form/builder"
import FormHorizontal from "components/form/horizontal"
import FormInputControl from "components/form/input-control"
import FormInputSelectMultiAjax from "components/form/input-select-multi-ajax"
import Api from "config/api"
import $ from "jquery"
import useQuery from "lib/query"
import React, { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { withRouter } from "react-router"
import { setAlert, setUIParams } from "redux/ui-store"
import env from "../../config/environment"

const endpoint = "/master/hotel-amenity-types"
const backUrl = "/master/hotel-amenity-types"

function HotelAmenityForm(props) {
  let dispatch = useDispatch()
  let formId = props.match.params.id

  const isView = useQuery().get("action") === "view"
  const [formBuilder, setFormBuilder] = useState(null)
  const [loading, setLoading] = useState(true)
  const [translations, setTranslations] = useState([])
  const [id, setId] = useState(null)
  const [categoryData, setCategoryData] = useState([])
  const [form, setForm] = useState({
    hotel_amenity_type_code: "",
    hotel_amenity_type_name: "",
    hotel_amenity_category_hotel_amenity_type: [],
    hotel_amenity_type_asset: {
      multimedia_description_id: null,
      multimedia_description: {
        url: "",
      },
    },
  })

  const translationFields = [
    {
      label: "Hotel Amenity Type Name",
      name: "hotel_amenity_type_name",
      type: "text",
    },
  ]

  const validationRules = {
    hotel_amenity_type_code: {
      required: true,
      min: 0,
      max: 99,
      checkCode: true,
    },
    hotel_amenity_category_hotel_amenity_type: {
      required: false,
    },
    hotel_amenity_type_name: {
      required: true,
      minlength: 1,
      maxlength: 256,
      checkName: true,
    },
    hotel_amenity_type_asset: {
      required: false,
    },
  }

  const validationMessages = {
    hotel_amenity_type_name: {
      required: "Hotel Amenity Type Name is required",
    },
    hotel_amenity_type_code: {
      required: "Hotel Amenity Type Code is required",
    },
    hotel_amenity_type_asset: {
      required: "Hotel Amenity Type Image is required",
      extension: "png|jpg|jpeg",
    },
  }

  useEffect(async () => {
    let api = new Api()
    let formId = props.match.params.id

    let docTitle = "Edit Hotel Amenity Type"
    if (!formId) {
      docTitle = "Create Hotel Amenity Type"
    } else if (isView) {
      docTitle = "View Hotel Amenity Type"
    }

    dispatch(
      setUIParams({
        title: isView ? "Hotel Amenity Type Details" : docTitle,
        breadcrumbs: [
          {
            text: "Master Data Management",
          },
          {
            link: backUrl,
            text: "Hotel Amenity Types",
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
        let data = {
          hotel_amenity_type_code: res.data.hotel_amenity_type_code,
          hotel_amenity_type_name: res.data.hotel_amenity_type_name,
          hotel_amenity_type_asset: res.data.hotel_amenity_type_asset,
        }
        if (res.data.hotel_amenity_category_hotel_amenity_type) {
          setCategoryData(
            res.data.hotel_amenity_category_hotel_amenity_type.map((value) => ({
              ...value.hotel_amenity_category,
              text: value.hotel_amenity_category.hotel_amenity_category_name,
            })),
          )
        }
        if (res.data.hotel_amenity_category_hotel_amenity_type) {
          data = {
            ...data,
            hotel_amenity_category_hotel_amenity_type:
              res.data.hotel_amenity_category_hotel_amenity_type.map(
                (value) => ({
                  hotel_amenity_category_id: value.hotel_amenity_category.id,
                }),
              ),
          }
        }

        setForm(data)

        if (res.data) {
          let currentCode = res.data.hotel_amenity_type_code
          let currentName = res.data.hotel_amenity_type_name
          $.validator.addMethod(
            "checkName",
            function (value, element) {
              var req = false
              $.ajax({
                type: "GET",
                async: false,
                url: `${env.API_URL}/master/hotel-amenity-types?filters=["hotel_amenity_type_name","=","${element.value}"]`,
                success: function (res) {
                  if (res.items.length !== 0) {
                    if (currentName === element.value) {
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
            "Hotel Amenity Type Name already exists",
          )
          $.validator.addMethod(
            "checkCode",
            function (value, element) {
              var req = false
              $.ajax({
                type: "GET",
                async: false,
                url: `${env.API_URL}/master/hotel-amenity-types?filters=["hotel_amenity_type_code","=","${element.value}"]`,
                success: function (res) {
                  if (res.items.length !== 0) {
                    req = currentCode === parseInt(element.value)
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
      } catch (e) {
        console.error({ errorSetForm: e })
      }

      try {
        let res = await api.get(endpoint + "/" + formId + "/translations", {
          size: 50,
        })
        setTranslations(res.data.items)
      } catch (e) {}
      setLoading(false)
    } else {
      $.validator.addMethod(
        "checkName",
        function (value, element) {
          var req = false
          $.ajax({
            type: "GET",
            async: false,
            url: `${env.API_URL}/master/hotel-amenity-types?filters=["hotel_amenity_type_name","=","${element.value}"]`,
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
        "Hotel Amenity Type Name already exists",
      )
      $.validator.addMethod(
        "checkCode",
        function (value, element) {
          var req = false
          $.ajax({
            type: "GET",
            async: false,
            url: `${env.API_URL}/master/hotel-amenity-types?filters=["hotel_amenity_type_code","=","${element.value}"]`,
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
      if (!form.hotel_amenity_type_code) {
        form.hotel_amenity_type_code = null
      } else {
        form.hotel_amenity_type_code = parseInt(form.hotel_amenity_type_code)
      }
      if (!form.hotel_amenity_type_name) {
        form.hotel_amenity_type_name = null
      }
      if (!form.hotel_amenity_category_hotel_amenity_type) {
        form.hotel_amenity_category_hotel_amenity_type = null
      }
      if (!form.hotel_amenity_type_asset) {
        form.hotel_amenity_type_asset = null
      } else {
        if (!form.hotel_amenity_type_asset.multimedia_description_id) {
          form.hotel_amenity_type_asset = null
        }
      }
      let res = await api.putOrPost(endpoint, id, form)
      setId(res.data.id)
      for (let i in translated) {
        let tl = translated[i]
        let path = endpoint + "/" + res.data.id + "/translations"
        await api.putOrPost(path, tl.id, tl)
      }

      dispatch(
        setAlert({
          message: `Record ${form.hotel_amenity_type_code} - ${
            form.hotel_amenity_type_name
          } has been successfully ${formId ? "updated" : "saved"}.`,
        }),
      )
    } catch (e) {
      dispatch(
        setAlert({
          message: `Failed to ${formId ? "update" : "save"} this record.`,
        }),
      )
    } finally {
      setLoading(false)
      props.history.push(backUrl)
    }
  }

  const doUpload = async (e) => {
    try {
      var files = e.target.files[0];
      if(files){
        var filesize = ((files.size/1024)/1024).toFixed(4);
        if(filesize > 4){
          alert("Hotel Amenity Type Icon Image size is more than 4MB.");
          $("#amenity_type").val('');
          return;
        }
        let api = new Api()
        let payload = new FormData()
        payload.append("files", e.target.files[0])

        let config = {
          onUploadProgress: function(progressEvent) {
            let mediaDiv = document.getElementById("media-amenity_type")
            let progressBar = document.getElementById("progress-amenity_type")
            mediaDiv.style.display = "none"
            progressBar.style.display = "block"
            let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
            progressBar.value = percentCompleted;
            if(progressBar.value == 100){
              setTimeout(() => {
                progressBar.style.display = "none"
                mediaDiv.style.display = "block"
              }, 1000)
            }
          }
        }

        let res = await api.post("/multimedia/files", payload, config)
        if (res.data) {
          setForm({
            ...form,
            hotel_amenity_type_asset: {
              multimedia_description_id: res.data.id,
              multimedia_description: res.data,
            },
          })
        }
      }
    } catch (e) {}
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
          label="Hotel Amenity Type Name"
          required={true}
          value={form.hotel_amenity_type_name}
          name="hotel_amenity_type_name"
          onChange={(e) =>
            setForm({ ...form, hotel_amenity_type_name: e.target.value })
          }
          disabled={isView || loading}
          type="text"
          minLength="1"
          maxLength="256"
        />
        {
          !loading &&
        <FormInputSelectMultiAjax
          label="Hotel Amenity Category"
          value={
            form.hotel_amenity_category_hotel_amenity_type
              ? form.hotel_amenity_category_hotel_amenity_type.map(
                  (item) => item.hotel_amenity_category_id,
                )
              : []
          }
          name="hotel_amenity_category_id"
          data={categoryData}
          endpoint="/master/hotel-amenity-categories"
          column="hotel_amenity_category_name"
          filter={`["status", "=", 1]`}
          onChange={(e, values) =>
            setForm((prev) => ({
              ...prev,
              hotel_amenity_category_hotel_amenity_type: values.map(
                (value) => ({ hotel_amenity_category_id: value.id }),
              ),
            }))
          }
          disabled={isView || loading}
          type="selectmultiple"
          placeholder="Hotel Amenity Category"
        />
        }
        <FormInputControl
          id="amenity_type"
          label="Hotel Amenity Type Icon Image"
          type="image"
          name="hotel_amenity_type_asset"
          onChange={doUpload}
          disabled={isView}
          accept=".png,.jpg,.jpeg"
          url={form.hotel_amenity_type_asset?.multimedia_description.url}
          style={{ maxWidth: 300, marginTop: 12 }}
          notes={true}
        />
      </FormHorizontal>

      <FormHorizontal>
        <FormInputControl
          label="Hotel Amenity Type Code"
          required={true}
          value={form.hotel_amenity_type_code}
          name="hotel_amenity_type_code"
          cl={{ md: "12" }}
          cr="12"
          onChange={(e) =>
            setForm({
              ...form,
              hotel_amenity_type_code: parseInt(e.target.value),
            })
          }
          // onChange={(e) => setForm({...form, hotel_amenity_type_code: e.target.value})}
          disabled={isView || loading}
          type="number"
          pattern="\d*"
          minLength="0"
          maxLength="99"
          hint="Hotel Amenity type code maximum 2 characters"
        />
      </FormHorizontal>
    </FormBuilder>
  )
}

export default withRouter(HotelAmenityForm)
