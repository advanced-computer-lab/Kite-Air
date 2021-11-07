import axios from "axios";
import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import TimePick from "./TimePick";
import DatePick from "./DatePick";

const baseURL = "http://localhost:8000/flights/create-flights";

export default function CreateFlight() {
  const [flightno, setFlightNo] = useState(0);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [terminal, setTerminal] = useState(1);
  const [flightdate, setFlightDate] = useState(new Date("2021-01-01"));
  const [departuretime, setDepartureTime] = useState();
  const [arrivaltime, setArrivalTime] = useState();
  const [fseatsAvailable, setfseatsAvailable] = useState(0);
  const [bseatsAvailable, setbseatsAvailable] = useState(0);
  const [eseatsAvailable, seteseatsAvailable] = useState(0);

  // const [dhours, setDhours] = useState();
  // const [dmins, setDmins] = useState();

  // const [ahours, setAhours] = useState();
  // const [amins, setAmins] = useState();






  const inputsHandlerFlightNo = (e) => {
    setFlightNo(e.target.value);
  };
  const inputsHandlerFrom = (e) => {
    setFrom(e.target.value);
  };
  const inputsHandlerTo = (e) => {
    setTo(e.target.value);
  };
  const inputsHandlerFlightDate = (date) => {
   

    setFlightDate(date);
  };
  const inputsHandlerTerminal = (e) => {
    setTerminal(e.target.value);
  };
  const inputsHandlerfseatsAvailable = (e) => {
    setfseatsAvailable(e.target.value);
  };
  const inputsHandlerbseatsAvailable = (e) => {
    setbseatsAvailable(e.target.value);
  };
  const inputsHandlereseatsAvailable = (e) => {
    seteseatsAvailable(e.target.value);
  };
  const inputsHandlerDepartureTime = (e) => {
    console.log(e.getHours())
    setDepartureTime(e);
  };
  const inputsHandlerArrivalTime = (e) => {


    setArrivalTime(e);
  };

  // const inputsHandlerdhours = (e) => {
  //   setDhours(e.target.value);
  // };
  // const inputsHandlerdmins = (e) => {
  //   setDmins(e.target.value);
  // };






  const inputs = {
    From: from,
    To: to,
    Terminal: terminal,
    FlightDate:
      flightdate.getDate() +
      "-" +
      (flightdate.getMonth() + 1) +
      "-" +
      flightdate.getFullYear(),
    FlightNo: flightno,
    DepartureTime: departuretime,
    ArrivalTime: arrivaltime,
    fseatsAvailable: fseatsAvailable,
    bseatsAvailable: bseatsAvailable,
    eseatsAvailable: eseatsAvailable,
  };

  const submitButton = async () => {
    await axios
      .post(baseURL, inputs)
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="wrapper">
      <Box
        sx={{
          "& > :not(style)": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <form onSubmit={submitButton}>
          <TextField
            id="outlined-basic"
            style={{ width: 250 }}
            label="Flight Number"
            variant="outlined"
            onChange={inputsHandlerFlightNo}
            required
          />{" "}
          <br /> <br />
          <TextField
            id="outlined-basic"
            style={{ width: 250 }}
            label="From"
            variant="outlined"
            onChange={inputsHandlerFrom}
            required
          />{" "}
          <br /> <br />
          <TextField
            id="outlined-basic"
            style={{ width: 250 }}
            label="To"
            variant="outlined"
            onChange={inputsHandlerTo}
            required
          />{" "}
          <br /> <br />
          <TextField
            id="outlined-basic"
            style={{ width: 250 }}
            label="Terminal"
            variant="outlined"
            type="Number"
            onChange={inputsHandlerTerminal}
            required
          />{" "}
          <br /> <br />
          <DatePick
            required
            handleChange={inputsHandlerFlightDate}
            val={flightdate}
            label="Flight Date *"
          ></DatePick>
          <br /> <br />


          <TimePick
            required
            handleChange={inputsHandlerDepartureTime}
            val={departuretime}
            labels="Departure Time *"
          ></TimePick>
          <br /> <br />
  

          <TimePick
            required
            handleChange={inputsHandlerArrivalTime}
            val={arrivaltime}
            labels="Arrival Time *"
          ></TimePick>


          <br /> <br />
          Number of Seats
          <br />
          <br />
          <TextField
            id="outlined-basic"
            style={{ width: 250 }}
            label="# of First Class Seats"
            variant="outlined"
            type="Number"
            onChange={inputsHandlerfseatsAvailable}
            required
          />{" "}
          <br />
          <br />
          <TextField
            id="outlined-basic"
            style={{ width: 250 }}
            label="# of Business Class Seats"
            variant="outlined"
            type="Number"
            onChange={inputsHandlerbseatsAvailable}
            required
          />
          <br />
          <br />
          <TextField
            id="outlined-basic"
            style={{ width: 250 }}
            label="# of Economy Class Seats"
            variant="outlined"
            type="Number"
            onChange={inputsHandlereseatsAvailable}
            required
          />
          <br />
          <br />
          <Button variant="contained" type="submit">
            Create Flight
          </Button>
        </form>
      </Box>
    </div>
  );
}
