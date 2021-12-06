import React, { Component } from "react"
import FormInputFile from './input-image';

export default class FormInput extends Component {
  constructor(props) {
    super(props)
    this.input = React.createRef()
  }

  getInput() {
    let input = null

    try {
      input = this.input.current
    } catch (e) {}

    return input
  }

  render() {
    switch (this.props.type) {
      case "textarea":
        return (
          <textarea
            ref={this.input}
            className="form-control"
            {...this.props}
          ></textarea>
        )
      case "select":
        return (
          <select ref={this.input} className="form-control" {...this.props}>
            {this.props.children}
          </select>
        )
      case "selectmultiple":
        return (
          <select ref={this.input} className="form-control" {...this.props} multiple="multiple">
            {this.props.children}
          </select>
        )
      case "image":
        return (
          <FormInputFile {...this.props} />
        )
      default:
        return (
          <input ref={this.input} className="form-control" {...this.props} />
        )
    }
  }
}
