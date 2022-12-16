import * as React from "react";
import Box from "@mui/material/Box";
import Popper from "@mui/material/Popper";
import ModifyPlanet from "../ModifyPlanet/ModifyPlanet";
import Avatar from "@mui/material/Avatar";
import { LocalActivity } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import "./ModifyToggle.scss";

export default function SimplePopper() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const navigate = useNavigate();

  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popper" : undefined;

  const logoutHandler = () => {
    console.log(localStorage);
    localStorage.removeItem("userInfo");
    localStorage.removeItem("token");
    window.location.href = "/";
  };
  return (
    <div>
      <button
        className="toggleBtn"
        aria-describedby={id}
        type="button"
        onClick={handleClick}
      >
        <Avatar />
      </button>
      <Popper id={id} open={open} anchorEl={anchorEl}>
        <Box sx={{ border: 1, p: 1, bgcolor: "background.paper" }}>
          <div>
            <ModifyPlanet />
          </div>
          <div className="logoutBtn_Box">
            <button className="logoutBtn" onClick={logoutHandler}>
              로그아웃
            </button>
          </div>
        </Box>
      </Popper>
    </div>
  );
}
