import { Component } from "react"
import Hints from "assets/icons/hint.svg"

export default class FormInputWrapper extends Component {
  render() {
    const { cl, notes, cr } = this.props
    let col_form_md= cr ? cr.md : cl ? cl.md : 7
    let col_form_lg= cr ? cr.lg : cl ? 12-cl.lg : 8
    return (
      <div className="form-group required row d-flex align-items-center">
        <div className={`col-sm-${cl?.sm||6} col-md-${cl?.md||5} col-lg-${cl?.lg||4} col-form-label`}>
          <span className={`text-label-input ${this.props.required ? "label-required" : ""}`}>
          {this.props.label}
          </span>  
          {this.props.hint ? <img src={Hints} alt="hint" className="ml-1 mb-2" title={this.props.hint}/>: ""}        
          {
            notes 
            ? <p className="label-notes">
              {
              notes.content 
              ? notes.content()
              : <>Recommended Size: 70 x 70 pixels <br/>
              Supported Image: .jpg, .png, .jpeg <br/>
              File Max: 10 KB</>
              }
              
            </p>
            : null
          }
        </div>
        <div className={`form-control-wrapper col-sm-${cl?.sm ? 12 - cl.sm : 6} col-md-${col_form_md} col-lg-${col_form_lg}`}>{this.props.children}</div>
      </div>
    )
  }
}
