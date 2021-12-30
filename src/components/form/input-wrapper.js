import { Component } from "react"
import Hints from "assets/icons/hint.svg"

export default class FormInputWrapper extends Component {
  render() {
    const { cl } = this.props
    return (
      <div className="form-group required row d-flex align-items-center">
        <span className={`text-label-input col-sm-${cl?.sm||6} col-md-${cl?.md||5} col-lg-${cl?.lg||4} col-form-label ${this.props.required ? "label-required" : ""}`}>
        {this.props.label}
        {this.props.hint ? <img src={Hints} alt="hint" className="ml-1 mb-2" title={this.props.hint}/>: ""}        
        </span>        
        <div className={`form-control-wrapper col-sm-${cl?.sm ? 12 - cl.sm : 6} col-md-${cl?.md||7} col-lg-${cl?.lg ? 12 - cl.lg : 8}`}>{this.props.children}</div>
      </div>
    )
  }
}
