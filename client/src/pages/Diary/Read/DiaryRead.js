import React from "react";
import "./diaryRead.scss";
import StarMap from "../../../components/Common/StarMap/StarMap";
import Header from "../../../components/Common/Diary/Header/Header";
import Read from "../../../components/Common/Diary/Read/Read";
import Frame from "../../../components/Common/Frame/Frametitle";

const DiaryRead = () => {
  let metaData = localStorage.getItem("userInfo");
  let userInfo = JSON.parse(metaData);
  return (
    <div className="back">
      <StarMap editClassName={"starMap_wrap_Main"} />
      <Header />
      <Frame
        planetTitle={userInfo.username}
        content={<Read />}
        topTitle={"다이어리"}
      />
    </div>
  );
};

export default DiaryRead;
