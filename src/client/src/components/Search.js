import * as React from "react";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import EnhancedTable from "./EnhancedGrid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";


const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

function Search() {
  let navigate = useNavigate();

  const click_flightNo = useRef();
  const click_Date = useRef();
  const click_Departure_Time = useRef();
  const click_Arrival_Time = useRef();
  const click_Terminals = useRef();
  const [value, setValue] = React.useState(new Date());
  const [loading, setLoading] = useState(true);

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
    var month = date.charAt(5) + date.charAt(6);
    var day = date.charAt(8) + date.charAt(9);
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
        .then((res) => {
          setFs(res.data)
          setLoading(false);
          console.log("hi");
        });
    }
  }, [flights]);

  return (
    <div>


      <Box marginTop="20px" sx={{ flexGrow: 1 }}>

      <h1 style={{ margin: "10px", color:"#191b3a" }} >
        Welcome back, Admin!
      </h1>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Item style={{ boxShadow: "none" }}></Item>
          </Grid>

          <Grid item xs={1}>
            <Item style={{ boxShadow: "none" }}>
              <Typography
                variant="h7"
                color="black"
                gutterBottom
                component="div"
              >
                Filter by:
              </Typography>
            </Item>
          </Grid>
          <Grid item xs={2}>
            <Item style={{ boxShadow: "none" }}>
              Flight No. &nbsp;
              <input
                type="text"
                ref={click_flightNo}
                placeholder="Flight Number"
                style={{ width: "110px" }}
              ></input>
            </Item>
          </Grid>

          <Grid item xs={2}>
            <Item style={{ boxShadow: "none" }}>
              Terminal &nbsp;
              <input
                type="Number"
                 ref={click_Terminals}
                placeholder="Terminal"
                style={{ width: "110px" }}
              ></input>
            </Item>
          </Grid>
          <Grid item xs={2}>
            <Item style={{ boxShadow: "none" }}>
              Flight Date &nbsp;
              <input
                type="date"
                ref={click_Date}
                placeholder="Flight Date"
                style={{ width: "110px" }}
              ></input>
            </Item>
          </Grid>
          <Grid item xs={2}>
            <Item style={{ boxShadow: "none" }}>
              Departure &nbsp;
              <input
                type="time"
                placeholder="Departure Time"
                 ref={click_Departure_Time}
                style={{ width: "110px" }}
              ></input>
            </Item>
          </Grid>
          <Grid item xs={2}>
            <Item style={{ boxShadow: "none" }}>
              Arrival &nbsp;
              <input
                type="time"
                placeholder="Arrival Time"
                 ref={click_Arrival_Time}
                style={{ width: "110px" }}
              ></input>
            </Item>
          </Grid>

          <Grid item xs={1}>
            <Item style={{ boxShadow: "none" }}>
              <Button variant="outlined" size="small" onClick={handeleClick}>
                Search
              </Button>
            </Item>
          </Grid>

          <Grid item xs={2}>
            <Item style={{ boxShadow: "none" }}></Item>
          </Grid>
        </Grid>
      </Box>

      <EnhancedTable rows={fs} />
      <Box display="flex" alignItems="center" justifyContent="center">
        <Button
          variant="contained"
          onClick={handleClickSubmit}
          disableElevation
        >
          + Add New Flight
        </Button>
      </Box>
    </div>
  );
}

export default Search;
