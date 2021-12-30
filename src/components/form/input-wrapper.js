import { Component } from "react"

export default class FormInputWrapper extends Component {
  render() {
    const { cl } = this.props
    return (
      <div className="form-group required row d-flex align-items-center">
        <span className={`text-label-input col-sm-${cl?.sm||6} col-md-${cl?.md||5} col-lg-${cl?.lg||4} col-form-label ${this.props.required ? "label-required" : ""}`}>
        {this.props.label}
        {this.props.hint ? <i className="fa fa-info-circle hint" title={this.props.hint}></i>: ""}
        </span>
        <div className={`form-control-wrapper col-sm-${cl?.sm ? 12 - cl.sm : 6} col-md-${cl?.md||7} col-lg-${cl?.lg ? 12 - cl.lg : 8}`}>{this.props.children}</div>
      </div>
    )
  }
}
