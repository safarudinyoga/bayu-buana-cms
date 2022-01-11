import "./button.css"
import React from "react"

export const BlockButton = (props) => {
    return (
    <button 
        className=" btn btn-block button-save mt-4"
        onClick={props.onClick}
    >
        <div className="text-button-block">{props.text}</div>
    </button>
    )
}