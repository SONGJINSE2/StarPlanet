import React, { useState } from "react";
import "./ResetPw2PwInput2.scss";

const ResetPw2PwInput2 = ({ value, onChange }) => {
  return (
    <>
      <div className="resetPw2PwInput2Container">
        <div className="pw2InputTitle">PW</div>
        <input
          type="password"
          placeholder="비밀번호를 입력해주세요"
          value={value}
          onChange={onChange}
          className="pw2Input"
          required
        ></input>
      </div>
    </>
  );
};

export default ResetPw2PwInput2;
