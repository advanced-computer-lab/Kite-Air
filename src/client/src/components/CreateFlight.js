import axios from "axios";
import React, { useState } from "react";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';




const baseURL = "http://localhost:8000/flights/create-flights";

export default function CreateFlight() {
  const [flightno, setFlightNo] = useState(0);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [flightdate, setFlightDate] = useState("");
  const [cabin, setCabin] = useState("");
  const [seatsavailable, setSeatsAvailable] = useState("");

  // const [fseatsAvailable, setfseatsAvailable] = useState(0);
  // const [bseatsAvailable, setbseatsAvailable] = useState(0);
  // const [eseatsAvailable, seteseatsAvailable] = useState(0);  

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

  const inputsHandlerfseatsAvailable = (e) => {
    setCabin(e.target.value);
  };
  const inputsHandlerbseatsAvailable = (e) => {
    setSeatsAvailable(e.target.value);
  };
  const inputsHandlereseatsAvailable = (e) => {
    setCabin(e.target.value);
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

      <TextField id="standard-basic" style = {{width: 250}} label="Flight Number" variant="standard" onChange={inputsHandlerFlightNo} required /> <br/> <br/>
      <TextField id="standard-basic" style = {{width: 250}} label="From" variant="standard" onChange={inputsHandlerFrom} required /> <br/> <br/>
      <TextField id="standard-basic" style = {{width: 250}} label="To" variant="standard" onChange={inputsHandlerTo} required /> <br/> <br/>
       <p style={{fontFamily: "Helvetica",color:"Grey"}}>Flight Date *  </p> 
      <TextField id="standard-basic" style = {{width: 250}} label="" variant="standard" type="Date" onChange={inputsHandlerFlightDate} required /> <br/> <br/>
      <TextField id="standard-basic" style = {{width: 250}} label="Cabin Type" variant="standard" onChange={inputsHandlerCabin} required/> <br/> <br/>
      <TextField id="standard-basic" style = {{width: 250}} label="Number of Seats Available" variant="standard" type="Number" onChange={inputsHandlerSeatsAvailable} required/> <br/> <br/>
     
      {/* <TextField id="standard-basic" style = {{width: 250}} label="Number of First Class Seats" variant="standard" onChange={inputsHandlerfseatsAvailable} required/> <br/> <br/>
      <TextField id="standard-basic" style = {{width: 250}} label="Number of Business Class Seats" variant="standard" type="Number" onChange={inputsHandlerbseatsAvailable} required/> <br/> <br/>
      <TextField id="standard-basic" style = {{width: 250}} label="Number of Economy Class Seats" variant="standard" onChange={inputsHandlereseatsAvailable} required/> <br/> <br/>
      */}

      {/* <TextField id="standard-basic" label="Departure Time" variant="standard" onChange={inputsHandlerDepartureTime} required/>
      <TextField id="standard-basic" label="Arrival Time" variant="standard" onChange={inputsHandlerArrivalTime} required/> */}
      <Button variant="contained" type="submit">Create Flight</Button>


        </form>
    </Box>
    
    </div>
  );
}
