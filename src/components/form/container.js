import CancelButton from "components/button/cancel"
import SaveButton from "components/button/save"
import $ from "jquery"
import React, {Component} from "react"
import 'jquery-validation'
// import "admin-lte/plugins/jquery-validation/additional-methods"
// import "admin-lte/plugins/jquery-validation/jquery.validate"
export default class FormContainer extends Component {
  constructor(props) {
    super(props)
    this.form = React.createRef()
    this.validator = null
    this.state = {isValid: false}
  }

  componentDidMount() {
  }

  componentDidUpdate(prevprops) {
    if(prevprops.rules !== this.props.rules) {
      this.validator = this.validate()
      $.validator.addMethod(
        "noSpace",
        function (value, element) {
          return value.trim() === value
        },
        "No space please and don't leave it empty",
      )
    }
  }

  componentWillUnmount() {
    if (this.validator) {
      try {
        this.validator.destroy()
      } catch (e) { }
    }
  }

  validate() {
    return $(this.form.current).validate({
      onkeyup: function(element) {
          var $element = $(element);
          $element.valid();
      },
      rules: this.props.rules || {},
      messages: this.props.validationMessages || {},
      errorElement: "span",
      errorPlacement: function (error, element) {
        error.addClass("invalid-feedback")
        element.closest(".form-control-wrapper").append(error)

        if($("div").hasClass("media-form")) {
          element.closest(".image-wrapper").append(error)
        }
      },
      highlight: function (element, errorClass, validClass) {
        $(element).addClass("is-invalid")
      },
      unhighlight: function (element, errorClass, validClass) {
        $(element).removeClass("is-invalid")
      },
      submitHandler: (e) => {
        var $element = $(e);
        $element.valid();

        if($element.valid()) {
          this.onSubmit(e)
        }
      },
    })
  }

  onSubmit(e) {
    try {
      e.preventDefault()
    } catch (e) { }
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
          this.props.isView ? "container-fluid pl-0 view-only" : "container-fluid pl-0"
        }
      >
        <div className="card card-default border">
          <div className="card-body">{this.props.children}</div>
        </div>
        <div className="mb-5 ml-1 row justify-content-md-start justify-content-center">
          {this.props.isView ? "" : <SaveButton id={this.props.id} txtsave={this.props.txtsave} disabled={this.props.disabledSave} />}
          <CancelButton
            isView={this.props.isView}
            onClick={this.props.onBack}
            txtback={this.props.txtback}
          />
        </div>
      </form>
    )
  }
}
