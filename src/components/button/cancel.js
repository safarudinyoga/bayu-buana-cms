const { Component } = require("react")

export default class CancelButton extends Component {
  render() {
    const readOnlyClass = this.props.isView ? "bg-dark-grey text-white" : ""
    return (
      <button
        onClick={this.props.onClick}
        type="button"
        className={"btn btn-default bg-white border-dark-grey " + readOnlyClass}
      >
        {this.props.isView ? "BACK" : "CANCEL"}
      </button>
    )
  }
}
