import "./button.css"
const {Component} = require("react")

export default class CancelButton extends Component {
  render() {
    const readOnlyClass = this.props.isView ? "button-cancel" : "button-cancel"
    const readClass = this.props.isView ? "text-button-cancel" : "text-button-cancel"
    return (
      <button
        onClick={this.props.onClick}
        type="button"
        className={readOnlyClass}
      >
        <div className={readClass}>{this.props.isView ? "BACK" : "CANCEL"}</div>
      </button>
    )
  }
}