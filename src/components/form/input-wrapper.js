import { Component } from "react"

export default class FormInputWrapper extends Component {
  render() {
    return (
      <div className="form-group required row">
        <span className={"text-label-input col-sm-"+(this.props.cl||3)+" col-form-label" +" "+(this.props.lebelRequired)}>
        {this.props.label}
        {this.props.hint ? <i className="fa fa-info-circle hint" title={this.props.hint}></i>: ""}
        </span>
        <div className={"form-control-wrapper col-sm-"+(this.props.cr||6)}>{this.props.children}</div>
      </div>
    )
  }
}
