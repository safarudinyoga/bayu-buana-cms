import "./button.css";
const SaveButton = (props) => {
  return (
    <button type="submit" className="button-save mr-2" {...props}>
      <div className="text-button-save">{props?.txtsave || 'SAVE'}</div>
    </button>
  )
}

export default SaveButton
