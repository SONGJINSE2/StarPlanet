import React from "react";
import "./button.scss";

const Button = ({ text, mode }) => {
  return (
    <div className="landing_btn_wrapper">
      <button
        className={"landing_btn " + (mode === "isRegister" ? "isRegister" : "")}
        value={text}
      >
        {text}
      </button>
    </div>
  );
};

export default Button;
