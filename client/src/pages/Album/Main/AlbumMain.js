import React from "react";
import "./albumMain.scss";

// 컴포넌트
import StarMap from "../../../components/Common/StarMap/StarMap";
import Header from "../../../components/Common/Diary/Header/Header";
import Frame from "../../../components/Common/Frame/Frametitle";
import Main from "../../../components/Common/Album/Main/Main";

const AlbumMain = () => {
  let metaData = localStorage.getItem("userInfo");
  let userInfo = JSON.parse(metaData);
  return (
    <div className="back">
      <StarMap editClassName={"starMap_wrap_Main"} />
      <Header />
      <Frame
        planetTitle={userInfo.username}
        content={<Main />}
        topTitle={"사진첩"}
      />
    </div>
  );
};

export default AlbumMain;
