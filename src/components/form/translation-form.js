import Api from "config/api"
import $ from "jquery"
import { Component } from "react"
import { Col } from "react-bootstrap"
import FormHorizontal from "./horizontal"
import FormInputControl from "./input-control"
import { Editor } from "react-draft-wysiwyg"
import "./translation-form.css"
import arrowdownIcon from "assets/icons/arrow-down.svg"

import draftToHtml from "draftjs-to-html"
import { convertToRaw } from "draft-js"

export default class TranslationForm extends Component {
  constructor(props) {
    console.log(props, "translation")
    super(props)
    this.state = {
      pillStyle: {},
      currentLanguage: "",
      languages: [],
      loading: true,
      translated: {},
      showList: false,
      translationData: [],
      url: "",
    }

    this.translated = {}
    this.hasTranslated = false
    this.api = new Api()
  }

  componentDidMount() {
    this.api
      .get("/master/agent-languages", { size: -1, sort: "sort,language_name" })
      .then((res) => {
        this.setState({ languages: res.data.items })
        if (res.data.items.length > 0) {
          this.setState({
            currentLanguage: res.data.items[0].language_name,
          })
        }
      })
      .finally(() => {
        this.setState({ loading: false })
      })
  }

  componentDidUpdate() {
    if (
      !this.hasTranslated &&
      this.props.translations &&
      this.props.translations.length
    ) {
      this.translated = {}
      for (let i in this.props.translations) {
        let item = this.props.translations[i]
        this.translated[item.language_code] = item
      }
      this.setState({ translated: this.translated })
      this.hasTranslated = true
      if (this.props.fields) {
        for (let i in this.props.translations) {
          let item = this.props.translations[i]
          for (let a in this.props.fields) {
            let field = this.props.fields[a]
            let inputId = "trans-" + item.language_code + "-" + field.name
            try {
              document.getElementById(inputId).value = item[field.name] || ""
            } catch (e) {}
          }
        }
      }
    }
  }

  togglePills() {
    let display = this.state.pillStyle.display === "flex" ? "none" : "flex"
    this.setState({
      pillStyle: { display: display },
      showList: !this.state.showList,
    })
  }

  onSelected(e) {
    this.setState({
      currentLanguage: e.target.innerText,
      translated: this.translated,
    })
  }

  onValueChange(lang, name, e) {
    console.log(lang, "name", e.target.value, "e")
    if (!this.translated[lang]) {
      this.translated[lang] = { language_code: lang }
    }

    let inField = []
    this.props.fields.map((field, index) => {
      let id = "trans-" + lang + "-" + field.name
      let elem = document.getElementById(id)
      if (elem) {
        inField.push(elem.value)
      } else {
        console.log(elem, "gagal", id)
      }
      return field
    })
    this.translated[lang][name] = e.target.value

    this.setState({
      translated: this.translated,
    })
  }
  onEditorStateChange = (editorState, lang, name) => {
    const editor = draftToHtml(convertToRaw(editorState.getCurrentContent()))
    console.log("tes editor", editor)
    if (!this.translated[lang]) {
      this.translated[lang] = { language_code: lang }
    }

    let inField = []
    this.props.fields.map((field, index) => {
      let id = "rdw-wrapper-trans-" + lang + "-" + name
      let elem = document.getElementById(id)
      if (elem) {
        inField.push(elem.value)
      } else {
        console.log(elem, "gagal2", id)
      }
      return field
    })
    this.translated[lang][name] = editor

    this.setState({
      translated: this.translated,
    })
  }
  getKeyByValue(object, value) {
    return Object.keys(object).find((key) => object[key] === value)
  }

  showExclamation(lang) {
    let translated = this.state.translated[lang.language_code]
    if (translated) {
      let findField = this.props.fields.find(
        (f) => translated[f.name] && translated[f.name] !== "",
      )
      return !findField
    }
    return true
  }

  render() {
    const { showList } = this.state

    $(document)
      .off("click", ".translation-form .nav-link")
      .on("click", ".translation-form .nav-link", (e) => {
        this.togglePills()
      })

    var tabContents = []
    var tabPills = []

    if (this.state.languages && this.state.languages.length > 0) {
      tabPills = this.state.languages.map((lang, n) => {
        let baseClass = "nav-link"
        return (
          <button
            key={n}
            type="button"
            className={n === 0 ? baseClass + " active" : baseClass}
            id={"tab-pill-" + lang.language_code}
            onClick={this.onSelected.bind(this)}
            data-toggle="pill"
            data-target={"#tab-content-" + lang.language_code}
            role="tab"
            aria-controls={"tab-content-" + lang.language_code}
            aria-selected="true"
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span className="text-label-input">{lang.language_name}</span>
              {!this.showExclamation(lang) ? (
                ""
              ) : (
                <i
                  className="fas fa-exclamation-triangle"
                  style={{ color: "red" }}
                ></i>
              )}
            </div>
          </button>
        )
      })
      tabContents = this.state.languages.map((lang, n) => {
        let baseClass = "tab-pane"
        let fields = []
        if (this.props.fields && this.props.fields.length > 0) {
          fields = this.props.fields
        }
        return (
          <div
            key={n}
            className={n === 0 ? baseClass + " active" : baseClass}
            id={"tab-content-" + lang.language_code}
            role="tabpanel"
            aria-labelledby={"tab-pill-" + lang.language_code}
          >
            <FormHorizontal>
              {fields.map((field, index) => {
                if (field.type === "richtext") {
                  return (
                    <div className="row">
                      <Col sm={5}>
                        <p>Description</p>
                      </Col>
                      <Col sm={7}>
                        <div
                          style={{
                            width: "270%",
                            height: "40vh",
                            display: "flex",
                            flexWrap: "wrap",
                            overflow: "auto",
                          }}
                        >
                          <Editor
                            // editorState={this.state.editorState}
                            wrapperId={
                              "trans-" + lang.language_code + "-" + field.name
                            }
                            toolbarClassName="toolbarClassName"
                            wrapperClassName="wrapperClassName"
                            editorClassName="editorClassName"
                            wrapperStyle={{ border: "1px solid #D3D3D3" }}
                            onEditorStateChange={(e) => {
                              this.onEditorStateChange(
                                e,
                                lang.language_code,
                                field.name,
                              )
                            }}
                            toolbarStyle={{
                              background: "#ECECEC 0% 0% no-repeat padding-box",
                            }}
                          />
                        </div>
                      </Col>
                    </div>
                  )
                }
                if (field.type === "Description") {
                  return (
                    <FormInputControl
                      wrapperAlign="start"
                      disabled={this.props.isView || this.state.loading}
                      key={index}
                      id={"trans-" + lang.language_code + "-" + field.name}
                      onChange={this.onValueChange.bind(
                        this,
                        lang.language_code,
                        field.name,
                      )}
                      name={field.name + "_" + lang.language_code}
                      type={field.type}
                      label={field.label}
                      cl={{ lg: 5 }}
                      style={{ width: 400 }}
                      maxLength={field?.maxLength || "256"}
                    />
                  )
                } else {
                  return (
                    <FormInputControl
                      wrapperAlign="start"
                      disabled={this.props.isView || this.state.loading}
                      key={index}
                      id={"trans-" + lang.language_code + "-" + field.name}
                      onChange={this.onValueChange.bind(
                        this,
                        lang.language_code,
                        field.name,
                      )}
                      name={field.name + "_" + lang.language_code}
                      type={field.type}
                      label={field.label}
                      cl={{ lg: 5 }}
                      maxLength={field?.maxLength || "256"}
                    />
                  )
                }
              })}
            </FormHorizontal>
          </div>
        )
      })
    }

    return (
      <div
        className={
          this.state.languages && this.state.languages.length > 0
            ? "translation-form"
            : "d-none"
        }
      >
        <p className="text-sub-header">Translation</p>
        <hr />
        <div className="row">
          <div className="col-xs-12 col-sm-4 col-md-4 col-lg-2 translation-tab-container">
            <button
              type="button"
              className="btn btn-default dropdown-toggle btn-block shadow grey"
              onClick={this.togglePills.bind(this)}
            >
              <span className="text-label-input">
                {this.state.currentLanguage}
              </span>
              <img
                src={arrowdownIcon}
                alt="ic-select"
                className={`ic-select ${showList ? "ic-select-up" : null}`}
              />
            </button>
            <div
              className="nav flex-column nav-pills"
              style={this.state.pillStyle}
              id="v-pills-tab"
              role="tablist"
              aria-orientation="vertical"
            >
              {tabPills}
            </div>
          </div>
          <div className="col-xs-12 col-sm-8 col-md-8 col-lg-10 translation-form-content card border">
            <div className="row">
              <div
                className="col-xs-12 col-sm-12 col-md-12 col-lg-6 tab-content card-body-translation"
                id="v-pills-tabContent"
              >
                {tabContents}
              </div>
              <div className="col-lg-6"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
