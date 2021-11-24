import React, { Component } from "react"
import SaveButton from "components/button/save"
import CancelButton from "components/button/cancel"
import $ from "jquery"
import "admin-lte/plugins/jquery-validation/jquery.validate"
import "admin-lte/plugins/jquery-validation/additional-methods"

export default class FormContainer extends Component {
  constructor(props) {
    super(props)
    this.form = React.createRef()
    this.validator = null
  }

  componentDidMount() {
    this.validator = this.validate()
    $.validator.addMethod(
      "noSpace",
      function (value, element) {
        return value.indexOf(" ") < 0
      },
      "No space please and don't leave it empty",
    )
  }

  componentDidUpdate() {}

  componentWillUnmount() {
    if (this.validator) {
      try {
        this.validator.destroy()
      } catch (e) {}
    }
  }

  validate() {
    return $(this.form.current).validate({
      rules: this.props.rules || {},
      messages: this.props.validationMessages || {},
      errorElement: "span",
      errorPlacement: function (error, element) {
        error.addClass("invalid-feedback")
        element.closest(".form-control-wrapper").append(error)
      },
      highlight: function (element, errorClass, validClass) {
        $(element).addClass("is-invalid")
      },
      unhighlight: function (element, errorClass, validClass) {
        $(element).removeClass("is-invalid")
      },
      submitHandler: (e) => {
        this.onSubmit(e)
      },
    })
  }

  onSubmit(e) {
    try {
      e.preventDefault()
    } catch (e) {}

    if (this.props.onSave) {
      this.props.onSave()
    }

    return false
  }

  render() {
    //   onSubmit={this.onSubmit.bind(this)}
    return (
      <form
        id={this.props.id}
        ref={this.form}
        method="post"
        className={
          this.props.isView ? "container-fluid view-only" : "container-fluid"
        }
      >
        <div className="card card-default border">
          <div className="card-body">{this.props.children}</div>
          <hr className="mx-4" />
          <div className="p-4">
            {this.props.isView ? "" : <SaveButton />}
            <CancelButton
              isView={this.props.isView}
              onClick={this.props.onBack}
            />
          </div>
        </div>
      </form>
    )
  }
}
