import React from "react";
import classess from "./Input.module.css";

function Input(props) {
  return (
    <div
      className={`${classess.control} ${
        props.hasError ? classess.invalid : ""
      } ${props.className}`}
    >
      <label htmlFor={props.label}>{props.label}</label>
      <input
        max={props.max}
        id={props.label}
        disabled={props.disabled}
        type={props.type}
        value={props.value}
        onChange={props.onChange}
        onBlur={props.onBlur}
        autoComplete={props.autoComplete}
      />
      {props.hasError && (
        <p className={classess["error-text"]}>{props.error}</p>
      )}
    </div>
  );
}

export default Input;
