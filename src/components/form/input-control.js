import React, { Component } from "react"
import FormInputWrapper from "./input-wrapper"
import FormInput from "./input"

export default class FormInputControl extends Component {
  constructor(props) {
    super(props)
    this.input = React.createRef()
  }

  getInput() {
    let input = null
    try {
      input = this.input.current.getInput()
    } catch (e) {}
    return input
  }

  render() {
    return (
      <FormInputWrapper
        label={this.props.label}
        labelRequired={this.props.labelRequired}
        hint={this.props.hint}        
        cl={this.props.cl}
        cr={this.props.cr}
      >
        <FormInput ref={this.input} {...this.props} />
      </FormInputWrapper>
    )
  }
}
