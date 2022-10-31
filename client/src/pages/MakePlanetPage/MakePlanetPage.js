import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
import "./MakePlanetPage.scss";
import Headers from "../../components/Common/Diary/Header/Header";
import StarMap from "./StarMap";
import MakePlanetInput from "../../components/Common/MakePlanet/MakePlanetInput";
import MakePlanetSelect from "../../components/Common/MakePlanet/MakePlanetSelect";
import MakePlanetSelectHeader from "../../components/Common/MakePlanet/MakePlanetSelectHeader";
import planet1 from "../../assets/img/Planet/planet1.png";
import planet2 from "../../assets/img/Planet/planet2.png";
import planet3 from "../../assets/img/Planet/planet3.png";
import planet4 from "../../assets/img/Planet/planet4.png";
import MakePlanetMember from "../../components/Common/MakePlanet/MakePlanetMember";
import MakeMember from "../../components/Common/MakePlanet/MakeMember";
import MakeMemberBtn from "../../components/Common/MakePlanet/MakeMemberBtn";
import axios from "axios";
axios.defaults.headers.common["Authorization"] = localStorage.getItem("token");

const MakePlanetPage = () => {
  const [planetName, setplanetName] = useState("");

  const [planetSelect, setplanetSelect] = useState(null);
  const [prevClick, setprevClick] = useState(null);

  const [userId, setuserId] = useState("");

  //! 버튼 클릭시 눌린 버튼 상태 변화
  const GetClick = e => {
    setplanetSelect(e.target.id);
    console.log("출력값:", planetSelect); //출력값이 늦게뜨는이유 , id값으로 데이터를 보낼 수 있는지
  };

  useEffect(
    e => {
      if (planetSelect !== null) {
        let current = document.getElementById(planetSelect);
        console.log(current);
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
  //!

  // const [userId2, setuserId2] = useState("");
  // const [userId3, setuserId3] = useState("");
  // const navigate = useNavigate();

  const handlePlanet = () => {
    if (planetName === "") {
      alert("행성이름은 반드시 입력해주셔야 합니다.");
      return;
    }
    axios({
      url: "http://localhost:8000/api/planet",
      method: "post",
      header: {
        withCredentials: true,
        Authorization: localStorage.getItem("token")
      },
      data: {
        name: planetName,
        member: userId
      }
    })
      .then(res => {
        console.log(res.data);
      })
      .catch(err => console.log(err.response.data));
  };

  return (
    <div>
      <StarMap />
      <Headers />
      <div className="makePlanetSection">
        <div className="makePlanetContainer">
          <MakePlanetInput
            onChange={e => {
              setplanetName(e.target.value);
              console.log(e.target.value);
            }}
          />

          <MakePlanetSelectHeader value={"행성선택"} />
          <div className="planetBox">
            <MakePlanetSelect
              id={1}
              value={planetSelect}
              onClick={GetClick}
              src={planet1}
            />
            <MakePlanetSelect
              id={2}
              value={planetSelect}
              onClick={GetClick}
              src={planet2}
            />
            <MakePlanetSelect
              id={3}
              value={planetSelect}
              onClick={GetClick}
              src={planet3}
            />
            <MakePlanetSelect
              id={4}
              value={planetSelect}
              onClick={GetClick}
              src={planet4}
            />
          </div>
          <MakePlanetSelectHeader value={"행성멤버"} />
          <MakePlanetMember
            text={"멤버1"}
            // value={userID}
            onChange={e => {
              setuserId(e.target.value);
              console.log(e.target.value);
            }}
          />

          <MakePlanetMember
            text={"멤버2"}
            // value={userID}
            onChange={e => {
              // setuserId(e.target.value);
              console.log(e.target.value);
            }}
          />
          <MakePlanetMember
            text={"멤버3"}
            // value={userID}
            onChange={e => {
              // setuserId(e.target.value);
              console.log(e.target.value);
            }}
          />

          <MakeMember sx={{ width: "100%" }} />

          <MakeMemberBtn onClick={handlePlanet} />
        </div>
      </div>
    </div>
  );
};

export default MakePlanetPage;
