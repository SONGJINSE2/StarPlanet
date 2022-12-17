import React from "react";
import "./frametitle.scss";
import Planet_name from "../Diary/Planet_name/Planet_name";
import Category from "../Diary/Category/Category";
import MemberBox from "../Diary/MemberBox/MemberBox";

const Frame = ({ planetTitle, content, topTitle }) => {
  return (
    <div className="mainContainer">
      <div className="mainWrapperLeft">
        <div className="mainLeftTop">
          <Planet_name title={planetTitle} />
        </div>
        <div className="mainLeftBottom">
          <Category
            sx={{
              width: "100%",
              maxWidth: "40rem",
              bgcolor: "background.paper",
            }}
          />
          <div>
            <MemberBox />
          </div>
        </div>
      </div>
      <div className="mainWrapperRight">
        <div className="mainRightTop">
          <div className="mainRightTop_content">
            <Planet_name title={topTitle} />
          </div>
        </div>
        <div className="mainRightBottom">
          <div className="contentWrapper">{content}</div>
        </div>
      </div>
    </div>
  );
};

export default Frame;
