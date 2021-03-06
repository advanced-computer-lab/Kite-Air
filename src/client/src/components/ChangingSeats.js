//import * as React from 'react';
import Typography from "@mui/material/Typography";
//////////////////////////////////
import SeatPicker from "react-seat-picker";
import "../styles.css";
import React, { Component, useEffect, useState,useContext } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import { useLocation } from "react-router-dom";
import { UserContext } from "../context/index.js";

//get selected seats as well, mmkn thru props
//selectedSeatsArr  = new Set();
//what we need: flight ID, cabin class

export default function ChangingSeats({ allDetails, setUpdatedSeats }) {
  const location = useLocation();
  //console.log(allDetails);

  const allflightData = allDetails;

  var seatsarr = new Set();
  const [state, setState] = useContext(UserContext);
  const [reserv, setReserv] = useState([]);
  const [loading, setloading] = useState(true);
  const [rows, setRows] = useState([]);
  const [rows2, setRows2] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState(
    allflightData[14].substring(0, allflightData[14].length - 1).split("\n")
  );
  const [incomingSelectedSeats, incomingSetSelectedSeats] = useState(
    allflightData[14].substring(0, allflightData[14].length - 1).split("\n")
  );
  // console.log(allflightData[14].substring(0,allflightData[14].length-1).split("\n"))

  const [reservationID, setReservationID] = useState();
  const [seats, setSeats] = useState(0);
  const [maxReservableSeats, setMaxReservableSeats] = useState(allDetails[12]);
  const [selectedSoFar, setSelectedSoFar] = useState(allDetails[12]);

  let seating = [];
  // console.log(incomingSelectedSeats);

  function nextChar(c) {
    var i = (parseInt(c, 36) + 1) % 36;
    return (!i * 10 + i).toString(36);
  }

  function sit(n) {
    var totalRows = Math.ceil(n / 4); //no of rows
    var letter = "A";

    for (var i = 0; i < totalRows; i++) {
      var littleSeatz = [];
      for (var j = 0; j <= 4; j++) {
        if (j == 2) {
          littleSeatz[j] = null;
        } else {
          let col = {};
          if (j < 2) {
            col = {
              id: j + 1 + "" + letter,
              number: j + 1,
              isReserved: false,
              isSelected: false,
            };
          } else {
            col = {
              id: j + "" + letter,
              number: j,
              isReserved: false,
              isSelected: false,
            };
          }
          littleSeatz[j] = col;
        }
      }
      letter = nextChar(letter).toUpperCase();
      seating.push(littleSeatz);
    }

    if (seating.length != 0) {
      setRows2(seating);
      console.log("Seating length " + seating.length);
    }
  }

  const baseURLSeats = "http://localhost:8000/flights/seats-of-flight";

  const fetchSeats = () => {
    //gets number of seats in the flight
    axios
      .post(baseURLSeats, {
        _id: allflightData[1],
      },
      {
        headers: {
          Authorization: "Bearer " + state.token,
        },
      })
      .then((response) => {
        if (allflightData[9] == "First") {
          setSeats(response.data[0].ftotalSeats);
        } else if (allflightData[9] == "Business") {
          setSeats(response.data[0].btotalSeats);
        } else if (allflightData[9] == "Economy") {
          setSeats(response.data[0].etotalSeats);
        }
      })

      .catch((error) => {
        console.log(error);
      });
  };

  const fetchAlreadyReserved = () => {
    //gets reserved seats of a choosen cabin of a flight
    axios
      .post("http://localhost:8000/reservations/seatsFlight", {
        flight: allflightData[1],
        choosenCabin: allflightData[9],
      },
      {
        headers: {
          Authorization: "Bearer " + state.token,
        },
      })
      .then((response) => {
        setReserv(response.data);
        setloading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchSeats(); //number of seats
  }, []);

  useEffect(() => {
    sit(seats);
  }, [seats]); //layout of seats

  useEffect(() => {
    if (fetchAlreadyReserved()) {
      setReserv();
    }
  }, [rows2]); //reserved seats

  useEffect(() => {
    seating = rows2;
    console.log(seating.length);
    if (!(typeof reserv === "undefined" || reserv.length == 0)) {
      for (var i = 0; i < reserv.length; i++) {
        for (var s = 0; s < reserv[i].seatsNo.length; s++) {
          seatsarr.add(reserv[i].seatsNo[s].toString());
        }
      }
    }
    for (var i = 0; i < seating.length; i++) {
      for (var j = 0; j < seating[i].length; j++) {
        if (seating[i][j] != null) {
          if (seatsarr.has(seating[i][j].id)) {
            if (incomingSelectedSeats.includes(seating[i][j].id)) {
              seating[i][j].isSelected = true;
              seating[i][j].isReserved = false;
            } else seating[i][j].isReserved = true;
          }
        }
      }
    }

    setRows(seating);
  }, [reserv]);

  const addSeatCallback = async ({ row, number, id }, addCb) => {
    console.log(`Added seat ${number}, row ${row}, id ${id}`);
    const newTooltip = `Seat-${id} Selected`;
    addCb(row, number, id, newTooltip);
    selectedSeats.push(id);
    setSelectedSeats(selectedSeats);
    setSelectedSoFar(selectedSoFar + 1);

    setUpdatedSeats(selectedSeats);
  };

  const removeSeatCallback = async ({ row, number, id }, removeCb) => {
    console.log(`Removed seat ${number}, row ${row}, id ${id}`);
    const index = selectedSeats.indexOf(id);
    if (index > -1) {
      selectedSeats.splice(index, 1);
    }
    setSelectedSeats(selectedSeats);
    const newTooltip = ["A", "B", "C"].includes(row) ? null : "";
    removeCb(row, number, newTooltip);
    setSelectedSoFar(selectedSoFar - 1);

    setUpdatedSeats(selectedSeats);
  };

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        {allflightData[9]} Seats
        <br />
        <small>
          Re-click a seat to unreserve it, then select your new desired seat from those available.
        </small>
      </Typography>
      <div className="">
        {loading || rows.length === 0 ? (
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Box sx={{ m: 1 }}>
              {loading && (
                <CircularProgress
                  size={24}
                  sx={{
                    color: "blue",
                    position: "absolute",
                    top: "45%",
                    left: "50%",
                    //marginTop: "-12px",
                    marginLeft: "-12px",
                  }}
                />
              )}
            </Box>
          </Box>
        ) : (
          <div style={{ justifyContent: "center" }}>
            <div style={{ marginTop: "100px" }}>
              <SeatPicker
                addSeatCallback={addSeatCallback}
                removeSeatCallback={removeSeatCallback}
                rows={rows}
                maxReservableSeats={maxReservableSeats}
                alpha
                visible
                selectedByDefault
                loading={loading}
                tooltipProps={{ multiline: true }}
              />
            </div>
          </div>
        )}
      </div>

      <small>
     
        <br />
        <br />

        <i
          class="material-icons"
          style={{ color: "#1976d2", fontSize: "15px" }}
        >
          square
        </i>{" "}
        Reserved by you
        <br />
        <i class="material-icons" style={{ color: "gray", fontSize: "15px" }}>
          square
        </i>{" "}
        Reserved by others
        <br />
        <i
          class="material-icons"
          style={{ color: "#191b3a", fontSize: "15px" }}
        >
          square
        </i>{" "}
        Unreserved
      </small>
    </React.Fragment>
  );
}
