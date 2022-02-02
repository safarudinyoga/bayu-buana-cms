import React, {Component} from "react"
import {withRouter} from "react-router"
import FormAlert from "./alert"
import FormContainer from "./container"
import MediaForm from "./media-form"
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
        txtsave={this.props.txtSave}
        txtback={this.props.txtBack}
        id={this.props.id}
      >
        <FormWrapper>{this.props.children}</FormWrapper>
        {this.props.showMedia && 
          <MediaForm 
            doUpload={this.props.uploadMedia} 
            data={this.props.mediaData} 
            isView={this.props.isView}
            moduleName={this.props.moduleName}
          />
          }
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
