import "./button.css"
const { Component } = require("react")

export default class SaveButton extends Component {
  render() {
    return (
      <button
        type="submit"
        className="button-save mr-2"
      >
        <div className="text-button-save">SAVE</div>
      </button>
    )
  }
}
