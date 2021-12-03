import { useContext } from "react";
import { UserContext } from "../context/index.js";

import React from "react";
import HeaderPic from "./HeaderPic";

import { useState, useEffect } from "react";
import Checkout from "./Checkout";

export default function LandingPage() {
  const [state, setState] = useContext(UserContext);
  const [depFlights, setDepFlights] = useState([]);
  const [retlights, setRetFlights] = useState([]);
  const [searchData, setSearchData] = useState([]);
  const [showEmpty, setshowEmpty] = useState("");



  return (
    <div>
      <HeaderPic
        setDepFlights={setDepFlights}
        setRetFlights={setRetFlights}
        setSearchData={setSearchData}
        setshowEmpty={setshowEmpty}
      />

      {/* { state.user && state!==null && JSON.stringify(state)} */}

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
