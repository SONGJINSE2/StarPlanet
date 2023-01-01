import React, { useState } from "react";
import "./FindIdNameInput.scss";

const FindIdNameInput = ({ value, onChange }) => {
  const [username, setUsername] = useState("");

  return (
    <>
      <div className="findIdNameInputContainer">
        <div className="findIdNameInputTitle">Name</div>
        <input
          className="findIdNameInput"
          placeholder="이름을 입력해주세요"
          value={value}
          onChange={onChange}
          type="text"
        ></input>
      </div>
      <div>
        {username ? (
          <div className="errorMessageWrap">{""}</div>
        ) : (
          <div className="errorMessageWrap">{""}</div>
        )}
      </div>
    </>
  );
};

export default FindIdNameInput;
