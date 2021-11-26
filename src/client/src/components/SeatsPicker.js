import ReactDOM from "react-dom";
import SeatPicker from "react-seat-picker";
import "../styles.css";
import React, { Component, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function SeatsPicker() {
  const baseURL = "http://localhost:8000/reservations/allreservations";
  var seatsarr = new Set();
  
  const [reserv, setReserv] = useState([]);
  const [loading, setloading] = useState(false);

  const fetchFlight = async () => {
    await axios
      .get(baseURL)
      .then((response) => {
        setReserv(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect( () => {
     fetchFlight();
}, []);





  const addSeatCallback = async ({ row, number, id }, addCb) => {
    //setloading(true);
    //await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log(`Added seat ${number}, row ${row}, id ${id}`);
    const newTooltip = `Seat-${id} Selected`;
    addCb(row, number, id, newTooltip);
    // setloading(false);
  };

  const removeSeatCallback = async ({ row, number, id }, removeCb) => {
    //   setloading(true);
    //  await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log(`Removed seat ${number}, row ${row}, id ${id}`);
    // A value of null will reset the tooltip to the original while '' will hide the tooltip
    const newTooltip = ["A", "B", "C"].includes(row) ? null : "";
    removeCb(row, number, newTooltip);
    // setloading(false);
  };



if (!(typeof reserv === "undefined" || reserv.length == 0)) {
    for (var i = 0; i < reserv.length; i++) {
      for (var s = 0; s < reserv[i].seatsNo.length; s++) {
        seatsarr.add(reserv[i].seatsNo[s].toString());
      }
    }
  }


  console.log(seatsarr);

  const rows = [
    [
      { id: "1A", number: 1, isReserved: false },
      { id: "2A", number: 2 },
      null,
      {
        id: "3A",
        number: "3",
      },
      { id: "4A", number: "4" },
    ],
    [
      {
        id: "1B",
        number: 1,
      },
      { id: "2B", number: 2 },
      null,
      { id: "3B", number: "3" },
      { id: "4B", number: "4" },
    ],
    [
      { id: "1C", number: 1 },
      { id: "2C", number: 2 },
      null,
      { id: "3C", number: 3 },
      { id: "4C", number: "4" },
    ],
    [
      { id: "1D", number: 1 },
      { id: "2D", number: 2 },
      null,
      { id: "3D", number: 3 },
      { id: "4D", number: "4" },
    ],
    [
      { id: "1E", number: 1 },
      { id: "2E", number: 2 },
      null,
      { id: "3E", number: "3" },
      { id: "4E", number: "4" },
    ],
    [
      { id: "1F", number: 1 },
      { id: "2F", number: 2 },
      null,
      { id: "3F", number: "3" },
      { id: "4F", number: "4" },
    ],

    [
      { id: "1G", number: 1 },
      { id: "2G", number: 2 },
      null,
      { id: "3G", number: "3" },
      { id: "4G", number: "4" },
    ],
  ];

  for (var i = 0; i < rows.length; i++) {
    for (var j = 0; j < rows[i].length; j++) {
      if (rows[i][j] != null) {
        if (seatsarr.has(rows[i][j].id)) {
          rows[i][j].isReserved = true;
        }
      }
    }
  }

  return (
    <div className="">
      <div style={{ justifyContent: "center" }}>
        <br />
        <br />
        <div style={{ marginTop: "100px" }}>
          <SeatPicker
            addSeatCallback={addSeatCallback}
            removeSeatCallback={removeSeatCallback}
            rows={rows}
            maxReservableSeats={3}
            alpha
            visible
            selectedByDefault
           // loading={loading}
            tooltipProps={{ multiline: true }}
          />
        </div>
      </div>

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
  );
}
