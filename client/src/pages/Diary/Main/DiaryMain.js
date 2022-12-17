import React, { useState } from "react";
import "./diaryMain.scss";

import Frame from "../../../components/Common/Frame/Frametitle";
import StarMap from "../../../components/Common/StarMap/StarMap";
import Header from "../../../components/Common/Diary/Header/Header";
import Diary_main from "../../../components/Common/Diary/Diary_main";

const DiaryMain = () => {
  let metaData = localStorage.getItem("userInfo");
  let userInfo = JSON.parse(metaData);
  return (
    <div className="back">
      <StarMap editClassName={"starMap_wrap_Main"} />
      <Header />
      <Frame
        planetTitle={userInfo.username}
        content={<Diary_main />}
        topTitle={"다이어리"}
      />
    </div>
  );
};

export default DiaryMain;
