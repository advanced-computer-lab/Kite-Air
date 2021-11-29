//import * as React from 'react';
import Typography from "@mui/material/Typography";
//////////////////////////////////
import ReactDOM from "react-dom";
import SeatPicker from "react-seat-picker";
import "../styles.css";
import React, { Component, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function SeatsDeparture() {
  const baseURL = "http://localhost:8000/reservations/seatsofcabinOfaFlight";

  const baseURLUpdate = "http://localhost:8000/reservations/updateSeats";

  const baseURLSeats = "http://localhost:8000/flights/seats-of-flight";

  var seatsarr = new Set();

  // let seating = [
  //   [
  //     { id: "1A", number: 1, isReserved: false },
  //     { id: "2A", number: 2 },
  //     null,
  //     {
  //       id: "3A",
  //       number: "3",
  //     },
  //     { id: "4A", number: "4" },
  //   ],
  //   [
  //     {
  //       id: "1B",
  //       number: 1,
  //     },
  //     { id: "2B", number: 2 },
  //     null,
  //     { id: "3B", number: "3" },
  //     { id: "4B", number: "4" },
  //   ],
  //   [
  //     { id: "1C", number: 1 },
  //     { id: "2C", number: 2 },
  //     null,
  //     { id: "3C", number: 3 },
  //     { id: "4C", number: "4" },
  //   ],
  //   [
  //     { id: "1D", number: 1 },
  //     { id: "2D", number: 2 },
  //     null,
  //     { id: "3D", number: 3 },
  //     { id: "4D", number: "4" },
  //   ],
  //   [
  //     { id: "1E", number: 1 },
  //     { id: "2E", number: 2 },
  //     null,
  //     { id: "3E", number: "3" },
  //     { id: "4E", number: "4" },
  //   ],
  //   [
  //     { id: "1F", number: 1 },
  //     { id: "2F", number: 2 },
  //     null,
  //     { id: "3F", number: "3" },
  //     { id: "4F", number: "4" },
  //   ],

  //   [
  //     { id: "1G", number: 1 },
  //     { id: "2G", number: 2 },
  //     null,
  //     { id: "3G", number: "3" },
  //     { id: "4G", number: "4" },
  //   ],
  // ];

  const [reserv, setReserv] = useState([]);
  const [loading, setloading] = useState(true);
  const [rows, setRows] = useState([]);
  const [rows2, setRows2] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [reservationID, setReservationID] = useState();
  const [seats, setSeats] = useState(0);

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

  const saveselected = () => {
    axios
      .post(baseURLUpdate, { seatsNo: selectedSeats, _id: reservationID })
      .then((response) => {
        setReserv(response.data);
        setloading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const fetchSeats = () => {
    //gets number of seats
    axios
      .get(baseURLSeats)
      .then((response) => {
        setSeats(response.data[0].bseatsAvailable);
//        setloading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const fetchFlight = () => {
    //gets reserved seats of a choosen cabin of a flight
    axios
      .get(baseURL)
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
    console.log("am i running forever? empty");

  }, []);

  useEffect(() => {
    sit(seats);
    console.log("am i running forever? seats");

  }, [seats]); //layout of seats

  useEffect(() => {
    fetchFlight();
    console.log("am i running forever? rows2");

  }, [rows2]); //reserved seats

  useEffect(() => {

    seating = rows2;
    console.log(seating.length);
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
    // setloading(false);
  };

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Departing Seats res {reserv.length}
      </Typography>
      <div className="">
        {(loading || rows.length===0)? (
          <div>Loading</div>
        ) : (
          <div style={{ justifyContent: "center" }}>
            <div style={{ marginTop: "100px" }}>
              <SeatPicker
                addSeatCallback={addSeatCallback}
                removeSeatCallback={removeSeatCallback}
                rows={rows}
                maxReservableSeats={3}
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
          {/* {reserv &&
          reserv.map((flight) => (
            <h2 key={flight._id}>
              {" "}
              {flight.User} {flight.seatsNo} {flight.flight}{" "}
              {flight.noOfPassengers} {flight.choosenCabin}{" "}
            </h2>
          ))} */}
        </div>
      </div>
    </React.Fragment>
  );
}
