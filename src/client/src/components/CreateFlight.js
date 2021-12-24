import axios from "axios";
import React, { useState, useContext } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import TimePick from "./TimePick";
import DatePick from "./DatePick";
import ReactTooltip from "react-tooltip";
import { toast } from "react-toastify";

import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

import { UserContext } from "../context/index.js";
import Unauthorized from "./Unauthorized";

const baseURL = "http://localhost:8000/flights/create-flights";

export default function CreateFlight() {
  const [flightno, setFlightNo] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [terminal, setTerminal] = useState("");
  const [flightdate, setFlightDate] = useState(new Date());
  const [departuretime, setDepartureTime] = useState(new Date());
  const [arrivaltime, setArrivalTime] = useState(new Date());
  const [fseatsAvailable, setfseatsAvailable] = useState("");
  const [bseatsAvailable, setbseatsAvailable] = useState("");
  const [eseatsAvailable, seteseatsAvailable] = useState("");
  const [ok, setOk] = useState(false);
  const [state, setState] = useContext(UserContext);

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
    setTerminal(e.target.value < 0 ? (e.target.value = 0) : e.target.value);
  };
  const inputsHandlerfseatsAvailable = (e) => {
    setfseatsAvailable(
      e.target.value < 0 ? (e.target.value = 0) : e.target.value
    );
  };
  const inputsHandlerbseatsAvailable = (e) => {
    setbseatsAvailable(
      e.target.value < 0 ? (e.target.value = 0) : e.target.value
    );
  };
  const inputsHandlereseatsAvailable = (e) => {
    seteseatsAvailable(
      e.target.value < 0 ? (e.target.value = 0) : e.target.value
    );
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
      ((flightdate.getMonth() + 1).toString().length === 1
        ? "0" + (flightdate.getMonth() + 1).toString()
        : flightdate.getMonth() + 1
      ).toString() +
      "-" +
      (flightdate.getDate().toString().length === 1
        ? "0" + flightdate.getDate().toString()
        : flightdate.getDate()
      ).toString() +
      "-" +
      flightdate.getFullYear().toString(),

    FlightNo: flightno,
    DepartureTime:
      (departuretime.getHours().toString().length === 1
        ? "0" + departuretime.getHours().toString()
        : departuretime.getHours()
      ).toString() +
      ":" +
      (departuretime.getMinutes().toString().length === 1
        ? "0" + departuretime.getMinutes().toString()
        : departuretime.getMinutes()
      ).toString(),

    ArrivalTime:
      (arrivaltime.getHours().toString().length === 1
        ? "0" + arrivaltime.getHours().toString()
        : arrivaltime.getHours()
      ).toString() +
      ":" +
      (arrivaltime.getMinutes().toString().length === 1
        ? "0" + arrivaltime.getMinutes().toString()
        : arrivaltime.getMinutes()
      ).toString(),

    fseatsAvailable: fseatsAvailable,
    bseatsAvailable: bseatsAvailable,
    eseatsAvailable: eseatsAvailable,
    ftotalSeats: fseatsAvailable,
    btotalSeats: bseatsAvailable,
    etotalSeats: eseatsAvailable,
  };

  const submitButton = async (event) => {
    event.preventDefault();

    await axios
      .post(baseURL, inputs, {
        headers: {
          Authorization: "Bearer " + state.token,
        },
      })
      .then((res) => {
        setOk(res.data.ok);

        toast.success("Flight created Successfully! ", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setFlightNo("");
        setFlightDate(new Date());
        setFrom("");
        setTo("");
        setTerminal("");
        setDepartureTime(new Date());
        setArrivalTime(new Date());
        setfseatsAvailable("");
        setbseatsAvailable("");
        seteseatsAvailable("");
      })

      .catch((error) => {
        toast.error(error.response.data);
      });
  };

  return (
    <div>
      <CssBaseline />

{ state && state.token &&  state.user.Admin==="1" ?
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper
          variant="outlined"
          sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
        >
          <Typography component="h1" variant="h4" align="center">
            Add new flight
          </Typography>

          <div
            style={{
              justifyContent: "center",
              alignContent: "center",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            <ReactTooltip place="right" />
            <Box
              sx={{
                "& > :not(style)": { m: 1 },
              }}
              noValidate
              autoComplete="off"
            >
              <form onSubmit={submitButton}>
                <p style={{ fontFamily: "Arial", color: "Grey" }}>
                  Flight Information
                </p>
                <TextField
                  id="outlined-basic"
                  style={{ width: 290 }}
                  label="Flight Number"
                  variant="outlined"
                  onChange={inputsHandlerFlightNo}
                  required
                  value={flightno || ""}
                  size="small"
                  multiline={true}
                />{" "}
                <br /> <br />
                <TextField
                  id="outlined-basic"
                  style={{ width: 290 }}
                  label="From"
                  variant="outlined"
                  onChange={inputsHandlerFrom}
                  data-tip="Airport Code"
                  inputProps={{ maxLength: "3" }}
                  onInput={(e) =>
                    (e.target.value = ("" + e.target.value).toUpperCase())
                  }
                  type="text"
                  value={from}
                  size="small"
                  required
                />{" "}
                <br /> <br />
                <TextField
                  id="outlined-basic"
                  style={{ width: 290 }}
                  label="To"
                  variant="outlined"
                  onChange={inputsHandlerTo}
                  data-tip="Airport Code"
                  inputProps={{ maxLength: "3" }}
                  onInput={(e) =>
                    (e.target.value = ("" + e.target.value).toUpperCase())
                  }
                  type="text"
                  value={to}
                  size="small"
                  required
                />{" "}
                <br /> <br />
                <TextField
                  id="outlined-basic"
                  style={{ width: 290 }}
                  label="Terminal"
                  variant="outlined"
                  type="Number"
                  onChange={inputsHandlerTerminal}
                  value={terminal}
                  size="small"
                  required
                />{" "}
                <br /> <br />
                <p style={{ fontFamily: "Arial", color: "Grey" }}>Schedule</p>
                <DatePick
                  required
                  handleChange={inputsHandlerFlightDate}
                  val={flightdate}
                  label="Flight Date *"
                  size="small"
                ></DatePick>
                <br /> <br />
                <TimePick
                  required
                  handleChange={inputsHandlerDepartureTime}
                  val={departuretime}
                  labels="Departure Time *"
                  size="small"
                ></TimePick>
                <br /> <br />
                <TimePick
                  required
                  handleChange={inputsHandlerArrivalTime}
                  val={arrivaltime}
                  labels="Arrival Time *"
                  size="small"
                ></TimePick>
                <br />
                <p style={{ fontFamily: "Arial", color: "Grey" }}>
                  Number of Seats
                </p>
                <TextField
                  id="outlined-basic"
                  style={{ width: 290 }}
                  label="No. of First Class Seats"
                  variant="outlined"
                  type="Number"
                  size="small"
                  onChange={inputsHandlerfseatsAvailable}
                  required
                  value={fseatsAvailable}
                />{" "}
                <br />
                <br />
                <TextField
                  id="outlined-basic"
                  style={{ width: 290 }}
                  label="No. of Business Class Seats"
                  variant="outlined"
                  type="Number"
                  onChange={inputsHandlerbseatsAvailable}
                  required
                  value={bseatsAvailable}
                  size="small"
                />
                <br />
                <br />
                <TextField
                  id="outlined-basic"
                  style={{ width: 290 }}
                  label="No. of Economy Class Seats"
                  variant="outlined"
                  type="Number"
                  size="small"
                  onChange={inputsHandlereseatsAvailable}
                  required
                  value={eseatsAvailable}
                />
                <br />
                <br />
                <Button variant="contained" type="submit">
                  Create Flight
                </Button>
              </form>
            </Box>
          </div>
        </Paper>
      </Container>
      : <Unauthorized/>
}
    </div>
  );
}
