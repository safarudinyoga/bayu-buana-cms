import { Component } from "react"

export default class FormInputWrapper extends Component {
  render() {
    return (
      <div className="form-group row">
        <label className={"col-sm-"+(this.props.cl||3)+" col-form-label"}>
        {this.props.label}
        {this.props.hint ? <i className="fa fa-info-circle hint" title={this.props.hint}></i>: ""}
        </label>
        <div className={"form-control-wrapper col-sm-"+(this.props.cr||6)}>{this.props.children}</div>
      </div>
    )
  }
}
