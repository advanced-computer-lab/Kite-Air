import { useContext } from "react";
import { UserContext } from "../context";

import React from "react";
import Header from "./Header";
import HeaderPic from "./HeaderPic";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import { useState, useEffect } from "react";
import Checkout from "./Checkout";

export default function LandingPage() {
  const [state, setState] = useContext(UserContext);

  const [depFlights, setDepFlights] = useState([]);
  const [retlights, setRetFlights] = useState([]);
  const [searchData, setSearchData] = useState([]);
  const [showEmpty, setshowEmpty] = useState("");

  console.log(depFlights);
  console.log(retlights);
  console.log(searchData);
  console.log("ay haga" + showEmpty);

  return (
    <div>
      <HeaderPic
        setDepFlights={setDepFlights}
        setRetFlights={setRetFlights}
        setSearchData={setSearchData}
        setshowEmpty={setshowEmpty}
      />
      {JSON.stringify(state)}
      {depFlights.length ? (
        <Checkout
          depFlights={depFlights}
          retlights={retlights}
          searchData={searchData}
        />
      ) : (
        <div style={{ textAlign: "center" }}>
          <br />
          <br />

          <h1>{showEmpty}</h1>
          <br />
          <br />
        </div>
      )}
    </div>
  );
}
