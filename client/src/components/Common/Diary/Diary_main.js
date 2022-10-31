import React, { useState, useEffect } from "react";
import "./Diary_main.scss";
import Diary_content from "../../Common/Diary/Diary_content/Diary_content";
import Planet_name from "../../Common/Diary/Planet_name/Planet_name";
import Category from "./Category/Category";
import MemberBox from "./MemberBox/MemberBox";
import Selector from "./Selector/Selector";
import IconButton from "@mui/material/IconButton";
import { FaPen } from "react-icons/fa";

import usePagination from "./Pagination";
import Pagination from "@mui/material/Pagination";
import axios from "axios";

// MOCK 데이터
import DATA from "./data.js";

const Diary_main = ({ planetTitle }) => {
  let [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const PER_PAGE = 6;

  const count = Math.ceil(DATA.length / PER_PAGE);

  // data를 못불러오면 mock데이터 활용
  // skeleton 처리 필요
  const _DATA = usePagination(data.length === 0 ? DATA : data, PER_PAGE);

  const handleChange = (e, p) => {
    setPage(p);
    _DATA.jump(p);
  };
  useEffect(() => {
    axios({
      // 해당 행성에 대한 해당 카테고리의 다이어리들 불러오기
      // 행성과 카테고리 파라미터로 전달
      url: `http://localhost:8000/api/diary/getDiaries/${"planet이름"}/${"카테고리명"}`,
      method: "get",
      header: {
        withCredentials: true,
        Authorization: localStorage.getItem("token")
      }
    })
      .then(res => {
        setData(res.data);
      })
      .catch(err => console.log(err.response.data));
  }, []);

  return (
    <div className="mainBackWrapper">
      <div className="Main_wrapper">
        <div className="mainArrow" />
        <div className="Main_container_top">
          <div className="Planet_name_box">
            <Planet_name title={planetTitle} />
          </div>
          <div className="Modify_title_box">
            <Planet_name title={"2022"} />
            <IconButton>
              <FaPen />
            </IconButton>
          </div>
        </div>
        <div className="Main_container">
          <div className="Categorybar_box">
            <div className="Categorybar_box_list">
              <Category
                sx={{
                  width: "100%",
                  maxWidth: "40rem",
                  bgcolor: "background.paper"
                }}
              />
            </div>
            <div>
              <MemberBox />
            </div>
          </div>
          <div className="Main_box">
            <div className="Diary_selector_box">
              <Selector />
            </div>
            <div className="Diary_main_box">
              {_DATA.currentData().map((e, i) => {
                // console.log(e);
                return (
                  <Diary_content
                    key={i}
                    title={e.title}
                    date={e.date}
                    writer={e.timestamp}
                    content={e.content}
                  />
                );
              })}
              <div className="dairyPaginationWrapper">
                <Pagination
                  count={count}
                  size="large"
                  page={page}
                  color="secondary"
                  shape="rounded"
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Diary_main;
