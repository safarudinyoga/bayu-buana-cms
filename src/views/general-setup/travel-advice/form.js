import { withRouter } from "react-router"
import React, { useEffect, useState } from "react"
import Api from "config/api"
import FormHorizontal from "components/form/horizontal"
import FormInputControl from "components/form/input-control"
import FormBuilder from "components/form/builder"
import useQuery from "lib/query"
import { useDispatch } from "react-redux"
import { setAlert, setUIParams } from "redux/ui-store"
import CheckDuplicateVal from "../../../lib/validateForm"
import { Editor } from "react-draft-wysiwyg"
import { Col, OverlayTrigger, Tooltip, Button } from "react-bootstrap"
import BBDataTable from "components/table/bb-data-table"
import createIcon from "assets/icons/create.svg"
import { EditorState } from "draft-js"
import FormInputSelectAjax from "components/form/input-select-ajax"
import { Alert } from "bootstrap"

const endpoint = "master/configurations/travel-advice"
const backUrl = "master/configurations/general-setup"

export default function Form(props) {
  let dispatch = useDispatch()
  let formId = props.travelAdviceId

  const [formBuilder, setFormBuilder] = useState(null)
  const isView = useQuery().get("action") === "view"

  const [loading, setLoading] = useState(true)
  const [form, setForm] = useState({
    selectedCountry: "",
    url: "",
    description: "",
  })

  const [countryValue, setCountryvalue] = useState("")
  const [visibleAdd, setVisibleAdd] = useState(false)
  const [errorDescription, setErrorDescription] = useState(false)
  const [translations, setTranslations] = useState([])

  console.log(countryValue)
  const validationRules = {
    country: {
      required: true,
      checkCode: true,
    },
    description: {
      required: true,
      minlength: 1,
      maxlength: 256,
      checkName: true,
      checkCode: true,
    },
  }

  const validationMessages = {
    country: {
      required: "Country is required.",
      max: "Age Qualifying Type Code cannot be more than 32767",
    },
    description: {
      required: "Country is required.",
      max: "Age Qualifying Type Code cannot be more than 32767",
    },
    age_qualifying_type_name: {
      required: "Country is required",
      minlength: "Country must be at least 1 characters",
      maxlength: "Country cannot be more than 256 characters",
    },
  }

  useEffect(async () => {
    let api = new Api()
    let formId = props.travelAdviceId
    if (formId) {
      try {
        let res = await api.get(endpoint + "/" + formId)
        setForm(res.data)
        setCountryvalue(res.data.country.country_name)
        let url = res.data.content_description.url

        if (res.data) {
          CheckDuplicateVal({
            name: "checkName",
            route: "age-qualifying-types",
            key: "age_qualifying_type_name",
            label: "Age Qualifying Type Name",
            currentValue: res.data.age_qualifying_type_name,
          })
          CheckDuplicateVal({
            name: "checkCode",
            route: "age-qualifying-types",
            key: "country",
            label: "Code",
            currentValue: res.data.country,
            isNumber: true,
          })
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
      CheckDuplicateVal({
        name: "checkName",
        route: "age-qualifying-types",
        key: "age_qualifying_type_name",
        label: "Age Qualifying Type Name",
      })
      CheckDuplicateVal({
        name: "checkCode",
        route: "age-qualifying-types",
        key: "country",
        label: "Code",
      })
    }
  }, [])

  useEffect(() => {
    if (!props.travelAdviceId) {
      setLoading(false)
    }
  }, [props.travelAdviceId])
  const editorStyle = {
    height: "10rem",
  }
  const wrapperStyle = {
    border: "1px solid #D3D3D3",
    marginBottom: 20,
  }
  const [editorImportantNoticeState, setImportantNoticeState] = useState(
    EditorState.createEmpty(),
  )

  const _getLengthOfSelectedText = () => {
    const currentSelection = editorImportantNoticeState.getSelection()
    const isCollapsed = currentSelection.isCollapsed()

    let length = 0

    if (!isCollapsed) {
      const currentContent = editorImportantNoticeState.getCurrentContent()
      const startKey = currentSelection.getStartKey()
      const endKey = currentSelection.getEndKey()
      const startBlock = currentContent.getBlockForKey(startKey)
      const isStartAndEndBlockAreTheSame = startKey === endKey
      const startBlockTextLength = startBlock.getLength()
      const startSelectedTextLength =
        startBlockTextLength - currentSelection.getStartOffset()
      const endSelectedTextLength = currentSelection.getEndOffset()
      const keyAfterEnd = currentContent.getKeyAfter(endKey)
      console.log(currentSelection)
      if (isStartAndEndBlockAreTheSame) {
        length +=
          currentSelection.getEndOffset() - currentSelection.getStartOffset()
      } else {
        let currentKey = startKey

        while (currentKey && currentKey !== keyAfterEnd) {
          if (currentKey === startKey) {
            length += startSelectedTextLength + 1
          } else if (currentKey === endKey) {
            length += endSelectedTextLength
          } else {
            length += currentContent.getBlockForKey(currentKey).getLength() + 1
          }

          currentKey = currentContent.getKeyAfter(currentKey)
        }
      }
    }

    return length
  }

  const MAX_LENGTH = 4000
  const _handleBeforeInput = () => {
    const currentContent = editorImportantNoticeState.getCurrentContent()
    const currentContentLength = currentContent.getPlainText("").length
    const selectedTextLength = _getLengthOfSelectedText()

    if (currentContentLength - selectedTextLength > MAX_LENGTH - 1) {
      console.log("you can type max ten characters")

      return "handled"
    }
  }

  const _handlePastedText = (pastedText) => {
    const currentContent = editorImportantNoticeState.getCurrentContent()
    const currentContentLength = currentContent.getPlainText("").length
    const selectedTextLength = _getLengthOfSelectedText()

    if (
      currentContentLength + pastedText.length - selectedTextLength >
      MAX_LENGTH
    ) {
      console.log("you can type max ten characters")

      return "handled"
    }
  }

  const _handleChange = (editorState) => {
    setImportantNoticeState(editorState)
  }
  const translationFields = [
    {
      label: "URL",
      name: "URL",
      type: "Description",
    },
    {
      label: "Description",
      name: "description",
      type: "richtext",
    },
  ]

  const onSave = async () => {
    if (form.description === "") {
      console.log("masuk sini")
      setErrorDescription(true)
    } else {
      let translated = formBuilder.getTranslations()
      setLoading(true)
      let api = new Api()
      console.log("ok", form)
      // let endpoint = "master/configurations/travel-advice"
      try {
        let payload = {
          content_description: {
            description: form.description,
            url: form.url,
          },
          content_description_id:
            "urn:uuid:2aac2d26-81be-d35f-9d4d-38945cbed6f8",
          country_id: form.selectedCountry,
        }
        let res = await api.post(endpoint, payload)

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
        //   props.history.goBack()
        setVisibleAdd(false)
        dispatch(
          setAlert({
            message: `Record ${form.selectedCountry} - ${
              form.age_qualifying_type_name
            } has been successfully ${formId ? "updated" : "saved"}.`,
          }),
        )
      }
    }
  }

  return (
    <div>
      {" "}
      <FormBuilder
        onBuild={(el) => setFormBuilder(el)}
        isView={isView}
        onSave={onSave}
        back={backUrl}
        translations={translations}
        translationFields={translationFields}
        alertMessage={"Incomplete data"}
        isValid={false}
        rules={validationRules}
        validationMessages={validationMessages}
        visibleAdd={() => setVisibleAdd(false)}
      >
        <FormHorizontal>
          <FormInputSelectAjax
            label="Country"
            required={true}
            value={form.selectedCountry}
            name="country"
            endpoint="/master/countries"
            column="country_name"
            filter={`["status", "=", 1]`}
            // data={selectedContry}
            onChange={(e) => {
              // setSelectedContry(e.target.value)
              setForm({ ...form, selectedCountry: e.target.value })
            }}
            type="select"
            // style={{width: '50%'}}
          />
          <FormInputControl
            label="URL"
            value={form.url}
            name="url"
            onChange={(e) => setForm({ ...form, url: e.target.value })}
            disabled={isView || loading}
            type="text"
            minLength="1"
            maxLength="256"
          />
          <div className="row" style={{ display: "flex", width: "205%" }}>
            <Col sm={2}>
              <p>
                Description
                <span
                  className={"text-label-input label-required"}
                  style={{ color: "red", marginLeft: 3 }}
                >
                  *
                </span>
              </p>
            </Col>
            <Col sm={7}>
              <div>
                <Editor
                  required={true}
                  // editorState={description}
                  toolbarClassName="toolbarClassName"
                  wrapperClassName="wrapperClassName"
                  wrapperStyle={wrapperStyle}
                  name="description"
                  column="country_name"
                  editorStyle={editorStyle}
                  editorClassName="editorClassName"
                  handleBeforeInput={_handleBeforeInput}
                  handlePastedText={_handlePastedText}
                  onEditorStateChange={_handleChange}
                  // onEditorStateChange={(e) => setDescription(e.target.value)}
                  toolbarStyle={{
                    background: "#ECECEC 0% 0% no-repeat padding-box",
                  }}
                  onChange={(e) => {
                    // setDescription(e.blocks[0].text)
                    setForm({ ...form, description: e.blocks[0].text })
                    setErrorDescription(false)
                  }}
                  maxLength={4000}
                />
                {errorDescription ? (
                  <p style={{ marginTop: -5, color: "#ED858C" }}>
                    Description is required.
                  </p>
                ) : null}
              </div>
            </Col>
          </div>
        </FormHorizontal>
      </FormBuilder>
    </div>
  )
}
