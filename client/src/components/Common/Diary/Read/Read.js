import React, { useState, useEffect, useCallback } from "react";
import "./read.scss";

import Planet_name from "../Planet_name/Planet_name";
import Category from "../Category/Category";
import MemberBox from "../MemberBox/MemberBox";

import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListItem from "@mui/material/ListItem";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { alpha, styled } from "@mui/material/styles";

// 아이콘
import Avatar from "@mui/material/Avatar";
import { FaPlay } from "react-icons/fa";
import axios from "axios";
// MOCK 데이터
import DATA from "./data.js";

const CssTextField = styled(TextField)({
  "& label.Mui-focused": {
    color: "#3c52b2"
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "#3c52b2"
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "red"
    },
    "&:hover fieldset": {
      borderColor: "yellow"
    },
    "&.Mui-focused fieldset": {
      borderColor: "green"
    }
  }
});

const Read = ({ planetTitle }) => {
  const [commentValue, setCommentValue] = useState("");
  const [post, setPost] = useState([]);
  // 기본 값 1로 설정
  const [postNum, setPostNum] = useState(1);
  const parse = require("html-react-parser");

  useEffect(() => {
    // todo
    // url 파라미터에서 다이어리 번호 받아오기

    async function getPost(postNum) {
      // 글의 ID 번호를 파라미터로 전달하여 카테고리를 받는다.
      await axios({
        method: "get",
        url: `/diary/getPost/${postNum}`,
        header: {
          withCredentials: true,
          Authorization: localStorage.getItem("token")
        }
      })
        .then(res => {
          // 데이터를 어떻게 받아올지?
          setPost(res.data);
        })
        .catch(err => console.log(err.response.data));
    }
    // 함수 실행 및 글 가져오기
    getPost(1);
    var htmlObject = document.createElement("div");
    htmlObject.innerHTML = DATA.content;
  });

  const handleChange = e => {
    setCommentValue(e.target.value);
  };

  const onClickCommentWrite = () => {
    axios({
      method: "post",
      url: `/diary/PostComment/${postNum}`,
      header: {
        withCredentials: true,
        Authorization: localStorage.getItem("token")
      },
      data: {
        // 작성자는 jwt 처리하는지?
        writer: ""
      }
    });
  };

  return (
    <div className="mainBackWrapper">
      <div className="mainWrapper">
        <div className="mainArrow" />
        <div className="MainContainerTop">
          <div className="Planet_name_box">
            <Planet_name title={"2022"} />
          </div>
          <div className="Modify_title_box">
            <Planet_name title={"2022"} />
          </div>
        </div>
        <div className="Main_container">
          {/* 왼쪽 메뉴바 */}
          <div className="Categorybar_box">
            <div>
              <Category />
            </div>
            <div>
              <MemberBox />
            </div>
          </div>
          {/* 메인 컨텐츠 */}
          <div className="Main_box">
            <div className="diaryReaderWrapper">
              {/* 맨위 */}
              <div className="diaryReaderTopContainer">
                <div className="diaryReaderChoiced">
                  {DATA.post.category}
                </div>
                <div className="diaryReaderTitle">
                  {DATA.post.title}
                </div>
              </div>
              {/* 작성자 */}
              <div className="diaryReaderWriterWrapper">
                <ListItem sx={{ paddingLeft: "0" }}>
                  <ListItemIcon sx={{ minWidth: "40px" }}>
                    <Avatar sx={{ width: 30, height: 30 }} />
                  </ListItemIcon>
                  <ListItemText primary={DATA.post.writer} />
                </ListItem>
              </div>
              <div className="diaryReaderContent">
                {/* string to html */}
                {parse(DATA.post.content)}
              </div>
              <div className="diaryReaderCommentWrapper">
                <div className="diaryReaderCommentTitle">수다수다</div>
                <div className="diaryReaderCommentContainer">
                  {/* 댓글 */}
                  {DATA.comment.map(e => {
                    return (
                      <div className="diaryReaderCommentBox">
                        <div className="diaryReaderCommentWriter">
                          {e.writer}
                        </div>
                        <div className="diaryReaderCommentContent">
                          {e.comment}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              {/* 댓글 작성창 */}
              <div className="diaryReaderEditorWrapper">
                <CssTextField
                  sx={{ width: "100%" }}
                  label="댓글 작성"
                  multiline
                  rows={4}
                  value={commentValue}
                  onChange={handleChange}
                  variant="filled"
                />
                <div className="diaryReaderBtnWrapper">
                  <Button
                    sx={{
                      backgroundColor: "#0D0D7E",
                      "&:hover": {
                        backgroundColor: "#fff",
                        color: "#3c52b2"
                      }
                    }}
                    variant="contained"
                    endIcon={<FaPlay />}
                    onClick={onClickCommentWrite}
                  >
                    등록
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Read;
