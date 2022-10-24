import React, { useEffect } from "react";
import "./SignUpPage.scss";
import StarMap from "../../components/Common/StarMap/StarMap";
import Main_Logo from "../../assets/img/LandingPage/logo_main.svg";
import SignUpHeader from "../../components/Common/SignUp/SignUpHeader";
import IdInput from "../../components/Common/SignUp/IdInput";
import PwInput from "../../components/Common/SignUp/PwInput";
import NameInput from "../../components/Common/SignUp/NameInput";
import EmailInput from "../../components/Common/SignUp/EmailInput";
import Button from "../../components/Common/SignUp/Button";
import axios from "axios";

const SignUpPage = () => {
  const sesac = () => {
    axios
      .post("http://localhost:8000/api/user")
      .then((res) => console.log(res.data));
  };
  return (
    <div>
      <StarMap />
      <div className="signUpLogoWrapper">
        <img src={Main_Logo} />
      </div>
      <div className="signUpWrapper">
        <div className="signUpSection">
          <div className="signUp">
            <SignUpHeader text={"회원가입"} />
            <IdInput />
            <PwInput />
            <NameInput />
            <EmailInput />
            <Button onClick={() => {}} text={"회원가입"} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
