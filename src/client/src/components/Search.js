import * as React from "react";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import EnhancedTable from "./EnhancedGrid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { useNavigate } from "react-router-dom";


const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));


function Search() {



  let navigate = useNavigate();



  const click_flightNo = useRef();
  const click_Date = useRef();
  const click_Departure_Time = useRef();
  const click_Arrival_Time = useRef();
  const click_Terminals = useRef();
  const [value, setValue] = React.useState(new Date("2014-08-18T21:11:54"));

  const handleChange = (newValue) => {
    setValue(newValue);
  };

  const [flights, setFlight] = useState({});
  const [fs, setFs] = useState([]);

  function handeleClick(e) {
    const flightNo = click_flightNo.current.value;
    
    var date = click_Date.current.value; 
    console.log(date);
    var year =
      date.charAt(0) + date.charAt(1) + date.charAt(2) + date.charAt(3);
    var month =
   date.charAt(5) + date.charAt(6);
    var day =
   date.charAt(8) + date.charAt(9);
    date = month + "-" + day + "-" + year;
    const departureTime = click_Departure_Time.current.value;
    const arrivalTime = click_Arrival_Time.current.value;
    const terminal = click_Terminals.current.value;
    console.log(arrivalTime);

    console.log(departureTime);
    const j = {};
    if (flightNo) {
      j["FlightNo"] = flightNo;
    }
    if (date !== "--") {
      j["FlightDate"] = date;
    }
    if (departureTime !== "") {
      j["DepartureTime"] = departureTime;
    }
    if (arrivalTime !== "") {
      j["ArrivalTime"] = arrivalTime;
    }
    if (terminal !== "") {
      j["Terminal"] = terminal;
    }
    console.log(j);
    setFlight(j);
    console.log(flights);
  }
  function handleClickSubmit() {
    navigate("/add-new-flight");
  }



  useEffect(() => {
    if (flights !== {}) {
      axios
        .post(`http://localhost:8000/flights/search`, flights)
        .then((res) => setFs(res.data));
    }
  }, [flights]);

  return (
    <div>

<button onClick={handleClickSubmit}>Add New Flight</button>
{/* 

      <Grid container spacing={2} >
  
        <Grid item xs={4}>
          <Item>xs=4</Item>
        </Grid>
        <Grid item xs={4}>
          <Item>xs=4</Item>
        </Grid>
        <Grid item xs={4}>
          <Item>xs=4</Item>
        </Grid>
       
      </Grid> */}

      {/* <p style={{fontFamily: "Arial"}} >Flight Number</p> */}
      <input
        type="text"
        ref={click_flightNo}
        placeholder="Flight Number"
      ></input>
      {/* <p style={{fontFamily: "Arial"}}>Flight Date</p> */}
      <input
        type="date"
        ref={click_Date}
        placeholder="Flight Date"
        //variant="standard"
        
      ></input>
      
      {/* <p>Departure Time</p> */}
      <input
        type="time"
        placeholder="Departure Time"
        ref={click_Departure_Time}
        variant="standard"
      ></input>
      {/* <p>Arrival Time</p> */}
      <input
        type="time"
        placeholder="Arrival Time"
        ref={click_Arrival_Time}
      ></input>
      {/* <p>Terminal</p> */}
      <input
        type="text"
        ref={click_Terminals}
        placeholder="Terminal"
      ></input>
      <br />
      <Button onClick={handeleClick}>Search</Button>
      <EnhancedTable rows={fs} />
    </div>
  );
}

export default Search;
