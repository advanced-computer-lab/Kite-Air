import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import CancelDialog from "./CancelDialog";
import { UserContext } from "../context/index.js";
import LinearProgress from '@mui/material/LinearProgress';
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";



var resArray = [];
var flightsArray = [];
var totalArray = []; //2D array to fill the table

function Row(e) {

  const navigate = useNavigate();

  // count = count + 1;
  //  console.log(count);
  const { entry } = e;
  //  console.log(count);

  const [open, setOpen] = React.useState(false);

  const gotoSeats = () => {

    console.log("In nav");
      navigate("/flightseats", {
        state: {
         allDetails: entry
        },
      });
  };


  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {entry[2]}
        </TableCell>
        <TableCell align="right">{entry[3]}</TableCell>
        <TableCell align="right">{entry[4]}</TableCell>
        <TableCell align="right">{entry[5]}</TableCell>
        <TableCell align="right">{entry[6]}</TableCell>
        <TableCell align="right">{entry[7]}</TableCell>
        <TableCell align="left">
          <Button style={{ background: "#191b3a" }} variant="contained">Email</Button>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Details
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Terminal</TableCell>
                    <TableCell>Cabin</TableCell>
                    <TableCell align="left" >Baggage(per ticket)</TableCell>
                    <TableCell align="left">Price(per ticket)</TableCell>
                    <TableCell align="left">Passengers#</TableCell>
                    <TableCell align="left">Seats</TableCell>
                    <TableCell align="left">Total price</TableCell>
                    <TableCell align="left" style = {{width: "180px"}}>
                      <Button color = "primary" variant="contained" style = {{width: "180px"}} onClick={gotoSeats}>Change Seat(s)</Button>
                    </TableCell>
                                    
                </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow key={entry[1]}>
                    <TableCell component="th" scope="row">
                      {entry[8]}
                    </TableCell>
                    <TableCell>{entry[9]}</TableCell>
                    <TableCell align="left">{entry[10]}</TableCell>
                    <TableCell align="left">{entry[11]}</TableCell>
                    <TableCell align="left">{entry[12]}</TableCell>
                    <TableCell align="left">{entry[14]}</TableCell>
                    <TableCell align="left">{entry[13]}</TableCell>
                    <TableCell
                      align="right" style={{ display: "flex", justifyContent: "flex-end" }}
                    >
                      <CancelDialog style={{align:"center"}} align="center" reser={entry}></CancelDialog>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default function CollapsibleTable() {
  const [state, setState] = useContext(UserContext);
  const [loading, setLoading] = useState(true);

  const [reservations, setRes] = React.useState([]);
  const [flights, setFlights] = React.useState([]);

  useEffect(() => {
    if (reservations !== []) {
      axios
        .post(`http://localhost:8000/reservations/all-reservations`, {
          User: state.user._id,
        })
        .then((res) => {
          setRes(res.data);
          resArray = res.data;
          var n = Object.keys(resArray).length;
          for (let i = 0; i < n; i++) {
            var f = resArray[i].flight;
            axios.get("http://localhost:8000/flights/" + f).then((res) => {
              setFlights(res.data);
              flightsArray.push(res.data);
              setFlights([]);
              setLoading(false);
            });
          }

          setRes([]);
        });
    }
  }, []);

  //e3mly array gdid fih el data elly enty 3yzaha w map it
  if (resArray !== [] && flightsArray !== []) {
    var t = Object.keys(resArray).length;
    //console.log(t);
    //console.log(flightsArray[0]);
    for (let k = 0; k < t; k++) {
      var temp = [];
      //temp at the end of each iteration:
      //[reservation id, flight id, flight no., from, to, date, departure, arrival, terminal, cabin, baggage(per ticket), price(per ticket), passengers#, total price, seats]
      if (flightsArray[k] !== undefined && resArray[k] !== undefined) {
        temp.push(resArray[k]._id);
        temp.push(flightsArray[k]._id);
        temp.push(flightsArray[k].FlightNo);
        temp.push(flightsArray[k].From);
        temp.push(flightsArray[k].To);
        temp.push(flightsArray[k].FlightDate);
        temp.push(flightsArray[k].DepartureTime);
        temp.push(flightsArray[k].ArrivalTime);
        temp.push(flightsArray[k].Terminal);
        var cab = resArray[k].choosenCabin;
        temp.push(cab);
        var pr = 0;
        var tpr = 0;
        var bag = 0;
        var nper = resArray[k].noOfPassengers;

        if (cab == "Economy") {
          bag = flightsArray[k].ebaggage;
          temp.push(bag + " kg");
          pr = flightsArray[k].eprice;
          temp.push("$" + pr);
          temp.push(nper);
          tpr = nper * pr;
          temp.push("$" + tpr);
        } else {
          if (cab == "Business") {
            bag = flightsArray[k].bbaggage;
            temp.push(bag + " kg");
            pr = flightsArray[k].bprice;
            temp.push("$" + pr);
            temp.push(nper);
            tpr = nper * pr;
            temp.push("$" + tpr);
          } else {
            bag = flightsArray[k].fbaggage;
            temp.push(bag + " kg");
            pr = flightsArray[k].fprice;
            temp.push("$" + pr);
            temp.push(nper);
            tpr = nper * pr;
            temp.push("$" + tpr);
          }
        }
        var sets = resArray[k].seatsNo;
        var setsStr = "";
        var sl = Object.keys(sets).length;
        for (let r = 0; r < sl; r++) {
          setsStr = setsStr + sets[r] + "\n";
        }
        temp.push(setsStr);
        temp.push(flightsArray[k].fseatsAvailable);
        temp.push(flightsArray[k].bseatsAvailable);
        temp.push(flightsArray[k].eseatsAvailable);
        temp.push(flightsArray[k].ftotalSeats);
        temp.push(flightsArray[k].btotalSeats);
        temp.push(flightsArray[k].etotalSeats);
        //console.log(temp);
        var found = false;
        var tal = Object.keys(totalArray).length;
        if (totalArray !== []) {
          for (let v = 0; v < tal; v++) {
            if (totalArray[v][0] === temp[0]) {
              found = true;
            }
          }
        }
        if (!found) {
          totalArray.push(temp);
        }
      }
    }
  }
  //console.log(totalArray);

  return (
    <div>
<br/>
      <h2>My Bookings</h2>
      <br/>

      {loading && (
        <Box sx={{ width: "100%" }}>
          <LinearProgress />
        </Box>
      )}
  
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell style={{fontWeight:"bolder"}}>Flight No.</TableCell>
              <TableCell align="right" style={{fontWeight:"bolder"}}>From</TableCell>
              <TableCell align="right" style={{fontWeight:"bolder"}}>To</TableCell>
              <TableCell align="right" style={{fontWeight:"bolder"}}>Date(mm/dd/yyyy)</TableCell>
              <TableCell align="right" style={{fontWeight:"bolder"}}>Departure</TableCell>
              <TableCell align="right" style={{fontWeight:"bolder"}}>Arrival</TableCell>
              <TableCell align="right" style={{fontWeight:"bolder"}}></TableCell>

              

            </TableRow>
          </TableHead>
          <TableBody>
            {totalArray.map((reserv) => (
              <Row key={reserv[0]} entry={reserv} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
