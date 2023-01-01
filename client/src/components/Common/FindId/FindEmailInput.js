import React, { useState } from "react";
import "./FindEmailInput.scss";

const FindEmailInput = ({ value, onChange }) => {
  const [email, setEmail] = useState("");
  const [emailValid, setEmailValid] = useState(false);

  const handleEmail = (e) => {
    setEmail(e.target.value);
    console.log(e.target.value);
    const regex =
      /^(([^<>()\[\].,;:\s@"]+(\.[^<>()\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
    if (regex.test(e.target.value)) {
      setEmailValid(true);
    } else {
      setEmailValid(false);
    }
  };

  return (
    <>
      <div className="findIdEmailInputContainer">
        <div className="findIdEmailInputTitle">E-mail</div>
        <input
          className="findIdEmailInput"
          placeholder="test@email.com"
          value={value}
          onChange={(handleEmail, onChange)}
          type="text"
        ></input>
      </div>
      <div>
        {!emailValid && email.length > 0 ? (
          <div className="errorMessageWrap">잘못된 이메일 형식입니다.</div>
        ) : (
          <div className="errorMessageWrap">{""}</div>
        )}
      </div>
    </>
  );
};

export default FindEmailInput;
