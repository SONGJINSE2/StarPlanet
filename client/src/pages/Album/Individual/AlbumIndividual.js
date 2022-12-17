import React from "react";
import "./albumIndividual.scss";

import StarMap from "../../../components/Common/StarMap/StarMap";
import Header from "../../../components/Common/Diary/Header/Header";
import Frame from "../../../components/Common/Frame/Frametitle";
import AlbumMain from "../../../components/Common/Album/AlbumIndividualMode/AlbumIndividualMode";

const AlbumIndividual = () => {
  let metaData = localStorage.getItem("userInfo");
  let userInfo = JSON.parse(metaData);
  return (
    <div className="back">
      <StarMap />
      <Header />
      <Frame
        planetTitle={userInfo.username}
        content={<AlbumMain />}
        topTitle={"사진첩"}
      />
    </div>
  );
};

export default AlbumIndividual;
