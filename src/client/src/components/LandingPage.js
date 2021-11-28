import React from "react";
import Header from "./Header";
import HeaderPic from "./HeaderPic"
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";

export default function LandingPage() {
  return (
    <div>
        <HeaderPic/>

     
 
    </div>
  );
}

function Copyright() {
  return (
    <Typography variant="caption" color="text.secondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="/">
        Kite Air
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}


