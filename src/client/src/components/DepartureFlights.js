import * as React from 'react';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { makeStyles } from "@material-ui/core/styles";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  CardActionArea,
  Box,
} from "@material-ui/core/";

import FlightSummary from "./FlightSummary";

export default function DepartureFlights({handleNext}) {
  const [flights, setFlights] = useState([]);

  
  const baseURL = "http://localhost:8000/flights/all-flights";
  const fetchFlights = () => {
    axios
      .get(baseURL)
      .then((response) => {
        setFlights(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchFlights();
  }, []);



  return (
    <React.Fragment style={{height:"400px"}}>
      <Typography variant="h6" gutterBottom>
        Choose departure flights.
      </Typography>

      <Grid container spacing={2} direction="column">
        {flights.map((flight) => (
          <Grid item key={flights.indexOf(flight)}>
            {/* <Card >
          
              <CardActionArea onClick={ () => { }} >
              <CardContent> */}

            <div
              style={{
                cursor: "pointer",
                boxShadow: "2px 2px 3px rgb(136 136 136 / 41%)",
                padding: "20px",
              }}
            >
              <Typography variant="h6" color="textPrimary">
                {" "}
                <Box sx={{ fontWeight: 500 }}>
                  {" "}
                  Flight No. {flight.FlightNo}
                </Box>{" "}
              </Typography>
              <Typography sx={{ mb: 0.5 }} color="textSecondary">
                {flight.From} 🠖 {flight.To}
                <span style={{ float: "right" }}>
                  <strong>${flight.fprice}</strong>{" "}
                </span>
              </Typography>

              <Typography gutterBottom color="textSecondary">
                <p>
                  <strong> &#128198; Date</strong>{" "}
                  {flight.FlightDate.replaceAll("-", "/")}{" "}
                </p>
                <p>
                  <span>
                    {" "}
                    <strong> &#128337; Departure </strong>{" "}
                    {flight.DepartureTime} &nbsp; &nbsp;{" "}
                    <strong>Arrival </strong> {flight.ArrivalTime}{" "}
                  </span>
                  <span style={{ float: "right" }}>
                    <FlightSummary row={flight} handleNext={handleNext}/>
                  </span>
                </p>
              </Typography>

              {/* </CardContent>
              </CardActionArea>
            </Card> */}
            </div>
          </Grid>
        ))}
      </Grid>
     
    </React.Fragment>
  );
}