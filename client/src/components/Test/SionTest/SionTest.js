import React from "react";
import "./sionTest.scss";

import StarMap from "../../Common/StarMap/StarMap";
import StarWarp from "../../Common/StarWarp/StarWarp";
// import Categorybar from "../../Common/Diary/Categorybar/Categorybar";
import Diary_content from "../../Common/Diary/Diary_content/Diary_content";
import Diary_main from "../../Common/Diary/Diary_main";
// import Header from "../../Common/Diary/Header/Header";
import SearchBar from "../../Common/Diary/SearchBar/SearchBar";
import Selector from "../../Common/Diary/Selector/Selector";
import Editor from "../../Common/Editor/Editor";
import Writer from "../../Common/Diary/Writer/Writer";
import Read from "../../Common/Diary/Read/Read";
import AlbumMain from "../../Common/Album/AlbumMain/AlbumMain";
// 페이지
import DiaryMain from "../../../pages/Diary/Main/DiaryMain";
import DiaryWrite from "../../../pages/Diary/Write/DiaryWrite";
// import Main from "../../Common/Album/Main/Main";
import Header from "../../Common/WorkSpace/Header/Header";
import NewPlanetBtn from "../../Common/WorkSpace/NewPlanetBtn/NewPlanetBtn";
import Footer from "../../Common/WorkSpace/Footer/Footer";
import Main from "../../Common/WorkSpace/Main/Main";
const SionTest = () => {
  return (
    <>
      {/* <DiaryMain /> */}
        {/* <AlbumMain /> */}
        <StarMap />
        <Header />

        {/* <NewPlanetBtn/> */}
        <Main/>
        <Footer/>
      {/* <div className="back">
      </div> */}
    </>
  );
};

export default SionTest;
