import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Diary_main.scss";
import Planet_name from "../../Common/Diary/Planet_name/Planet_name";
import Category from "./Category/Category";
import MemberBox from "./MemberBox/MemberBox";
import Diary_content from "../../Common/Diary/Diary_content/Diary_content";
import IconButton from "@mui/material/IconButton";
import Selector from "./Selector/Selector";
import { FaPen } from "react-icons/fa";
import usePagination from "./Pagination";
import Pagination from "@mui/material/Pagination";

import { Link, useParams } from "react-router-dom";

import $ from "jquery";

import axios from "axios";
import { remove } from "mobx";

const Diary_main = ({ planetTitle }) => {
  const navigate = useNavigate();
  const params = useParams();
  const { planet, category } = params;
  let [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const PER_PAGE = 6;

  const count = Math.ceil(data.length / PER_PAGE);

  const _DATA = usePagination(data, PER_PAGE);

  // *************************************
  $("body").addClass("no_scroll");
  // *************************************

  const handleChange = (e, p) => {
    setPage(p);
    _DATA.jump(p);
  };
  useEffect(() => {
    axios({
      method: "get",
      url: `${process.env.REACT_APP_URL}/api/diary/getPosts/${planet}/${category}`,
      header: {
        withCredentials: true,
        Authorization: localStorage.getItem("token"),
      },
    })
      .then((res) => {
        setData(res.data.diaries);
      })
      .catch((err) => console.log(err.response.data));
  }, []);

  //! 행성삭제
  const Delete_planet_btn = () => {
    let metaData = localStorage.getItem("userInfo");
    let userInfo = JSON.parse(metaData);
    axios({
      method: "delete",
      url: `${process.env.REACT_APP_URL}/api/planet/${userInfo.userID}/${planet}`,
      header: {
        withCredentials: true,
      },
    }).then((res) => {
      console.log(res);
      navigate("/workspace/main");
    });
  };

  return (
    <>
      <div className="writeButton">
        <Link to={`/diary/write/${planet}/${category}`}>
          <IconButton>
            <FaPen />
          </IconButton>
        </Link>
      </div>
      <div className="Main_box">
        <div className="Diary_main_box">
          {_DATA.currentData().map((e, i) => {
            console.log(e);
            return (
              <Link to={`/diary/read/${planet}/${category}/${e._id}`}>
                <Diary_content
                  key={i}
                  title={e.title}
                  date={e.createdAt}
                  writer={e._user.username}
                  content={e.content}
                />
              </Link>
            );
          })}
        </div>{" "}
        <div className="bottom_div">
          <Pagination
            count={count}
            size="large"
            page={page}
            color="secondary"
            shape="rounded"
            onChange={handleChange}
            sx={{
              ul: { justifyContent: "center" },
            }}
          />

          <div className="Delete_planet_box">
            <button className="Delete_planet" onClick={Delete_planet_btn}>
              행성삭제
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Diary_main;
