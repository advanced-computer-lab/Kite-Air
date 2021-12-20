import * as React from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "../context/index.js";

export default function EmailButton({ entry }) {
  const [state, setState] = useContext(UserContext);

  function sendEmail() {
    console.log(
      state.user.FirstName +
        " " +
        entry[2] +
        " " +
        entry[3] +
        " " +
        entry[4] +
        " " +
        entry[5] +
        " " +
        entry[6] +
        " " +
        entry[7]
    );

    var info = ` 
    <p>Hello ${state.user.FirstName},</p>
    <br/>
    Flight Number: ${entry[2]}
    <br/>
                 From: ${entry[3]}
                 <br/>
                 To: ${entry[4]}
                 <br/>
                 FlightDate: ${entry[5]}
                 <br/>
                 DepartureTime: ${entry[6]},
                 <br/>
                 ArrivalTime: ${entry[7]},
                 <br/>
                 KITE AIR :)
      `;

    var email = `${state.user.Email}`;
    console.log(email);
    var json = {};
    json["info"] = info.toString();
    axios
      .post("http://localhost:8000/reservations/EmailButton", {
        data1: info.toString(),
        data2: email.toString(),
      })
      .then((res) => {
        console.log("email is sent");
      })
      .catch((err) => {
        console.log("Error in FlightDelete!");
      });
  }

  return (
    <Button
      style={{ background: "#191b3a" }}
      variant="contained"
      onClick={sendEmail}
    >
      Email
    </Button>
  );
}
