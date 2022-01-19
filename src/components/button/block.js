import "./button.css"
import React from "react"

export const BlockButton = ({
    onClick = () => {},
    text = "sign in",
    disabled =  false,
    type = "button"
}) => {
    return (
    <button 
        className=" btn btn-block button-save mt-4"
        onClick={onClick}
        disabled={disabled}
        type={type}
    >
        <div className="text-button-block">{text}</div>
    </button>
    )
}