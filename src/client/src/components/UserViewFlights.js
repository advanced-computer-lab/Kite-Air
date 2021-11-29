import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import {
    Grid,
    Card,
    CardContent,
    Typography,
    CardHeader
} from '@material-ui/core/'

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        padding: theme.spacing(2)
    }
}))

export default function UserViewFlights() {

    const [flights, setFlights] = useState([]);
    //  const [fs, setFs] = useState([]);
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
    }

    useEffect(() => {
        fetchFlights();
    }, [flights]);

    const classes = useStyles()
    const data = [
        { quarter: 1, earnings: 13000 },
        { quarter: 2, earnings: 16500 },
        { quarter: 3, earnings: 14250 },
        { quarter: 4, earnings: 19000 }
    ]
    return (
        <div className={classes.root}>
            <Grid
                container
                spacing={2}
                direction="column"
            //  width={1000}
            // justify="flex-start"
            // alignItems="flex-start"
            >
                {flights.map(flight => (
                    <Grid item key={flights.indexOf(flight)}>
                        <Card>
                            <CardHeader
                                title={`Flight No : ${flight.FlightNo}`}
                                subheader={`From : ${flight.From}     To: ${flight.To}`}

                            />
                            <CardContent>
                                <Typography variant="h7" gutterBottom>
                                    <p> FlightDate: {flight.FlightDate} </p>
                                    <span> Departure Time: {flight.DepartureTime} &nbsp; &nbsp;
                                        Arrival Time: {flight.ArrivalTime} </span>
                                    <br />
                                    <span> Economy : ${flight.eprice} &nbsp; &nbsp;
                                        Business: ${flight.bprice} &nbsp; &nbsp; First:${flight.fprice}  </span>
                                    {/* 

    DepartureTime: {
      type: String,
      required: true,
    },
    ArrivalTime: {
      type: String,
      required: true,
    }, */}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </div>
    )
}