import { Component } from "react"

export default class FormInputWrapper extends Component {
  render() {
    return (
      <div className="form-group required row">
        <span className={"text-label-input col-sm-6 col-md-"+(this.props.cl||5)+" col-lg-5 col-form-label " + (this.props.labelRequired)}>
        {this.props.label}
        {this.props.hint ? <i className="fa fa-info-circle hint" title={this.props.hint}></i>: ""}
        </span>
        <div className={"form-control-wrapper col-md-"+(this.props.cl||7)+" col-md-7 col-lg-7"}>{this.props.children}</div>
      </div>
    )
  }
}
