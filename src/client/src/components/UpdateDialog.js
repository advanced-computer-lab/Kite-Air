import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useEffect, useState } from 'react'
import axios from 'axios';
import ViewFlights from './ViewFlights';
import { Navigate } from 'react-router-dom';

export default function FormDialog({ row }) {

  const [FlightNo, setFlightNo] = useState(row.FlightNo);
  const [From, setFrom] = useState(row.From);
  const [To, setTo] = useState(row.To);
  const [FlightDate, setFlightDate] = useState(row.FlightDate);
  const [fseatsAvailable, setfSeats] = useState(row.fseatsAvailable);
  const [bseatsAvailable, setbSeats] = useState(row.bseatsAvailable);
  const [eseatsAvailable, seteSeats] = useState(row.eseatsAvailable);
  const [DepartureTime, setDeparture] = useState(row.DepartureTime);
  const [ArrivalTime, setArrival] = useState(row.ArrivalTime);
  const [Terminal, setTerminal]= useState(row.Terminal);
  // const [redirect, setRedirect] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  // function renderRedirect() => {
  //   if (this.state.redirect) {
  //     return <Redirect to='/target' />
  //   }
  // }
  // useEffect(() => {
  //   axios.get('http://localhost:8000/flights/all-flights').then(res => {

  // })

  // }, []);

 
  
  function updateFlight() {

    const data = {
      FlightNo: FlightNo,
      From: From,
      To: To,
      Terminal: Terminal,
      FlightDate: FlightDate,
      fseatsAvailable: fseatsAvailable,
      bseatsAvailable: bseatsAvailable,
      eseatsAvailable: eseatsAvailable,
      DepartureTime: DepartureTime, 
      ArrivalTime: ArrivalTime
    };

    axios
      .put('http://localhost:8000/flights/' + row._id, data)
      .then(res => {
        console.log(data);
        console.log("success");
        alert("Success");

        window.location.reload(false);
        // component: () => <Navigate to='/'/> 
        // handleClose();
      })
      .catch(err => {
        console.log("Error in FlightUpdate!");
      })

  };


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setFlightNo(row.FlightNo);
    setFrom(row.From);
    setTo(row.To);
    setFlightDate(row.FlightDate);
    setfSeats(row.fseatsAvailable);
    seteSeats(row.eseatsAvailable);
    setbSeats(row.bseatsAvailable);
    setDeparture(row.DepartureTime);
    setArrival(row.ArrivalTime);
    setTerminal(row.Terminal);
    setOpen(false);
  };

  return (
    <div>
      <Button variant="contained" onClick={handleClickOpen}>
        Update
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Update</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To update flight details, please enter the required updates here.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="FlightNo"
            value={FlightNo}
            onChange={(e) => { setFlightNo(e.target.value) }}
            type="text"
            label="Flight Number"
            variant="standard"
          />
          <br />
          <span>
            <TextField
              autoFocus
              margin="dense"
              id="From"
              label="From"
              type="text"
              value={From}
              onChange={(e) => { setFrom(e.target.value) }}
              variant="standard"
            />
            &nbsp;
            &nbsp;
            &nbsp;
            <TextField
              autoFocus
              margin="dense"
              id="To"
              label="To"
              onChange={(e) => { setTo(e.target.value) }}
              type="text"
              value={To}
              variant="standard"
            />
          </span>
          <br />
          <span>
            <TextField
              autoFocus
              margin="dense"
              id="ArrivalTime"
              label="Arrival Time"
              type="time"
              value={ArrivalTime}
              onChange={(e) => { setArrival(e.target.value) }}
              variant="standard"
            />
            &nbsp;
            &nbsp;
            &nbsp;
            <TextField
              autoFocus
              margin="dense"
              id="DepartureTime"
              label="Departure Time"
              onChange={(e) => { setDeparture(e.target.value) }}
              type="time"
              value={DepartureTime}
              variant="standard"
            />
          </span>
          <br/>
          <TextField
            autoFocus
            margin="dense"
            id="Terminal"
            label="Terminal"
            type="number"
            value={Terminal}
            onChange={(e) => { setTerminal(e.target.value) }}
            variant="standard"
          />
           <br />
          <TextField
            autoFocus
            margin="dense"
            id="FlightDate"
            label="Flight Date"
            type="date"
            value={ new Date(FlightDate+" GMT").toISOString().substring(0, 10)}
            onChange={(e) => { setFlightDate(e.target.value) }}
            variant="standard"
          />
          <br />
        
          <TextField
            autoFocus
            margin="dense"
            id="fseatsAvailable"
            label="First Class Seats Available #"
            type="number"
            value={fseatsAvailable}
            onChange={(e) => { setfSeats(e.target.value) }}
            variant="standard"
          />
           <br />
          <TextField
            autoFocus
            margin="dense"
            id="bseatsAvailable"
            label="Business Class Seats Available #"
            type="number"
            value={bseatsAvailable}
            onChange={(e) => { setbSeats(e.target.value) }}
            variant="standard"
          />
          <br/>
          <TextField
            autoFocus
            margin="dense"
            id="eseatsAvailable"
            label="Economy Class Seats Available #"
            type="textS"
            value={eseatsAvailable}
            onChange={(e) => {seteSeats((e.target.value)) }}
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={updateFlight}>Update</Button>
        </DialogActions>

      </Dialog>
    </div>
  );
}
