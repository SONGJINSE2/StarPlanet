import React, { useState } from "react";
import "./SignUpPwInput.scss";

const SignUpPwInput = ({ value, onChange }) => {
  const [hashedPW, setPw] = useState("");
  const [pwCheck, setPwCheck] = useState("");
  const [pwError, setPwError] = useState(false);

  const onChangePwChk = (e) => {
    setPwError(e.target.value !== value);
    setPwCheck(e.target.value);
  };

  return (
    <>
      <div className="signUpPwInputContainer">
        <div className="signUpPwInputTitle">PW</div>
        <input
          className="signUpPwInput"
          type="password"
          placeholder="사용하실 비밀번호를 입력하세요"
          value={value}
          onChange={onChange}
          required
        ></input>
      </div>
      <div>
        {pwError ? (
          <div className="errorMessageWrap">비밀번호가 일치하지 않습니다.</div>
        ) : (
          <div className="errorMessageWrap">{""}</div>
        )}
      </div>
      <div className="signUpPwInputContainer">
        <div className="signUpPwInputTitle">PW Confirm</div>
        <input
          className="signUpPwInput"
          type="password"
          required
          placeholder="사용하실 비밀번호를 입력하세요"
          value={pwCheck}
          onChange={onChangePwChk}
        ></input>
      </div>
      <div>
        {pwError ? (
          <div className="errorMessageWrap">비밀번호가 일치하지 않습니다.</div>
        ) : (
          <div className="errorMessageWrap">{""}</div>
        )}
      </div>
    </>
  );
};

export default SignUpPwInput;
