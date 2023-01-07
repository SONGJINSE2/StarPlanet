import React, { useState } from "react";
import "./ModifyPage.scss";
import StarMap from "../../components/Common/StarMap/StarMap";
import Main_Logo from "../../assets/img/LandingPage/logo_main.svg";
import ModifyInput from "../../components/Common/ModifyInfo/ModifyInput";
import ModifyHeader from "../../components/Common/ModifyInfo/ModifyHeader";
import ModifyButton from "../../components/Common/ModifyInfo/ModifyButton";
import axios from "axios";
axios.defaults.headers.common["Authorization"] = localStorage.getItem("token");

const ModifyPage = () => {
  const [userID, setuserID] = useState("data.userID");
  const [username, setusername] = useState("data.username");
  const [email, setEmail] = useState("data.email");

  const confirmModify = () => {
    axios({
      method: "post",
      url: process.env.REACT_APP_URL + "/api/user/",
      headers: { withCredentials: true },
      data: {
        userID: userID,
        email: email,
        username: username,
      },
    }).then((res) => console.log(res.data));
  };

  return (
    <div>
      <StarMap editClassName={"starMap_wrap_Main"} />
      <div className="modifyLogoWrapper">
        <img src={Main_Logo} />
      </div>

      <div className="modifyWrapper">
        <div className="modifySection">
          <div className="modifyTextBox">
            <ModifyHeader text={"회원정보변경"} />
            <div className="modifyTitle">가입 시 입력한 회원정보를</div>
            <div className="modifyTitle">다시 한번 확인해주세요.</div>
            <ModifyInput
              text={"ID"}
              type={"text"}
              value={userID}
              onChange={(e) => {
                setuserID(e.target.value);
              }}
              disabled={"true"}
            />
            <ModifyInput
              text={"Name"}
              type={"text"}
              value={username}
              onChange={(e) => {
                setusername(e.target.value);
              }}
              disabled={"true"}
            />
            <ModifyInput
              text={"E-mail"}
              type={"text"}
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />

            <div className="modifyButtonBox">
              <ModifyButton text={"수정"} onClick={confirmModify} />
              <ModifyButton text={"회원탈퇴"} color={"error"} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModifyPage;
