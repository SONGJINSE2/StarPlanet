import React, { useState, useEffect, useCallback } from "react";
import "./category.scss";

// MUI 라이브러리
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";

import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";

// 아이콘
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faImage,
  faCalendarDays,
  faBookmark,
  faBook,
} from "@fortawesome/free-solid-svg-icons";
import { FaList, FaFolder } from "react-icons/fa";

import axios from "axios";

// mobx
import store from "../../../../store/index";
import { observer } from "mobx-react";
import { toJS } from "mobx";
import { useParams, useNavigate } from "react-router-dom";

const Category = observer(({ sx }) => {
  let params = useParams();
  let navigate = useNavigate();
  const { planet, category } = params;
  const { planetClass } = store;

  const [open, setOpen] = useState(true);
  const [open_1, setOpen_1] = useState(true);
  const [open_2, setOpen_2] = useState(true);
  const [diaryCategory, setDiaryCategory] = useState([]);

  useEffect(() => {
    async function getCategory(planetName) {
      // 이름과 행성을 파라미터로 전달하여 카테고리를 받는다.
      await axios({
        method: "get",
        url: `${process.env.REACT_APP_URL}/api/planet/getCategory/${planetName}`,
        header: {
          withCredentials: true,
          Authorization: localStorage.getItem("token"),
        },
      })
        .then((res) => {
          setDiaryCategory(res.data.diary);
        })
        .catch((err) => console.log(err.response.data));
    }
    // 함수 실행 및 카테고리 설정
    getCategory(planet);
  }, []);

  const handleClick = () => {
    setOpen(!open);
  };
  const handleClick_1 = () => {
    setOpen_1(!open_1);
  };
  const handleClick_2 = () => {
    setOpen_2(!open_2);
  };

  return (
    <List sx={sx} component="nav">
      {/* 사진첩 */}
      <ListItemButton
        onClick={() => navigate(`/album/main/${planet}/${category}`)}
      >
        <ListItemIcon
          sx={{ color: "#0D0783", minWidth: "45px", fontSize: "20px" }}
        >
          <FontAwesomeIcon icon={faImage} />
        </ListItemIcon>
        <ListItemText
          primaryTypographyProps={{
            color: "#0D0783",
            fontSize: "15px",
            fontWeight: 500,
          }}
          primary="사진첩"
        />
      </ListItemButton>

      {/* 다이어리 */}
      <List component="div" disablePadding>
        {diaryCategory?.map((e) => {
          return (
            <ListItemButton
              sx={{
                color: "#0D0783",
                minWidth: "45px",
                fontSize: "20px",
              }}
              onClick={() => {
                navigate(`/diary/main/${planet}/${e}`);
              }}
            >
              <ListItemIcon sx={{ color: "#0D0783", minWidth: "30px" }}>
                <FontAwesomeIcon icon={faBook} />
              </ListItemIcon>
              <ListItemText
                primaryTypographyProps={{
                  color: "#0D0783",
                  fontSize: "15px",
                  fontWeight: 500,
                  marginLeft: "10px",
                }}
                primary="다이어리"
              />
            </ListItemButton>
          );
        })}
      </List>
    </List>
  );
});

export default Category;
