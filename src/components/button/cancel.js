import "./button.css"
const { Component } = require("react")

export default class CancelButton extends Component {
  render() {
    const readOnlyClass = this.props.isView ? "bg-dark-grey text-white" : ""
    return (
      <button
        onClick={this.props.onClick}
        type="button"
        className={"button-cancel" + readOnlyClass}
      >
        <div className="text-button-cancel">{this.props.isView ? "Back" : "CANCEL"}</div>
      </button>
    )
  }
}
