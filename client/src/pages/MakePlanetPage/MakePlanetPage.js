import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import "./MakePlanetPage.scss";
import Headers from "../../components/Common/Diary/Header/Header";
import StarMap from "../../components/Common/StarMap/StarMap";
import MakePlanetInput from "../../components/Common/MakePlanet/MakePlanetInput";
import MakePlanetSelect from "../../components/Common/MakePlanet/MakePlanetSelect";
import MakePlanetSelectHeader from "../../components/Common/MakePlanet/MakePlanetSelectHeader";
import Planet1 from "../../assets/img/Planet/planet1.png";
import Planet2 from "../../assets/img/Planet/planet2.png";
import Planet3 from "../../assets/img/Planet/planet3.png";
import Planet4 from "../../assets/img/Planet/planet4.png";
import MakePlanetMember from "../../components/Common/MakePlanet/MakePlanetMember";
import MakeMember from "../../components/Common/MakePlanet/MakeMember";
import MakeMemberBtn from "../../components/Common/MakePlanet/MakeMemberBtn";
import axios from "axios";
import $ from "jquery";
axios.defaults.headers.common["Authorization"] = localStorage.getItem("token");

const MakePlanetPage = () => {
  let metaData = localStorage.getItem("userInfo");
  let userInfo = JSON.parse(metaData);
  const [planetName, setplanetName] = useState("");
  // 멤버 input 관리
  const navigate = useNavigate();
  const [user, setUser] = useState({
    user_1: userInfo.userID,
    user_2: "",
    user_3: "",
    user_4: "",
  });
  const [planetSelect, setplanetSelect] = useState(null);
  const [prevClick, setprevClick] = useState(null);

  // *************************************
  $("body").addClass("no_scroll");
  // *************************************

  //! 버튼 클릭시 눌린 버튼 상태 변화
  const GetClick = (e) => {
    console.log(e.target.id);
    setplanetSelect(e.target.id);
  };

  useEffect(
    (e) => {
      if (planetSelect !== null) {
        let current = document.getElementById(planetSelect);
        current.style.border = "5px solid";
        current.style.borderColor = "red";
      }

      if (prevClick !== null) {
        let prev = document.getElementById(prevClick);
        prev.style.border = "none";
      }
      setprevClick(planetSelect);
    },
    [planetSelect]
  );

  const handlePlanet = () => {
    // 필수 입력 값 if문
    if (planetName === "") {
      alert("행성이름은 반드시 입력해주셔야 합니다.");
      return;
    } else if (planetSelect === null) {
      alert("행성 이미지를 선택해주세요.");
      return;
    }

    if (planetName.includes("?") || planetName.includes(" ")) {
      alert("행성이름에 특수문자 및 띄어쓰기는 사용할 수 없습니다");
      return;
    }

    // userArr 빈 값 제거 배열 생성
    let userArr = [user.user_1, user.user_2, user.user_3, user.user_4].filter(
      function (item) {
        return item !== null && item !== undefined && item !== "";
      }
    );
    // axios 행성 생성
    axios({
      url: process.env.REACT_APP_URL + "/api/planet/create",
      method: "post",
      header: {
        withCredentials: true,
        Authorization: localStorage.getItem("token"),
      },
      data: {
        name: planetName,
        member: userArr,
        select: planetSelect,
      },
    })
      .then((res) => {
        if (res.status === 201) {
          console.log("행성 생성");
        }
      })
      .then(() => {
        navigate("/workspace/main");
      })
      .catch((err) => console.log(err.response.data));
  };

  const cancelPlanet = () => {
    navigate("/workspace/main");
  };

  return (
    <div className="">
      <StarMap editClassName={"starMap_wrap_MakePlanet"} />
      <Headers />
      <div className="makePlanetSection">
        <div className="makePlanetContainer">
          <MakePlanetInput
            onChange={(e) => {
              setplanetName(e.target.value);
            }}
          />

          <MakePlanetSelectHeader value={"행성선택"} />
          <div className="planetBox">
            <MakePlanetSelect
              id="1"
              value={planetSelect}
              onClick={GetClick}
              src={Planet1}
            />
            <MakePlanetSelect
              id="2"
              value={planetSelect}
              onClick={GetClick}
              src={Planet2}
            />
            <MakePlanetSelect
              id="3"
              value={planetSelect}
              onClick={GetClick}
              src={Planet3}
            />
            <MakePlanetSelect
              id="4"
              value={planetSelect}
              onClick={GetClick}
              src={Planet4}
            />
          </div>
          <MakePlanetSelectHeader value={"행성멤버"} />
          <MakePlanetMember
            text={"멤버1"}
            name={user.user_1}
            value={user.user_1}
          />

          <MakePlanetMember
            text={"멤버2"}
            name={user.user_2}
            value={user.user_2}
            onChange={(e) => {
              setUser({ ...user, user_2: e.target.value });
              console.log(user);
            }}
          />
          <MakePlanetMember
            text={"멤버3"}
            name={user.user_3}
            value={user.user_3}
            onChange={(e) => {
              setUser({ ...user, user_3: e.target.value });
            }}
          />
          <MakePlanetMember
            text={"멤버4"}
            name={user.user_4}
            value={user.user_4}
            onChange={(e) => {
              setUser({ ...user, user_4: e.target.value });
            }}
          />
          <div className="MakeMemberBtnBox">
            <MakeMemberBtn onClick={cancelPlanet} title={"취소"} />
            <MakeMemberBtn onClick={handlePlanet} title={"생성"} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MakePlanetPage;
