//import * as React from 'react';
import Typography from "@mui/material/Typography";
//////////////////////////////////
import ReactDOM from "react-dom";
import SeatPicker from "react-seat-picker";
import "../styles.css";
import React, { Component, useEffect, useState,useContext } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import { UserContext } from "../context/index.js";

export default function SeatsReturn(props) {
  const baseURL = "http://localhost:8000/reservations/seatsFlight";
  const baseURLUpdate = "http://localhost:8000/reservations/updateSeats";
  const baseURLSeats = "http://localhost:8000/flights/seats-of-flight";

  var seatsarr = new Set();
  function getNoOfPassengers() {
    if (props.searchData.fseatsAvailable) {
      return props.searchData.fseatsAvailable;
    } else if (props.searchData.bseatsAvailable) {
      return props.searchData.bseatsAvailable;
    } else if (props.searchData.eseatsAvailable) {
      return props.searchData.eseatsAvailable;
    }
  }
  const [state, setState] = useContext(UserContext);

  const [reserv, setReserv] = useState([]);
  const [loading, setloading] = useState(true);
  const [rows, setRows] = useState([]);
  const [rows2, setRows2] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [reservationID, setReservationID] = useState();
  const [seats, setSeats] = useState(0);
  const [maxReservableSeats, setMaxReservableSeats] = useState(
    getNoOfPassengers()
  );
  const [selectedSoFar, setSelectedSoFar] = useState(0);

  let seating = [];

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
            };
          } else {
            col = {
              id: j + "" + letter,
              number: j,
              isReserved: false,
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

  function getClass() {
    if (props.searchData.fseatsAvailable) {
      return "First";
    } else if (props.searchData.bseatsAvailable) {
      return "Business";
    } else if (props.searchData.eseatsAvailable) {
      return "Economy";
    }
  }

  const fetchSeats = () => {
    //gets number of seats in the flight
    axios
      .post(
        baseURLSeats,
        {
          _id: props.selectedRetF._id,
        },
        {
          headers: {
            Authorization: "Bearer " + state.token,
          },
        }
      )
      .then((response) => {
        if (props.searchData.fseatsAvailable) {
          setSeats(response.data[0].ftotalSeats);
        } else if (props.searchData.bseatsAvailable) {
          setSeats(response.data[0].btotalSeats);
        } else if (props.searchData.eseatsAvailable) {
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
        flight: props.selectedRetF._id,
        choosenCabin: getClass(),
      },
      {
        headers: {
          Authorization: 'Bearer '+state.token,
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
    if (!(typeof reserv === "undefined" || reserv.length == 0)) {
      for (var i = 0; i < reserv.length; i++) {
        for (var s = 0; s < reserv[i].seatsNo.length; s++) {
          seatsarr.add(reserv[i].seatsNo[s].toString());
          //   console.log("res" + reserv[i].seatsNo);
        }
      }
    }
    for (var i = 0; i < seating.length; i++) {
      for (var j = 0; j < seating[i].length; j++) {
        if (seating[i][j] != null) {
          if (seatsarr.has(seating[i][j].id)) {
            seating[i][j].isReserved = true;
          }
        }
      }
    }

    setRows(seating);
  }, [reserv]);

  const addSeatCallback = async ({ row, number, id }, addCb) => {
    //setloading(true);
    //await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log(`Added seat ${number}, row ${row}, id ${id}`);

    const newTooltip = `Seat-${id} Selected`;
    addCb(row, number, id, newTooltip);

    selectedSeats.push(id);
    setSelectedSeats(selectedSeats);
    setSelectedSoFar(selectedSoFar + 1);
    props.setSelectedReturn(selectedSeats);
    // setloading(false);
  };

  const removeSeatCallback = async ({ row, number, id }, removeCb) => {
    //   setloading(true);
    //  await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log(`Removed seat ${number}, row ${row}, id ${id}`);
    selectedSeats.pop(id);
    setSelectedSeats(selectedSeats);
    // A value of null will reset the tooltip to the original while '' will hide the tooltip
    const newTooltip = ["A", "B", "C"].includes(row) ? null : "";
    removeCb(row, number, newTooltip);
    setSelectedSoFar(selectedSoFar - 1);
    props.setSelectedReturn(selectedSeats);
    // setloading(false);
  };

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        {getClass()} Seats for Return Flight
        <br />
        {maxReservableSeats - selectedSoFar ? (
          <small>
            {" "}
            You have {maxReservableSeats - selectedSoFar} seat(s) left to pick{" "}
          </small>
        ) : (
          <> &nbsp;</>
        )}
      </Typography>
      <div className="">
        {selectedSoFar === maxReservableSeats
          ? props.setDis(1)
          : props.setDis(0)}
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

        <div>
          <small>
            <br />
            <br />
            <i
              class="material-icons"
              style={{ color: "#1976d2", fontSize: "15px" }}
            >
              square
            </i>{" "}
            Selected
            <br />
            <i
              class="material-icons"
              style={{ color: "gray", fontSize: "15px" }}
            >
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
        </div>
      </div>
    </React.Fragment>
  );
}
