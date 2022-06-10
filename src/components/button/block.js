import "./button.css"
import React from "react"

export const BlockButton = ({
  onClick = () => {},
  text = "sign in",
  disabled = false,
  type = "button",
  buttonType = "button-save",
}) => {
  return (
    <button
      className={`btn btn-block mt-4 ${buttonType}`}
      onClick={onClick}
      disabled={disabled}
      type={type}
    >
      <div
        className={
          buttonType === "button-save" || "button-corporate-save"
            ? "text-button-block-white"
            : "text-button-block"
        }
      >
        {text}
      </div>
    </button>
  )
}
