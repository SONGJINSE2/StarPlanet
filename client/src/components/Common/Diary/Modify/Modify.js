import React, { useEffect, useState, useCallback } from "react";
import "../Read/read.scss";
// MUI 라이브러리
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
// 에디터
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
// 아이콘
import { FaPlay } from "react-icons/fa";
// MOCK 데이터
import axios from "axios";

const Modify = ({ post, setPost }) => {
  const [titleValue, setTitleValue] = useState(post.title);
  const [contentValue, setContentValue] = useState(post.content);

  const onChangeValue = (e) => {
    setTitleValue(e.target.value);
  };

  // 글 수정 함수
  const onClickPostModify = async () => {
    await axios({
      method: "put",
      url: `${process.env.REACT_APP_URL}/api/diary/${post._id}`,
      header: {
        withCredentials: true,
        Authorization: localStorage.getItem("token"),
      },
      data: {
        // 글의 Object_id와 제목과 글
        title: titleValue,
        content: contentValue,
      },
    })
      .then((res) => {
        // 글 작성 성공시
        if (res.status === 200) {
          alert("글이 수정되었습니다.");
          // setIsEdit(false);

          setPost(res.data.newPost);
        }
      })
      .catch((err) => alert(err.response.data));
  };

  return (
    <div className="Main_box">
      <div className="diaryReaderWrapper">
        <div className="dairyWriterArrow" />
        <div className="diaryReaderTitle">
          <TextField
            sx={{
              width: "100%",
              color: "#3c52b2",
              "& label.Mui-focused": {
                color: "#3c52b2",
              },
              "& .MuiInput-underline:after": {
                borderBottomColor: "#3c52b2",
              },
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "#3c52b2",
                },
                "&:hover fieldset": {
                  borderColor: "#3c52b2",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#3c52b2",
                },
              },
            }}
            rows={1}
            size="small"
            label="제목"
            variant="standard"
            value={titleValue}
            onChange={onChangeValue}
          />
        </div>
        <div className="dairyWriterEditorContainer">
          {/* <Editor /> */}
          <div className="writer_wrapper">
            <CKEditor
              editor={ClassicEditor}
              data={contentValue}
              onReady={(editor) => {
                // You can store the "editor" and use when it is needed.
                // console.log("Editor is ready to use!", editor);
              }}
              onChange={(event, editor) => {
                setContentValue(editor.getData());
              }}
              onBlur={(event, editor) => {
                // console.log("Blur.", editor);
              }}
              onFocus={(event, editor) => {
                // console.log("Focus.", editor);
              }}
            />
          </div>
        </div>

        <div className="BtnBox">
          <Button
            onClick={() => {
              onClickPostModify();
            }}
            sx={{
              backgroundColor: "#0D0D7E",
              "&:hover": {
                backgroundColor: "#fff",
                color: "#3c52b2",
              },
              margin: "5px",
              boxSizing: "border-box",
            }}
            variant="contained"
          >
            수정 완료
          </Button>
          <Button
            onClick={() => {
              setPost({ ...post });
            }}
            sx={{
              backgroundColor: "#0D0D7E",
              "&:hover": {
                backgroundColor: "#fff",
                color: "#3c52b2",
              },
              margin: "5px",
              boxSizing: "border-box",
            }}
            variant="contained"
          >
            취소
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Modify;
