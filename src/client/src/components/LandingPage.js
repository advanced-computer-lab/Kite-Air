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
  const [searchData, setSearchData] = useState([]);

  console.log(depFlights);
  console.log(retlights);
  console.log(searchData);

  return (
    <div>
      <HeaderPic setDepFlights={setDepFlights} setRetFlights={setRetFlights} setSearchData={setSearchData} />
     {!(depFlights.length === 0 ) ? <Checkout depFlights={depFlights} retlights={retlights} searchData={searchData} /> : <></>}
    </div>
  );
}
