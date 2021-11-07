import axios from "axios";
import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import TimePick from "./TimePick";
import DatePick from "./DatePick";
import ReactTooltip from 'react-tooltip';

const baseURL = "http://localhost:8000/flights/create-flights";

export default function CreateFlight() {
  const [flightno, setFlightNo] = useState(0);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [terminal, setTerminal] = useState(1);
  const [flightdate, setFlightDate] = useState(new Date("2021-01-01"));

  const [departuretime, setDepartureTime] = useState(new Date());
  const [arrivaltime, setArrivalTime] = useState(new Date());
  const [fseatsAvailable, setfseatsAvailable] = useState(0);
  const [bseatsAvailable, setbseatsAvailable] = useState(0);
  const [eseatsAvailable, seteseatsAvailable] = useState(0);

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
    setTerminal(e.target.value < 0 ? (e.target.value = 0): e.target.value);
  };
  const inputsHandlerfseatsAvailable = (e) => {
    setfseatsAvailable(e.target.value < 0 ? (e.target.value = 0): e.target.value);
  };
  const inputsHandlerbseatsAvailable = (e) => {
    setbseatsAvailable(e.target.value < 0 ? (e.target.value = 0): e.target.value);
  };
  const inputsHandlereseatsAvailable = (e) => {

    
    seteseatsAvailable(e.target.value < 0 ? (e.target.value = 0): e.target.value);
  };
  const inputsHandlerDepartureTime = (e) => {
     setDepartureTime(e);
  };
  const inputsHandlerArrivalTime = (e) => {

    setArrivalTime(e);
  };



  const inputs = {
    From: from,
    To: to,
    Terminal: terminal,

    FlightDate:


    ( (flightdate.getMonth() + 1).toString().length === 1 ? "0" + (flightdate.getMonth() + 1).toString()  : (flightdate.getMonth() + 1) ).toString() +
      "-" +

     ( (flightdate.getDate()).toString().length === 1 ? "0" + (flightdate.getDate()).toString()  : (flightdate.getDate()) ).toString() +
      "-" +

      flightdate.getFullYear().toString(),

    FlightNo: flightno,
    DepartureTime: 
    ( (departuretime.getHours()).toString().length === 1 ? "0" + (departuretime.getHours()).toString()  : (departuretime.getHours()) ).toString()
    +":"+
        ( (departuretime.getMinutes()).toString().length === 1 ? "0" + (departuretime.getMinutes()).toString()  : (departuretime.getMinutes()) ).toString(),

        
    ArrivalTime:  
    ( (arrivaltime.getHours()).toString().length === 1 ? "0" + (arrivaltime.getHours()).toString()  : (arrivaltime.getHours()) ).toString()
+":"+
    ( (arrivaltime.getMinutes()).toString().length === 1 ? "0" + (arrivaltime.getMinutes()).toString()  : (arrivaltime.getMinutes()) ).toString(),

    fseatsAvailable: fseatsAvailable,
    bseatsAvailable: bseatsAvailable,
    eseatsAvailable: eseatsAvailable,
  };

  const submitButton = async () => {
    await axios
      .post(baseURL, inputs)
      .then((res) => {
        alert("SUCCESS");
        
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="wrapper">
     <ReactTooltip place='right'/>
      <Box
        sx={{
          "& > :not(style)": { m: 1, width: "29ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <form onSubmit={submitButton}>
          <p style={{fontFamily:'Arial',color:'Grey'}}>Flight Information</p>
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
            data-tip="Airport Code" 
            inputProps={{ maxLength: "3" }}
            onInput = { e => e.target.value = ("" + e.target.value).toUpperCase()}
            type="text"
            required
          />{" "}
          <br /> <br />
          <TextField
            id="outlined-basic"
            style={{ width: 250 }}
            label="To"
            variant="outlined"
            onChange={inputsHandlerTo}
            data-tip="Airport Code"
            inputProps={{ maxLength: "3" }}
            onInput = { e => e.target.value = ("" + e.target.value).toUpperCase()}
            type="text"
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
            <br />  <br /> 
          <p style={{fontFamily:'Arial',color:'Grey'}}>Schedule</p>
        
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


          <br /> 
          <p style={{fontFamily:'Arial',color:'Grey'}}>Number of Seats</p>
        
          <TextField
            id="outlined-basic"
            style={{ width: 250 }}
            label="No. of First Class Seats"
            variant="outlined"
            type="Number" 
            onChange={inputsHandlerfseatsAvailable}
            required
          />{" "}
          <br />
          <br />
          <br />
          <TextField
            id="outlined-basic"
            style={{ width: 250 }}
            label="No. of Business Class Seats"
            variant="outlined"
            type="Number"
            onChange={inputsHandlerbseatsAvailable}
            required
          />
          <br />
          <br />
          <br />
          <TextField
            id="outlined-basic"
            style={{ width: 250 }}
            label="No. of Economy Class Seats"
            variant="outlined"
            type="Number"
            onChange={inputsHandlereseatsAvailable}
            required
          />
          <br />
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
