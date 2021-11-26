import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { useState, useEffect, useRef } from "react";
import axios from "axios";
var resArray = [];
var fidArray = [];
var flightsArray = [];


function createData(name, calories, fat, carbs, protein, price) {
  return {
    name,
    calories,
    fat,
    carbs,
    protein,
    price,
    history: [
      {
        date: '2020-01-05',
        customerId: '11091700',
        amount: 3,
      },
      {
        date: '2020-01-02',
        customerId: 'Anonymous',
        amount: 1,
      },
    ],
  };
}

var count = -1;


function Row(r) {
    count = count + 1;
    const {reser} = r;
  const [open, setOpen] = React.useState(false);

  var fid = reser.flight;
  //console.log(fid);
  var fl; //flight in this reservation
  var baggage = 0;
  var ticketPrice = 0;
  var pass = 0;
  var totalPrice = 0;
  var cabin = "";
  var seats = "";
  var flightNo = 0;
  var From = "";
  var To = "";
  var date = "";
  var departure = 0;
  var arrival = 0;
  var terminal = 0;
  var idd = 0;
  axios
 .get("http://localhost:8000/flights/"+fid)
 .then((res) => {
    fl = res.data;
    From = fl.From;
    To = fl.To;
    flightNo = fl.FlightNo;
    date = fl.FlightDate;
    departure = fl.DepartureTime;
    arrival = fl.ArrivalTime;
    terminal =fl.Terminal;
    idd = fl._id;
 
  var s = reser.seatsNo; //array of seats
  if(reser.choosenCabin === "Economy"){
      baggage = fl.ebaggage;
      ticketPrice = fl.eprice;
      cabin = "Economy"
  }
  else if(reser.choosenCabin === "Business"){
      baggage = fl.bbaggage;
      ticketPrice = fl.bprice;
      cabin = "Business"
  }
  else{
      baggage = fl.fbaggage;
      ticketPrice = fl.fprice;
      cabin = "First"
  }

 pass = reser.noOfPassengers;
 totalPrice = pass * ticketPrice;

 var sn = Object.keys(s).length;
 for(let y = 0; y<sn-1; y++){
     seats.concat(s[y]);
     seats.concat(", ");
 }
 seats.concat(s[sn-1]);
 
  });
  
 

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
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
          {flightNo}
        </TableCell>
        <TableCell align="right">{From}</TableCell>
        <TableCell align="right">{To}</TableCell>
        <TableCell align="right">{date}</TableCell>
        <TableCell align="right">{departure}</TableCell>
        <TableCell align="right">{arrival}</TableCell>
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
                    <TableCell align="right">Baggage(per ticket)</TableCell>
                    <TableCell align="right">Price(per ticket)</TableCell>
                    <TableCell align="right">Passengers#</TableCell>
                    <TableCell align="right">Seats</TableCell>
                    <TableCell align="right">Total price</TableCell>
                    <TableCell align="right"></TableCell>   { /*for delete button*/}
                  </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow key={idd}>
                      <TableCell component="th" scope="row">
                        {terminal}
                      </TableCell>
                      <TableCell>{cabin}</TableCell>
                      <TableCell align="right">{baggage}</TableCell>
                      <TableCell align="right">{ticketPrice}</TableCell>
                      <TableCell align="right">{pass}</TableCell>
                      <TableCell align="right">{seats}</TableCell>
                      <TableCell align="right">{totalPrice}</TableCell>
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

// Row.propTypes = {
//   row: PropTypes.shape({
//     calories: PropTypes.number.isRequired,
//     carbs: PropTypes.number.isRequired,
//     fat: PropTypes.number.isRequired,
//     history: PropTypes.arrayOf(
//       PropTypes.shape({
//         amount: PropTypes.number.isRequired,
//         customerId: PropTypes.string.isRequired,
//         date: PropTypes.string.isRequired,
//       }),
//     ).isRequired,
//     name: PropTypes.string.isRequired,
//     price: PropTypes.number.isRequired,
//     protein: PropTypes.number.isRequired,
//   }).isRequired,
// };

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0, 3.99),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3, 4.99),
  createData('Eclair', 262, 16.0, 24, 6.0, 3.79),
  createData('Cupcake', 305, 3.7, 67, 4.3, 2.5),

  createData('Gingerbread', 356, 16.0, 49, 3.9, 1.5),
];

export default function CollapsibleTable() {


    const [reservations, setRes] = React.useState([]);
    const [flights, setFlights] = React.useState([]);
  
  
  
    useEffect(() => {   
        if(reservations !== []){
        axios
          .get(`http://localhost:8000/reservations/all-reservations`)
          .then((res) => {
              setRes(res.data);
             //console.log(res.data);
             resArray = res.data;
             //console.log(resArray[0].flight);
             //console.log(resArray[0]);
             var n = Object.keys(resArray).length;
             //console.log(n);
             for (let i=0; i<n; i++){
                 // console.log(resArray[i]);
                 var f = resArray[i].flight;
                  //console.log(f);
                  fidArray.push(f);
                  //console.log(fidArray);
             }
             //console.log(fidArray);
             var m = Object.keys(fidArray).length;
             //console.log("fid:" + m);
             for(let j=0; j<m; j++){
                axios
                .get("http://localhost:8000/flights/"+fidArray[j])
                .then((res) => {
                    setFlights(res.data);
                  //console.log(res.data);
                  flightsArray.push(res.data);
                  //console.log(flightsArray);
                  setFlights([]);
                });
             }
            // console.log(flightsArray);
             setRes([]);
          });
      }
    }, []);

  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Flight No.</TableCell>
            <TableCell align="right">From</TableCell>
            <TableCell align="right">To</TableCell>
            <TableCell align="right">Date(mm/dd/yyyy)</TableCell>
            <TableCell align="right">Departure</TableCell>
            <TableCell align="right">Arrival</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {resArray.map((reserv) => (
            <Row key={reserv._id} reser={reserv} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
