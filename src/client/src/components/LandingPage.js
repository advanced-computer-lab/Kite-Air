import React from "react";
import Header from "./Header";
import HeaderPic from "./HeaderPic";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import { useState, useEffect } from "react";
import Checkout from './Checkout';


export default function LandingPage() {
  const [depFlights, setDepFlights] = useState([]);
  const [retlights, setRetFlights] = useState([]);
 
  console.log(depFlights);
  console.log(retlights);


  return (
    <div>
      <HeaderPic setDepFlights={setDepFlights} setRetFlights={setRetFlights} />
     {!(depFlights.length === 0 ) ? <Checkout depFlights={depFlights} retlights={retlights} /> : <></>}
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
