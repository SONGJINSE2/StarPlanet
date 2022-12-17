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
import IconButton from "@mui/material/IconButton";

// 아이콘
import Avatar from "@mui/material/Avatar";
import { FaPlay } from "react-icons/fa";
import { AiTwotoneEdit, AiTwotoneDelete } from "react-icons/ai";
import axios from "axios";

import { useParams, useNavigate } from "react-router-dom";
import Modify from "../Modify/Modify";
import Comment from "./Comment";
import { alertClasses } from "@mui/material";

const CssTextField = styled(TextField)({
  "& label.Mui-focused": {
    color: "#3c52b2",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "#3c52b2",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "red",
    },
    "&:hover fieldset": {
      borderColor: "yellow",
    },
    "&.Mui-focused fieldset": {
      borderColor: "green",
    },
  },
});

const Read = () => {
  const navigate = useNavigate();
  const params = useParams();
  // 파라미터

  const { planet, category, postId } = params;
  // 댓글 input 값
  const [commentValue, setCommentValue] = useState("");
  const [isEdit, setIsEdit] = useState(false);

  // axios 데이터
  const [data, setData] = useState({
    post: {},
    comment: [],
    writer: "",
  });
  const [post, setPost] = useState({});
  const [comments, setComments] = useState([]);
  let userInfo = localStorage.getItem("userInfo");
  let arr = JSON.parse(userInfo);
  const parse = require("html-react-parser");

  useEffect(() => {
    axios({
      method: "get",
      url: `${process.env.REACT_APP_URL}/api/diary/getPost/${postId}`,
      header: {
        withCredentials: true,
        Authorization: localStorage.getItem("token"),
      },
    }).then((res) => {
      setPost(res.data.post);
      setComments(res.data.comments);
      console.log(res.data);
    });
  }, []);

  useEffect(() => {
    setIsEdit(false);
  }, [post]);

  const handleChange = (e) => {
    setCommentValue(e.target.value);
  };

  //! 댓글 작성 로직
  const onClickCommentWrite = () => {
    axios({
      method: "post",
      url: `${process.env.REACT_APP_URL}/api/diary/postComment`,
      header: {
        withCredentials: true,
        Authorization: localStorage.getItem("token"),
      },
      data: {
        postId: postId,
        comment: commentValue,
        writer: arr.username,
      },
    }).then((res) => {
      if (res.status === 201) {
        setComments([...comments, res.data.commentInfo]);
        setCommentValue("");
      }
    });
  };

  //! 댓글 삭제 로직
  const deleteComment = (id) => {
    let newComments = comments.filter((e) => e.id != id);
    console.log(newComments);
    setComments(newComments);
  };

  //! 게시글 삭제 로직
  const onClickPostDelete = () => {
    axios({
      method: "delete",
      url: `${process.env.REACT_APP_URL}/api/diary/deletePost`,
      header: {
        withCredentials: true,
        Authorization: localStorage.getItem("token"),
      },
      data: {
        postId: postId,
      },
    }).then((res) => {
      console.log(res);
      navigate(`/diary/main/${planet}/${category}`);
    });
  };

  //! 게시글 수정 로직
  const onClickPostEdit = () => {
    setIsEdit(true);
  };

  return (
    <div className="mainBackWrapper">
      <div className="mainWrapper">
        <div className="Main_container">
          {!isEdit ? (
            <div className="Main_box">
              <div className="diaryReaderWrapper">
                {/* 맨위 */}
                <div className="diaryReaderTopContainer">
                  <div className="diaryReaderChoiced">{category}</div>
                  <div className="diaryReaderTitle">{post.title}</div>
                </div>
                {/* 작성자 */}
                <div className="diaryReaderWriterWrapper">
                  <ListItem sx={{ paddingLeft: "0" }}>
                    <ListItemIcon sx={{ minWidth: "40px" }}>
                      <Avatar sx={{ width: 30, height: 30 }} />
                    </ListItemIcon>
                    <ListItemText primary={post?._user?.username} />
                  </ListItem>
                  <span>
                    <IconButton onClick={onClickPostEdit} component="label">
                      <AiTwotoneEdit />
                    </IconButton>
                    <IconButton onClick={onClickPostDelete} component="label">
                      <AiTwotoneDelete />
                    </IconButton>
                  </span>
                </div>
                <div className="diaryReaderContent">
                  {/* string to html */}
                  {parse(post.content ? post.content : "")}
                </div>
                <div className="diaryReaderCommentWrapper">
                  <div className="diaryReaderCommentTitle">수다수다</div>
                  <div className="diaryReaderCommentContainer">
                    {/* 댓글 */}
                    {/* 댓글 작성 로직 작성 후 수정 */}
                    {comments?.map((e) => {
                      return (
                        <Comment comment={e} deleteComment={deleteComment} />
                      );
                    })}
                    {/* comments값을 map돌린 값을 Comment컴퍼넌트에 props 값으로 보낸다 */}
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
                          color: "#3c52b2",
                        },
                      }}
                      variant="contained"
                      endIcon={<FaPlay />}
                      onClick={onClickCommentWrite}
                    >
                      댓글등록
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <Modify post={post} setPost={setPost} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Read;
