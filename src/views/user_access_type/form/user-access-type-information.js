import { withRouter } from "react-router"
import React, { useEffect, useState } from "react"
import Api from "config/api"
import FormHorizontal from "components/form/horizontal"
import FormInputControl from "components/form/input-control"
import FormBuilder from "components/form/builder"
import useQuery from "lib/query"
import { useDispatch } from "react-redux"
import { setAlert } from "redux/ui-store"
import $ from "jquery"
import env from "../../../config/environment"

const endpoint = "/user/user-types"
const backUrl = "/master/user-access-type"

function UserAccessTypeInformation(props) {
  let dispatch = useDispatch()
  let formId = props.match.params.id

  const isView = useQuery().get("action") === "view"
  const [formBuilder, setFormBuilder] = useState(null)
  const [loading, setLoading] = useState(true)
  const [translations, setTranslations] = useState([])
  const [id, setId] = useState(null)
  const [form, setForm] = useState({
    user_type_code: "",
    user_type_name: "",
  })
  const translationFields = [
    {
      label: "Name",
      name: "user_type_name",
      type: "text",
      maxLength: 64,
    },
  ]

  const validationRules = {
    user_type_name: {
      required: true,
      minlength: 1,
      maxlength: 64,
      checkName: true,
    },
    user_type_code: {
      required: true,
      minlength: 2,
      maxlength: 4,
      checkCode: true,
    },
  }

  const validationMessages = {
    user_type_name: {
      required: "Name is required",
    },
    user_type_code: {
      required: "Code is required",
    },
  }

  useEffect(async () => {
    let api = new Api()
    let formId = props.match.params.id
    if (formId) {
      try {
        let res = await api.get(endpoint + "/" + formId)
        setForm(res.data)

        if (res.data) {
          let currentCode = res.data.user_type_code
          let currentName = res.data.user_type_name

          $.validator.addMethod(
            "checkName",
            function (value, element) {
              var req = false
              $.ajax({
                type: "GET",
                headers: {"Authorization": `Bearer ${localStorage.getItem('ut')}`},
                async: false,
                url: `${env.API_URL}/user/user-types?filters=["user_type_name","like","${element.value}"]`,
                success: function (res) {
                  if (res.items.length !== 0) {
                    if(currentName.toUpperCase() === element.value.toUpperCase()){
                      req = true
                    } else {
                      let duplicateVal = res.items.find( e => e.user_type_name.toUpperCase() === element.value.toUpperCase())
                      req = !duplicateVal
                    }
                  } else {
                    req = true
                  }
                },
              })

              return req
            },
            "User Type Name already exists",
          )
          $.validator.addMethod(
            "checkCode",
            function (value, element) {
              var req = false
              $.ajax({
                type: "GET",
                async: false,
                headers: {"Authorization": `Bearer ${localStorage.getItem('ut')}`},
                url: `${env.API_URL}/user/user-types?filters=["user_type_code","like","${element.value}"]`,
                success: function (res) {
                  if (res.items.length !== 0) {
                    if (currentCode === element.value) {
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
            "User Type Code already exists",
          )
        }
      } catch (e) {}

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
            headers: {"Authorization": `Bearer ${localStorage.getItem('ut')}`},
            url: `${env.API_URL}/user/user-types?filters=["user_type_name","like","${element.value}"]`,
            success: function (res) {
              if (res.items.length !== 0) {
                let duplicateVal = res.items.find( e => e.user_type_name.toUpperCase() === element.value.toUpperCase())
                req = !duplicateVal
              } else {
                req = true
              }
            },
          })

          return req
        },
        "User Type Name already exists",
      )
      $.validator.addMethod(
        "checkCode",
        function (value, element) {
          var req = false
          $.ajax({
            type: "GET",
            async: false,
            headers: {"Authorization": `Bearer ${localStorage.getItem('ut')}`},
            url: `${env.API_URL}/user/user-types?filters=["user_type_code","like","${element.value}"]`,
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
        "User Type Code already exists",
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
      if (!form.model) {
        form.model = null
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
      props.handleSelectTab("module-access")
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
      showHeaderTitle={true}
      headerTitle={"User Access Type Information"}
      txtSave={"SAVE & NEXT"}
    >
      <FormHorizontal>
        <FormInputControl
          label="Name"
          required={true}
          value={form.user_type_name}
          name="user_type_name"
          onChange={(e) => setForm({ ...form, user_type_name: e.target.value })}
          disabled={isView || loading}
          type="text"
          minLength="1"
          maxLength="64"
        />
      </FormHorizontal>

      <FormHorizontal>
        <FormInputControl
          value={form.user_type_code}
          required={true}
          name="user_type_code"
          onChange={(e) => setForm({ ...form, user_type_code: e.target.value })}
          cl={{ md: "12" }}
          cr="12"
          disabled={isView || loading}
          label="Code"
          type="text"
          minLength="2"
          maxLength="4"
          hint="Code maximum 4 characters"
        />
      </FormHorizontal>
    </FormBuilder>
  )
}

export default withRouter(UserAccessTypeInformation)
