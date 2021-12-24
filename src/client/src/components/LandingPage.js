import { useContext } from "react";
import { UserContext } from "../context/index.js";

import React from "react";
import HeaderPic from "./HeaderPic";

import { useState, useEffect } from "react";
import Checkout from "./Checkout";

import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import logo from "../assets/blueLogo.png";

export default function LandingPage() {
  const [state, setState] = useContext(UserContext);
  const [depFlights, setDepFlights] = useState([]);
  const [retlights, setRetFlights] = useState([]);
  const [searchData, setSearchData] = useState([]);
  const [showEmpty, setshowEmpty] = useState("");

  const [loading, setLoading] = useState(false);

  return (
    <>
      <div>
        <HeaderPic
          setDepFlights={setDepFlights}
          setRetFlights={setRetFlights}
          setSearchData={setSearchData}
          setshowEmpty={setshowEmpty}
          setLoading={setLoading}
        />

        {loading && (
          <Box sx={{ width: "100%" }}>
            <LinearProgress />
          </Box>
        )}

        {depFlights.length ? (
          <>
            <Checkout
              depFlights={depFlights}
              retlights={retlights}
              searchData={searchData}
            />
          </>
        ) : (
          <div style={{ textAlign: "center" }}>
            <h1>{showEmpty}</h1>
          </div>
        )}
      </div>

      <div style={{ textAlign: "center" }}>
        <div>
          <br />
          <a  href="https://github.com/advanced-computer-lab/Kite-Air">
            <img src={logo} height="45" alt="logo" />
          </a>
        </div>
        <div
          style={{
            width: "80%",
            color: "gray",
            display: "inline-block",
            // textAlign: "left",
            padding: 20,
          }}
        >
          At Kite Air we are committed to finding the best deals for
          international travellers. Our flight reservation desk is here around
          the clock to assist you with all your flight arrangements. So, whether
          you’re booking a flight, making a change to your booking, or
          cancelling altogether, you can always rely on Kite Air to help you
          save money on your next trip.
        </div>
      </div>
    </>
  );
}
