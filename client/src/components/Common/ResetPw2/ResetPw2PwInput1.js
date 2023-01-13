import React from "react";
import "./ResetPw2PwInput1.scss";

const ResetPw2PwInput1 = ({ value, onChange }) => {
  return (
    <>
      <div className="resetPw2PwInput1Container">
        <div className="pw1InputTitle">PW</div>
        <input
          type="password"
          placeholder="비밀번호를 입력해주세요"
          value={value}
          onChange={onChange}
          className="pw1Input"
          required
        ></input>
      </div>
    </>
  );
};

export default ResetPw2PwInput1;
