import axios from "axios";
import { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";

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

const Comment = (props) => {
  const e = props.comment;
  const [info, setInfo] = useState(e);
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    if (!isEdit) {
      setInfo(e);
    }
  });
  // isEdit이 아닐 때 setInfo에 props.comment를 랜더링해라

  //! 댓글 수정 로직
  const onClickCommentEdit2 = () => {
    axios({
      method: "patch",
      url: `${process.env.REACT_APP_URL}/api/diary/editComment`,
      header: {
        withCredentials: true,
        Authorization: localStorage.getItem("token"),
      },
      data: {
        comment: info.content,
        commentId: info.id,
      },
    }).then((res) => {
      if (res.status === 201) {
        e.content = info.content;
        setIsEdit(false);
      }
    });
  };

  //! 댓글 삭제 로직
  const onClickCommentDelete2 = (id) => {
    axios({
      method: "delete",
      url: `${process.env.REACT_APP_URL}/api/diary/deleteComment`,
      header: {
        withCredentials: true,
        Authorization: localStorage.getItem("token"),
      },
      data: {
        postId: e._diary,
        commentId: id,
      },
    }).then((res) => {
      if (res.status === 200) {
        alert("댓글이 삭제되었습니다.");
        // comment의 id가 내가 삭제할 id가 아니면 filter에서 반환한다.
        // filter는 반환된 것들로 새로운 배열을 만든다.
        props.deleteComment(id);
      }
    });
  };

  return (
    <div className="diaryReaderCommentBox">
      <div className="diaryReaderCommentWriter">{info.writer}</div>
      <div className="diaryReaderCommentContent">
        {isEdit ? (
          <>
            <CssTextField
              sx={{ width: "100%" }}
              label="댓글 작성"
              multiline
              rows={4}
              value={info.content}
              onChange={(c) => {
                setInfo({ ...info, content: c.target.value });
              }}
              variant="filled"
            />
            <div className="comment_button">
              <button
                className="diaryReaderCommentEdit"
                onClick={() => {
                  onClickCommentEdit2();
                  // e.id를 쓴 이유는 고정된 값이기 때문에
                  // 함수의 파라미터값을 받아올 때 고정되어있어야하고
                  // comment는 변경값이기 때문에 e가 붙지 않는다.
                }}
              >
                확인
              </button>
            </div>
          </>
        ) : (
          <div>
            <div className="comment_text">{info.content}</div>
            <div className="comment_button">
              <button
                className="diaryReaderCommentEdit"
                onClick={() => {
                  setIsEdit(true);
                }}
              >
                수정
              </button>
              <button
                className="diaryReaderCommentDelete"
                onClick={() => {
                  onClickCommentDelete2(info.id);
                }}
              >
                삭제
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default Comment;
