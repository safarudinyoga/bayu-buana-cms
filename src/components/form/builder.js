import React, {Component} from "react"
import {withRouter} from "react-router"
import FormAlert from "./alert"
import FormContainer from "./container"
import MediaForm from "./Media-form"
import TranslationForm from "./translation-form"
import FormWrapper from "./wrapper"

class FormBuilder extends Component {
  constructor(props) {
    super(props)
    this.translationForm = React.createRef()
  }

  componentDidMount() {
    if (this.props.onBuild) {
      this.props.onBuild(this)
    }
  }

  getTranslations() {
    return this.translationForm.current.translated
  }

  onBack() {
    if (this.props.back) {
      this.props.history.push(this.props.back)
    }
  }

  render() {
    return (
      <FormContainer
        rules={this.props.rules}
        validationMessages={this.props.validationMessages}
        isView={this.props.isView}
        onSave={this.props.onSave}
        onBack={this.onBack.bind(this)}
        id={this.props.match.params.id}
      >
        <FormWrapper>{this.props.children}</FormWrapper>
        {this.props.showMedia && <MediaForm/>}
        <TranslationForm
          ref={this.translationForm}
          translations={this.props.translations}
          isView={this.props.isView}
          fields={this.props.translationFields}
        />
        <FormAlert
          isValid={this.props.isValid}
          message={this.props.alertMessage}
        />
      </FormContainer>
    )
  }
}

export default withRouter(FormBuilder)
