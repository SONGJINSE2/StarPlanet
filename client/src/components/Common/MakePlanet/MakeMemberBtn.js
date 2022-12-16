import * as React from "react";
import Button from "@mui/material/Button";
import "./MakeMemberBtn.scss";

export default function MakeMemberBtn({ onClick, title }) {
  return (
    <div className="MakeMemberBtnBox">
      <Button
        variant="contained"
        style={{
          width: "50",
        }}
        onClick={onClick}
      >
        {title}
      </Button>
    </div>
  );
}
