import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import "./ModifyPlanet.scss";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import StarBorder from "@mui/icons-material/StarBorder";
import FaceIcon from "@mui/icons-material/Face";
import LanguageIcon from "@mui/icons-material/Language";
import ListIcon from "@mui/icons-material/List";
import store from "../../../store";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  height: 500,
  bgcolor: "background.paper",
  border: 0,
  borderRadius: "15px",
  boxShadow: 24,
  p: 0,
};

export default function BasicModal() {
  let metaData = localStorage.getItem("userInfo");
  let userInfo = JSON.parse(metaData);
  const [open, setOpen] = React.useState(false);
  const [isEdit, setIsEdit] = React.useState(true);
  const [editUserName, setEditUserName] = React.useState(userInfo.username);
  const [editEmail, setEditEmail] = React.useState(userInfo.email);
  const navigate = useNavigate();
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  //! 회원정보수정 로직
  const editHandler = () => {
    let metaData = localStorage.getItem("userInfo");
    let userInfo = JSON.parse(metaData);

    axios({
      method: "patch",
      url: `${process.env.REACT_APP_URL}/api/user`,
      header: {
        withCredentials: true,
        Authorization: localStorage.getItem("token"),
      },
      data: {
        userID: userInfo.userID,
        email: editEmail,
        username: editUserName,
      },
    })
      .then((res) => {
        if (res.status === 201) {
          setIsEdit(true);

          userInfo.username = editUserName;
          localStorage.setItem("userInfo", JSON.stringify(userInfo));
          userInfo.email = editEmail;
          localStorage.setItem("userInfo", JSON.stringify(userInfo));
          console.log("회원정보 수정성공");
          alert("회원정보가 수정되었습니다.");
        }
      })
      .catch((e) => {
        alert("중복된 이름입니다.");
        console.log(e);
      });
  };

  //! 회원탈퇴 로직
  const deleteHandler = () => {
    if (window.confirm("정말로 탈퇴하실건가요..?")) {
      deleteUser();
      alert("회원탈퇴 되셨습니다. 이용해 주셔서 감사합니다.");
      return;
    } else {
      alert("더 나은 서비스로 보답하겠습니다");
    }
  };

  const deleteUser = () => {
    let metaData = localStorage.getItem("userInfo");
    let userInfo = JSON.parse(metaData);
    axios({
      method: "delete",
      url: `${process.env.REACT_APP_URL}/api/user/${userInfo._id}`,
      header: {
        withCredentials: true,
        Authorization: localStorage.getItem("token"),
      },
      data: {
        user: userInfo.userID,
      },
    }).then((res) => {
      if (res.status === 201) {
        console.log("회원탈퇴성공");
        localStorage.removeItem("userInfo");
        localStorage.removeItem("token");
        window.location.href = "/";
      }
    });
  };

  return (
    <div>
      <Button
        onClick={handleOpen}
        sx={{
          color: "black",
          fontSize: "15px",
        }}
      >
        마이페이지
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="modalContainer">
            <div className="modalBox1">마이페이지</div>
            <div className="modalBox2">
              <div className="modalBox3">
                <List
                  sx={{
                    height: "100%",
                    width: "100%",
                    maxWidth: 250,
                    bgcolor: "background.paper",
                    borderRadius: "0px 0px 0px 15px",
                  }}
                  component="nav"
                >
                  <ListItemButton>
                    <ListItemIcon
                      style={{
                        justifyContent: "flex-start",
                        minWidth: "10px",
                        width: "2 rem",
                      }}
                    >
                      <FaceIcon />
                    </ListItemIcon>
                    <ListItemText
                      primary="프로필"
                      primaryTypographyProps={{
                        color: "#5D5D5D",
                        fontSize: "0.7rem",
                        fontWeight: 700,
                        marginLeft: "15px",
                      }}
                    />
                  </ListItemButton>

                  {
                    //? 테마버튼
                    /* <ListItemButton>
                    <ListItemIcon
                      style={{
                        justifyContent: "flex-start",
                        minWidth: "10px",
                        width: "2 rem",
                      }}
                    >
                      <LanguageIcon />
                    </ListItemIcon>
                    <ListItemText
                      primary="테마"
                      primaryTypographyProps={{
                        color: "#5D5D5D",
                        fontSize: "0.7rem",
                        fontWeight: 700,
                        marginLeft: "15px",
                      }}
                    />
                  </ListItemButton> */
                  }

                  {
                    //? 카테고리
                    /* <ListItemButton onClick={handleClick}>
                    <ListItemIcon
                      style={{
                        justifyContent: "flex-start",
                        minWidth: "10px",
                        width: "2 rem",
                      }}
                    >
                      <ListIcon />
                    </ListItemIcon>
                    <ListItemText
                      primary="메뉴카테고리"
                      primaryTypographyProps={{
                        color: "#5D5D5D",
                        fontSize: "0.7rem",
                        fontWeight: 700,
                        marginLeft: "15px",
                      }}
                    />
                    {open2 ? <ExpandLess /> : <ExpandMore />}
                  </ListItemButton> */
                    /* <Collapse in={open2} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                      <ListItemButton sx={{ pl: 4 }}>
                        <ListItemIcon
                          style={{
                            justifyContent: "flex-start",
                            minWidth: "10px",
                            width: "2 rem",
                          }}
                        >
                          <StarBorder />
                        </ListItemIcon>
                        <ListItemText
                          primary="Starred"
                          primaryTypographyProps={{
                            color: "#5D5D5D",
                            fontSize: "0.7rem",
                            fontWeight: 700,
                            marginLeft: "15px",
                          }}
                        />
                      </ListItemButton>
                    </List>
                  </Collapse> */
                  }
                </List>
              </div>
              {isEdit ? (
                <div className="modalBox4">
                  <div className="modalInputBox">
                    <div className="modalInputTitle">아이디</div>
                    <input
                      className="modalInput"
                      disabled
                      value={userInfo.userID}
                    ></input>
                  </div>
                  <div className="modalInputBox">
                    <div className="modalInputTitle">성명</div>
                    <input
                      className="modalInput"
                      disabled
                      value={userInfo.username}
                    ></input>
                  </div>
                  <div className="modalInputBox">
                    <div className="modalInputTitle">비밀번호</div>
                    <button
                      className="resetPwBtn"
                      onClick={() => [navigate("/resetpw1")]}
                    >
                      재설정하러가기
                    </button>
                  </div>
                  <div className="modalInputBox">
                    <div className="modalInputTitle">이메일</div>
                    <input
                      className="modalInput"
                      disabled
                      value={userInfo.email}
                    ></input>
                  </div>
                  <div className="modalModifyBtnBox">
                    <button
                      className="modalModifyBtn"
                      onClick={() => {
                        setIsEdit(false);
                      }}
                    >
                      수정하기
                    </button>
                    <button className="modalModifyBtn" onClick={deleteHandler}>
                      회원탈퇴
                    </button>
                  </div>
                </div>
              ) : (
                <div className="modalBox4">
                  <div className="modalInputBox">
                    <div className="modalInputTitle">아이디</div>
                    <input
                      className="modalInput"
                      disabled
                      value={userInfo.userID}
                    ></input>
                  </div>
                  <div className="modalInputBox">
                    <div className="modalInputTitle">성명</div>
                    <input
                      className="modalInput"
                      value={editUserName}
                      onChange={(c) => {
                        setEditUserName(c.target.value);
                      }}
                    ></input>
                  </div>
                  <div className="modalInputBox">
                    <div className="modalInputTitle">비밀번호</div>
                    <input
                      className="modalInput"
                      disabled
                      value="*****************"
                    ></input>
                  </div>
                  <div className="modalInputBox">
                    <div className="modalInputTitle">이메일</div>
                    <input
                      className="modalInput"
                      value={editEmail}
                      onChange={(c) => {
                        setEditEmail(c.target.value);
                      }}
                    ></input>
                  </div>
                  <div className="modalModifyBtnBox">
                    <button
                      className="modalModifyBtn"
                      onClick={() => {
                        setIsEdit(true);
                      }}
                    >
                      취소
                    </button>
                    <button className="modalModifyBtn" onClick={editHandler}>
                      확인
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
