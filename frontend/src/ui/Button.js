import React from "react";
import styles from "./Button.module.css";

const Button = (props) => {
  const buttonClassess = `${styles.button} + ${props.className}`;
  return (
    <button
      className={buttonClassess}
      disabled={props.disabled}
      type={props.type}
      style={props.style}
      onClick={props.onClick}
    >
      {props.title}
    </button>
  );
};

export default Button;
