import { withRouter } from "react-router"
import React, { useEffect, useState } from "react"
import Api from "config/api"
import FormHorizontal from "components/form/horizontal"
import FormInputControl from "components/form/input-control"
import FormBuilder from "components/form/builder"
import useQuery from "lib/query"
import _ from "lodash"
import env from "config/environment"
import SelectAsync from "components/form/select-async"
import { Formik, FastField } from "formik"
import * as Yup from "yup"
import {
  EditorState,
  ContentState,
  convertFromHTML,
  convertToRaw,
} from "draft-js"
import axios from "axios"
import draftToHtml from "draftjs-to-html"
import { useDispatch } from "react-redux"
import { setAlert, setUIParams } from "redux/ui-store"
import CheckDuplicateVal from "../../../lib/validateForm"
import { Editor } from "react-draft-wysiwyg"
import {
  Col,
  OverlayTrigger,
  Tooltip,
  Button,
  Form,
  Row,
} from "react-bootstrap"
import BBDataTable from "components/table/bb-data-table"
import createIcon from "assets/icons/create.svg"
import FormInputSelectAjax from "components/form/input-select-ajax"
import { useForm } from "react-hook-form"
import isURL from "validator/lib/isURL"

const endpoint = "master/configurations/travel-advice"
const backUrl = "master/configurations/travel-advice"

function FormTravelAdvice(props) {
  const [editorImportantNoticeState, setImportantNoticeState] = useState(
    EditorState.createEmpty(),
  )
  const [initialForm, setInitialForm] = useState({
    selectedCountry: "",
    url: "",
    description: "",
  })

  const validationSchema = Yup.object().shape({
    message_type: Yup.object().required("Message Type is required."),
    sender_name: Yup.string().max(256).required("Sender Name is required"),
    sender_email: Yup.string()
      .max(256)
      .email("Sender Email is not valid")
      .required("Sender Email is required."),
  })
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
  const [formBuilder, setFormBuilder] = useState(null)
  let dispatch = useDispatch()
  let formId = props.travelAdviceId

  const [loading, setLoading] = useState(true)
  const [translations, setTranslations] = useState([])
  const [visibleAdd, setVisibleAdd] = useState(false)
  const [countryValue, setCountryvalue] = useState([])
  const [data, setData] = useState(null)
  const [id, setId] = useState(null)
  const [title, setTitle] = React.useState("Travel Advice")
  const [selectedContry, setSelectedContry] = useState(null)
  const [errorDescription, setErrorDescription] = useState(false)
  const [isReplaceTable, setIsReplaceTable] = useState(false)

  const [isDetail, setIsDetail] = useState(false)
  const [travelAdviceId, setTravelAdviceId] = useState(null)
  const isView = useQuery().get("action") === "view"
  const MAX_LENGTH = 4000

  const handleReplaceTable = async (key) => {
    setIsReplaceTable(!key)
  }
  const [val, setVal] = useState("")
  const [err, setErr] = useState("")

  const validate = (e) => {
    setVal(e.target.value)
    if (isURL(val)) {
      setErr("")
    } else {
      setErr("URl is Not valid")
    }
  }

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
    defaultValues: {
      url: "https://",
    },
  })

  const [form, setForm] = useState({
    selectedCountry: "",
    url: "",
    description: "",
    country: "",
  })

  console.log("tes", form)

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

  const editorStyle = {
    height: "10rem",
  }
  const wrapperStyle = {
    border: "1px solid #D3D3D3",
    marginBottom: 20,
  }

  const _handleBeforeInput = () => {
    const currentContent = editorImportantNoticeState.getCurrentContent()
    const currentContentLength = currentContent.getPlainText("").length
    const selectedTextLength = _getLengthOfSelectedText()

    if (currentContentLength - selectedTextLength > MAX_LENGTH - 1) {
      console.log("you can type max ten characters")

      return "handled"
    }
  }

  console.log(countryValue)

  useEffect(async () => {
    let api = new Api()
    let formId = props.travelAdviceId

    if (formId) {
      try {
        let res = await api.get(endpoint + "/" + formId)
        setForm(res.data)

        let data = res.data

        setInitialForm({
          ...initialForm,
          selectedCountry: _.isEmpty(data.selectedCountry)
            ? ""
            : {
                value: data.selectedCountry.id,
                label: data.selectedCountry.country_name,
              },
        })

        if (res.data.country) {
          setCountryvalue([
            { ...res.data.country, text: res.data.country.country_name },
          ])
        }

        if (res.data.country) {
          CheckDuplicateVal({
            name: "checkName",
            route: "age-qualifying-types",
            key: "country.country_name",
            label: "Country",
            currentValue: res.data.country.country_name,
          })
          CheckDuplicateVal({
            name: "checkCode",
            route: "age-qualifying-types",
            key: "country",
            label: "Code",
            currentValue: res.data.country.country_name,
            // isNumber: true,
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

  // const [editorState, setEditorState] = useState(
  //   EditorState.createWithContent(
  //     ContentState.createFromBlockArray(convertFromHTML("<p>test</P>")),
  //   ),
  // )
  useEffect(() => {
    if (!props.travelAdviceId) {
      setLoading(false)
    }
    setId(props.travelAdviceId)
  }, [props.travelAdviceId])

  const [editorState, setEditorState] = useState(EditorState.createEmpty())

  const onEditorStateChange = (editorState) => {
    setEditorState(editorState)
    const editor = draftToHtml(convertToRaw(editorState.getCurrentContent()))
    console.log("tes", editor)
    setForm({ ...form, description: editor })
  }

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
  }

  const onSave = async (values, element) => {
    let translated = formBuilder.getTranslations()

    setLoading(true)
    let api = new Api()
    try {
      let res = await api.putOrPost(endpoint, id, {
        ...form,
        content_description: {
          description: form.description,
          url: val,
        },
        content_description_id: "urn:uuid:2aac2d26-81be-d35f-9d4d-38945cbed6f8",
        // country_id: values.selectedCountry
        //   ? values.selectedCountry.value
        //   : "00000000-0000-0000-0000-000000000000",
        country_id: form.selectedCountry,
      })
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
      // props.history.goBack()
      dispatch(
        setAlert({
          message: `Record ${values.country_name} - ${
            form.selectedCountry
          } has been successfully ${formId ? "updated" : "saved"}.`,
        }),
      )
      // props.history.goBack()
      handleReplaceTable(isReplaceTable)
    }
  }

  return (
    <>
      <Formik>
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
          <Form onSubmit={handleSubmit} className="ml-2">
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
                <Form.Label
                  style={{ fontFamily: "Segoe UI", fontWeight: "700" }}
                >
                  EDIT TRAVEL ADVICE
                </Form.Label>
                <FormInputSelectAjax
                  label="Country"
                  required={true}
                  value={form.country_id}
                  name="country"
                  endpoint="/master/countries"
                  column="country_name"
                  filter={`["status", "=", 1]`}
                  data={countryValue}
                  onChange={(e) => {
                    // setSelectedContry(e.target.value)
                    setForm({ ...form, selectedCountry: e.target.value })
                  }}
                  type="select"
                  // style={{width: '50%'}}
                />
                <Form.Group as={Row} className="form-group">
                  <Form.Label column md={3} lg={4}>
                    URL
                  </Form.Label>
                  <Col md={9} lg={8}>
                    <FastField name="url" disabled>
                      {({ field, form }) => (
                        <>
                          <Form.Control
                            label="URL"
                            // value={form.url}

                            name="url"
                            // onChange={validate}
                            // onChange={(e) => {
                            //   // setSelectedContry(e.target.value)
                            //   validate({ ...form, url: e.target.value })
                            // }}
                            // disabled={isView || loading}
                            type="text"
                            minLength="1"
                            maxLength="256"
                            {...register("url", {
                              required: {
                                value: true,
                                message: "Url is required",
                              },
                              pattern: {
                                value:
                                  /^((ftp|http|https):\/\/)?www\.([A-z]+)\.([A-z]{2,})/,
                                message: "Please enter a valid url",
                              },
                            })}
                          />
                        </>
                      )}
                    </FastField>
                    <div>
                      <span
                        style={{
                          marginLeft: "325px",
                          color: "Highlight",
                        }}
                      >
                        {err}
                      </span>
                    </div>
                  </Col>
                </Form.Group>
                <div>
                  {errors.url && (
                    <span className="text-sm text-red-500">
                      {errors.url.message}
                    </span>
                  )}
                </div>
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
                        onEditorStateChange={onEditorStateChange}
                        // onEditorStateChange={onEditorStateChange}
                        // onEditorStateChange={(e) => setDescription(e.target.value)}
                        toolbarStyle={{
                          background: "#ECECEC 0% 0% no-repeat padding-box",
                        }}
                        editorState={editorState}
                        // onChange={(e) => {
                        //   setDescription(e.blocks[0].text)

                        //   setForm({ ...form, description: e.blocks[0].text })
                        //   setErrorDescription(false)
                        // }}
                        maxLength={4000}
                      />
                      {errorDescription ? (
                        <p style={{ marginTop: -5, color: "#ED858C" }}>
                          Description is required.
                        </p>
                      ) : null}
                    </div>
                    <input
                      type="url"
                      className={`w-full h-16 text-4xl rounded-lg ${
                        errors.url &&
                        " focus:border-red-500 focus:ring-red-500 border-red-500"
                      }`}
                      {...register("url", {
                        required: {
                          value: true,
                          message: "Url is required",
                        },
                        pattern: {
                          value:
                            /^((ftp|http|https):\/\/)?www\.([A-z]+)\.([A-z]{2,})/,
                          message: "Please enter a valid url",
                        },
                      })}
                    />
                    <div>
                      {errors.url && (
                        <span className="text-sm text-red-500">
                          {errors.url.message}
                        </span>
                      )}
                    </div>
                  </Col>
                </div>
              </FormHorizontal>
            </FormBuilder>
          </Form>
        )}
      </Formik>
      {/* <FormBuilder
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
          <Form.Label style={{ fontFamily: "Segoe UI", fontWeight: "700" }}>
            EDIT TRAVEL ADVICE
          </Form.Label>
          <FormInputSelectAjax
            label="Country"
            required={true}
            value={form.country_id}
            name="country"
            endpoint="/master/countries"
            column="country_name"
            filter={`["status", "=", 1]`}
            data={countryValue}
            onChange={(e) => {
              // setSelectedContry(e.target.value)
              setForm({ ...form, selectedCountry: e.target.value })
            }}
            type="select"
            // style={{width: '50%'}}
          />
          <input
            type="url"
            className={`w-full h-16 text-4xl rounded-lg ${
              errors.url &&
              " focus:border-red-500 focus:ring-red-500 border-red-500"
            }`}
            onChange={(e) => {
              // setSelectedContry(e.target.value)
              setForm({ ...form, selectedCountry: e.target.value })
            }}
            {...register("url", {
              required: {
                value: true,
                message: "Url is required",
              },
              pattern: {
                value: /^((ftp|http|https):\/\/)?www\.([A-z]+)\.([A-z]{2,})/,
                message: "Please enter a valid url",
              },
            })}
          />
          <div>
            {errors.url && (
              <span className="text-sm text-red-500">{errors.url.message}</span>
            )}
          </div>
          <input value={val} onChange={validate} />

          <FormInputControl
            label="URL"
            // value={form.url}

            name="url"
            onChange={validate}
            // onChange={(e) => {
            //   // setSelectedContry(e.target.value)
            //   validate({ ...form, url: e.target.value })
            // }}
            disabled={isView || loading}
            type="text"
            minLength="1"
            maxLength="256"
          />
          <div>
            <span
              style={{
                marginLeft: "325px",
                color: "Highlight",
              }}
            >
              {err}
            </span>
          </div>
          <Form.Control.Feedback type="invalid">{err}</Form.Control.Feedback>
          <div>
            {errors.url && (
              <span className="text-sm text-red-500">{errors.url.message}</span>
            )}
          </div>
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
                  onEditorStateChange={onEditorStateChange}
                  // onEditorStateChange={onEditorStateChange}
                  // onEditorStateChange={(e) => setDescription(e.target.value)}
                  toolbarStyle={{
                    background: "#ECECEC 0% 0% no-repeat padding-box",
                  }}
                  editorState={editorState}
                  // onChange={(e) => {
                  //   setDescription(e.blocks[0].text)

                  //   setForm({ ...form, description: e.blocks[0].text })
                  //   setErrorDescription(false)
                  // }}
                  maxLength={4000}
                />
                {errorDescription ? (
                  <p style={{ marginTop: -5, color: "#ED858C" }}>
                    Description is required.
                  </p>
                ) : null}
              </div>
              <input
                type="url"
                className={`w-full h-16 text-4xl rounded-lg ${
                  errors.url &&
                  " focus:border-red-500 focus:ring-red-500 border-red-500"
                }`}
                {...register("url", {
                  required: {
                    value: true,
                    message: "Url is required",
                  },
                  pattern: {
                    value:
                      /^((ftp|http|https):\/\/)?www\.([A-z]+)\.([A-z]{2,})/,
                    message: "Please enter a valid url",
                  },
                })}
              />
              <div>
                {errors.url && (
                  <span className="text-sm text-red-500">
                    {errors.url.message}
                  </span>
                )}
              </div>
            </Col>
          </div>
        </FormHorizontal>
      </FormBuilder> */}
    </>
  )
}

export default withRouter(FormTravelAdvice)
