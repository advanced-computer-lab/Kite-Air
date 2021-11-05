import axios from "axios";
import React, { useState } from "react";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';

const baseURL = "http://localhost:8000/flights/create-flights";

export default function CreateFlight() {
  const [flightno, setFlightNo] = useState(0);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [flightdate, setFlightDate] = useState("");
  const [cabin, setCabin] = useState("");
  const [seatsavailable, setSeatsAvailable] = useState("");
  // const [DepartureTime, setDepartureTime] = useState("");
  // const [ArrivalTime, setArrivalTime] = useState("");

  const inputsHandlerFlightNo = (e) => {
    setFlightNo(e.target.value);
  };
  const inputsHandlerFrom = (e) => {
    setFrom(e.target.value);
  };
  const inputsHandlerTo = (e) => {
    setTo(e.target.value);
  };
  const inputsHandlerFlightDate = (e) => {
    setFlightDate(e.target.value);
  };
  const inputsHandlerCabin = (e) => {
    setCabin(e.target.value);
  };
  const inputsHandlerSeatsAvailable = (e) => {
    setSeatsAvailable(e.target.value);
  };
  // const inputsHandlerDepartureTime = (e) => {
  //   setDepartureTime(e.target.value);
  // };
  // const inputsHandlerArrivalTime = (e) => {
  //   setArrivalTime(e.target.value);
  //   };

  const inputs = {
    
    From: from,
    To: to,
    FlightDate: flightdate,
    Cabin: cabin,
    SeatsAvailable: seatsavailable,
    FlightNo: flightno,
    // DepartureTime: DepartureTime,
    // ArrivalTime: ArrivalTime,
  };

  const submitButton =async () => {
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
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    ><form onSubmit={submitButton}>

      <TextField id="standard-basic" label="Flight Number" variant="standard" onChange={inputsHandlerFlightNo} required /> <br/> <br/>
      <TextField id="standard-basic" label="From" variant="standard" onChange={inputsHandlerFrom} required /> <br/> <br/>
      <TextField id="standard-basic" label="To" variant="standard" onChange={inputsHandlerTo} required /> <br/> <br/>
      <TextField id="standard-basic" label="Flight Date" variant="standard" type="Date" onChange={inputsHandlerFlightDate} required /> <br/> <br/>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
  <DatePicker
    label="Flight Date"
    value={flightdate}
    onChange={inputsHandlerFlightDate}
    renderInput={(params) => <TextField {...params} />}
  />
</LocalizationProvider>
      <TextField id="standard-basic" label="Cabin Type" variant="standard" onChange={inputsHandlerCabin} required/> <br/> <br/>
      <TextField id="standard-basic" label="Number of Seats Available" variant="standard" type="Number" onChange={inputsHandlerSeatsAvailable} required/> <br/> <br/>
      {/* <TextField id="standard-basic" label="Departure Time" variant="standard" onChange={inputsHandlerDepartureTime} required/>
      <TextField id="standard-basic" label="Arrival Time" variant="standard" onChange={inputsHandlerArrivalTime} required/> */}
      <Button variant="contained" type="submit">Create Flight</Button>


        </form>
    </Box>
    
    </div>
  );
}
