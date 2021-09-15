import React from "react";
import clasess from "./Button.module.css";

const Button = (props) => {
  return (
    <button
      className={clasess.button}
      type={props.type || "button"}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};

export default Button;
