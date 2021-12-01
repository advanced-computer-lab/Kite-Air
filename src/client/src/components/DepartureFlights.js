import * as React from "react";
import { useState, useEffect, useRef } from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  CardActionArea,
  Box,
} from "@material-ui/core/";
import FlightSummary from "./FlightSummary";

export default function DepartureFlights({
  handleNext,
  depFlights,
  setselectedDep,
  searchData,
}) {
  const [flights, setFlights] = useState(depFlights);

  

  useEffect(() => {
    setFlights(depFlights);
  }, [depFlights]);

  function calcDuration(time2, time1) {
    let diffHours = +time2.substring(0, 2) - +time1.substring(0, 2);
    let diffMins = +time2.substring(3, 5) - +time1.substring(3, 5);

    let diff = diffHours * 60 + diffMins;

    if (diff < 60) {
      return 0 + "h" + diff + "m";
    } else {
      return (diff - (diff % 60)) / 60 + "h" + (diff % 60) + "m";
    }
  }

  return (
    <React.Fragment style={{ height: "400px" }}>
      <Typography variant="h6" gutterBottom>
        Choose Departure flights.
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
                  <strong>
                    $
                    {(searchData.fseatsAvailable && flight.fprice) ||
                      (searchData.bseatsAvailable && flight.bprice) ||
                      (searchData.eseatsAvailable && flight.eprice)}
                  </strong>{" "}
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
                    <strong>Arrival </strong> {flight.ArrivalTime} &nbsp; &nbsp;
                    {calcDuration(flight.ArrivalTime, flight.DepartureTime)}
                  </span>
                  <span style={{ float: "right" }}>
                    <FlightSummary
                      row={flight}
                      handleNext={handleNext}
                      setSelected={setselectedDep}
                      searchData={searchData}

                    />
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
