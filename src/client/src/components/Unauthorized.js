import * as React from "react";
import LockIcon from "@mui/icons-material/Lock";
import Link from "@mui/material/Link";

import BackgroundLetterAvatars from "./Avatar";
const drawerWidth = 340;

export default function Unauthorized() {
  return (
    <>
      {" "}
      <div
        style={{
          height: "95vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection:"column",
          backgroundColor: "#191b3a",
          paddingTop: "2vh",
        }}
      >
        <p style={{ color: "white" }}>
          <LockIcon  style={{ fontSize: 130 }} />
        </p>
        <p style={{ color: "white",fontSize:"3vh" }}>
          Please{" "}
          <Link href="login" variant="inherit">
            {"Login"}
          </Link>
          {" "}  first
        </p>
      </div>
    </>
  );
}
