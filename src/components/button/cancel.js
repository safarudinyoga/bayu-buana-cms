import "./button.css"
const {Component} = require("react")

export default class CancelButton extends Component {
  render() {
    const readOnlyClass = this.props.isView ? "button-save" : "button-cancel"
    const readClass = this.props.isView ? "text-button-save" : "text-button-cancel"
    return (
      <button
        onClick={this.props.onClick}
        type="button"
        className={readOnlyClass}
      >
        <div className={readClass}>{this.props.isView ? "BACK" : "Cancel"}</div>
      </button>
    )
  }
}