import { withRouter } from "react-router"
import React, { useEffect, useState } from "react"
import Api from "config/api"
import FormHorizontal from "components/form/horizontal"
import FormInputControl from "components/form/input-control"
import FormBuilder from "components/form/builder"
import useQuery from "lib/query"
import {
  EditorState,
  ContentState,
  convertFromHTML,
  convertToRaw,
} from "draft-js"
import draftToHtml from "draftjs-to-html"
import { useDispatch } from "react-redux"
import { setAlert, setUIParams } from "redux/ui-store"
import CheckDuplicateVal from "../../lib/validateForm"
import { Editor } from "react-draft-wysiwyg"
import { Col, OverlayTrigger, Tooltip, Button, Form } from "react-bootstrap"
import BBDataTable from "components/table/bb-data-table"
import createIcon from "assets/icons/create.svg"
import FormInputSelectAjax from "components/form/input-select-ajax"
const endpoint = "master/configurations/travel-advice"
const backUrl = "master/configurations/travel-advice"

function FormTravel(props) {
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
  const [alertCountry, setAlertCountry] = useState([])
  const isView = useQuery().get("action") === "view"
  const MAX_LENGTH = 4000

  console.log("country", alertCountry)
  const [form, setForm] = useState({
    selectedCountry: "",
    url: "",
    description: "",
    country_name: "",
  })

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

  useEffect(async () => {
    let api = new Api()
    let formId = props.travelAdviceId

    if (formId) {
      try {
        let res = await api.get(endpoint + "/" + formId)
        setForm(res.data)

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

  const onSave = async (values) => {
    // if (form.description === "") {
    //   console.log("masuk sini")
    //   setErrorDescription(true)
    // } else {
    //   let translated = formBuilder.getTranslations()
    //   setLoading(true)
    //   let api = new Api()
    //   console.log("ok", form)
    //   let endpoint = "master/configurations/travel-advice"
    //   try {
    //     let payload = {
    //       content_description: {
    //         description: form.description,
    //         url: form.url,
    //       },
    //       content_description_id:
    //         "urn:uuid:2aac2d26-81be-d35f-9d4d-38945cbed6f8",
    //       country_id: form.selectedCountry,
    //       country_name: form.country_name,
    //     }
    //     let res = await api.post(endpoint, payload)
    //     for (let i in translated) {
    //       let tl = translated[i]
    //       let path = endpoint + "/" + res.data.id + "/translations"
    //       await api.putOrPost(path, tl.id, tl)
    //     }
    //   } catch (e) {
    //     dispatch(
    //       setAlert({
    //         message: `Failed to ${formId ? "update" : "save"} this record.`,
    //       }),
    //     )
    //   } finally {
    //     setLoading(false)
    //     //   props.history.goBack()
    //     setVisibleAdd(false)
    //     dispatch(
    //       setAlert({
    //         message: `Record Travel Advice for  ${
    //           form.country_name
    //         } has been successfully ${formId ? "updated" : "saved"}.`,
    //       }),
    //     )
    //   }
    // }

    let translated = formBuilder.getTranslations()
    setLoading(true)
    let api = new Api()

    try {
      let res = await api.putOrPost(endpoint, id, {
        ...form,
        content_description: {
          description: form.description,
          url: form.url,
        },
        content_description_id: "urn:uuid:2aac2d26-81be-d35f-9d4d-38945cbed6f8",
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
          message: `Record ${form.country_id} - ${
            form.country_id
          } has been successfully ${formId ? "updated" : "saved"}.`,
        }),
      )
      props.history.goBack()
    }
  }

  return (
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
        <Form.Label style={{ fontFamily: "Segoe UI", fontWeight: "700" }}>
          New Travel Advice
        </Form.Label>
        <FormInputSelectAjax
          label="Country"
          required={true}
          value={form.selectedContry}
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
        <FormInputControl
          label="URL"
          value={form.url}
          name="url"
          onChange={(e) => setForm({ ...form, url: e.target.value })}
          // disabled={isView || loading}
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
          </Col>
        </div>
      </FormHorizontal>
    </FormBuilder>
  )
}

function TravelAdvice() {
  const [visibleAdd, setVisibleAdd] = useState(false)
  const [data, setData] = useState(null)
  const [title, setTitle] = React.useState("Travel Advice")
  const [isReplaceTable, setIsReplaceTable] = useState(false)
  const [isDetail, setIsDetail] = useState(false)
  const [travelAdviceId, setTravelAdviceId] = useState(null)

  const setId = async (id) => {
    setTravelAdviceId(id)
  }
  const handleReplaceTable = async (key) => {
    setIsReplaceTable(!key)
  }

  const handleIsDetail = (key) => {
    setIsDetail(key)
  }

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    let api = new Api()
    const url = "/master/configurations/travel-advice"
    let res = await api.get(url)

    if (res.status === 200) {
      setData(res.data.items)
    }
  }

  let params = {
    isCheckbox: false,
    showAdvancedOptions: false,
    createOnModal: false,
    showHistory: false,
    hideCreate: true,
    isHideDownloadLogo: true,
    isHideSearch: false,
    isReplaceTable: true,
    title: "Handler Setup",
    titleModal: "Handler Setup",
    baseRoute: "/master/general-setup",
    endpoint: "/master/configurations/travel-advice",
    deleteEndpoint: "/configurations/travel-advice/:id",
    activationEndpoint:
      "/master/batch-actions/activate/configurations/email-senders",
    deactivationEndpoint:
      "/master/batch-actions/deactivate/currency-conversions",
    columns: [
      {
        title: "Country",
        data: "country.country_name",
      },
      {
        title: "URL",
        data: "content_description.url",
      },
    ],
    emptyTable: "No Travel Advice found",
    recordName: ["from_display", "from_email"],
    btnDownload: ".buttons-csv",
    module: "travel-advice",
    showInfoDelete: true,
    infoDelete: [
      {
        title: "Travel Advice for",
        recordName: "country.country_name",
      },
    ],
  }

  const borderFeeTax = {
    borderRadius: 10,
    width: "100%",
  }
  const titleText = {
    fontSize: 16,
    color: "#333333",
    paddingTop: 20,
    fontWeight: 600,
    paddingLeft: 10,
  }

  return (
    <div>
      {visibleAdd === false ? (
        <div className="border" style={borderFeeTax}>
          <h1 style={titleText}>{title}</h1>
          <hr />
          <div
            className="row"
            style={{
              justifyContent: "space-between",
              width: "90%",
              margin: "auto",
            }}
          >
            <div className="mt-5">
              <div style={{ width: "100%" }}>
                {data === null ? (
                  <p style={{ fontStyle: "italic" }}>No Travel Advice found</p>
                ) : null}
              </div>
            </div>
            {data === null ? (
              <OverlayTrigger
                placement="top"
                overlay={<Tooltip>Click to create</Tooltip>}
              >
                <button
                  type="button"
                  // onClick={this.handleClick.bind(this)}
                  onClick={() => {
                    setVisibleAdd(true)
                    setTitle("Create New Travel Advice")
                  }}
                  className="btn btn-warning float-right button-new"
                >
                  <img src={createIcon} className="mr-1" alt="new" />
                  Add Travel Advice
                </button>
              </OverlayTrigger>
            ) : (
              <div style={{ width: "100%" }}>
                {isReplaceTable ? (
                  <FormTravel
                    isReplaceTable={isReplaceTable}
                    handleReplaceTable={handleReplaceTable}
                    travelAdviceId={travelAdviceId}
                    isDetail={isDetail}
                  />
                ) : (
                  <>
                    {" "}
                    <Col sm={12}>
                      <div style={{ marginTop: 22 }}>
                        <Button
                          className="btn float-right button-override"
                          onClick={() => setVisibleAdd(true)}
                        >
                          <img src={createIcon} className="mr-1" alt="new" />
                          Add Travel Advice
                        </Button>
                      </div>
                    </Col>
                    <BBDataTable
                      {...params}
                      handleReplaceTable={handleReplaceTable}
                      setId={setId}
                      handleIsDetail={handleIsDetail}
                    />
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      ) : (
        <>
          <FormTravel />
        </>
      )}
    </div>
  )
}

export default withRouter(TravelAdvice)
