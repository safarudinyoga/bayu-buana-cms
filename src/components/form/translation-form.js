import Api from "config/api"
import $ from "jquery"
import {Component} from "react"
import FormHorizontal from "./horizontal"
import FormInputControl from "./input-control"
import "./translation-form.css"

export default class TranslationForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      pillStyle: {},
      currentLanguage: "",
      languages: [],
      loading: true,
    }

    this.translated = {}
    this.hasTranslated = false
    this.api = new Api()
  }

  componentDidMount() {
    this.api
      .get("/master/languages", {size: 50, sort: "-language_name"})
      .then((res) => {
        this.setState({languages: res.data.items})
        if (res.data.items.length > 0) {
          this.setState({
            currentLanguage: res.data.items[0].language_name,
          })
        }
      })
      .finally(() => {
        this.setState({loading: false})
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
      this.hasTranslated = true
      if (this.props.fields) {
        for (let i in this.props.translations) {
          let item = this.props.translations[i]
          for (let a in this.props.fields) {
            let field = this.props.fields[a]
            let inputId = "trans-" + item.language_code + "-" + field.name
            try {
              document.getElementById(inputId).value = item[field.name] || ""
            } catch (e) { }
          }
        }
      }
    }
  }

  togglePills() {
    let display = this.state.pillStyle.display === "flex" ? "none" : "flex"
    this.setState({
      pillStyle: {display: display},
    })
  }

  onSelected(e) {
    this.setState({
      currentLanguage: e.target.innerText,
    })
  }

  onValueChange(lang, name, e) {
    if (!this.translated[lang]) {
      this.translated[lang] = {language_code: lang}
    }
    this.translated[lang][name] = e.target.value
    console.log(this.translated)
  }

  getKeyByValue(object, value) {
    return Object.keys(object).find((key) => object[key] === value)
  }

  render() {
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
              {lang.language_code in this.translated ? (
                ""
              ) : (
                <i className="fas fa-exclamation-triangle" style={{color: 'red'}}></i>
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
                return (
                  <FormInputControl
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
                    cl={{lg:2}}
                    maxLength="256"
                  />
                )
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
              className="btn btn-default dropdown-toggle btn-block shadow"
              onClick={this.togglePills.bind(this)}
            >
              <span className="text-label-input">
                {this.state.currentLanguage}
              </span>
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
          <div className="col-xs-12 col-sm-8 col-md-8 col-lg-10 translation-form-content card border shadow-none">
            <div className="tab-content card-body-translation" id="v-pills-tabContent">
              {tabContents}
            </div>
          </div>
        </div>
      </div>
    )
  }
}
