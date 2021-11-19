import "./button.css"
const {Component} = require("react")

export default class CancelButton extends Component {
  render() {
    const readOnlyClass = this.props.isView ? "" : ""
    return (
      <button
        onClick={this.props.onClick}
        type="button"
        className={"button-cancel" + readOnlyClass}
      >
        <div className="text-button-cancel">{this.props.isView ? "BACK" : "CANCEL"}</div>
      </button>
    )
  }
}
