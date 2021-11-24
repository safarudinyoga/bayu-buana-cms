import "./button.css";
const {Component} = require("react")

const SaveButton = (props) => {
  return (
    <button type="submit" className="button-save mr-2" {...props}>
      <div className="text-button-save">{props.id == undefined ? 'Create' : 'Update'}</div>
    </button>
  )
}

export default SaveButton
