const { Component } = require("react")

export default class SaveButton extends Component {
  render() {
    return (
      <button
        type="submit"
        className="btn btn-default bg-dark-grey border-dark-grey mr-2"
      >
        SAVE
      </button>
    )
  }
}
