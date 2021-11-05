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
  const [Cabin, setCabin] = useState(row.Cabin);
  const [SeatsAvailable, setSeats] = useState(row.SeatsAvailable);
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
      FlightDate: FlightDate,
      Cabin: Cabin,
      SeatsAvailable: SeatsAvailable
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
    setCabin(row.Cabin);
    setSeats(row.SeatsAvailable);
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
              type="email"
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
          <TextField
            autoFocus
            margin="dense"
            id="FlightDate"
            label="Flight Date"
            type="text"
            value={FlightDate}
            onChange={(e) => { setFlightDate(e.target.value) }}
            variant="standard"
          />
          <br />
          <TextField
            autoFocus
            margin="dense"
            id="Cabin"
            label="Cabin"
            type="text"
            value={Cabin}
            onChange={(e) => { setCabin(e.target.value) }}
            variant="standard"
          />
          <br />
          <TextField
            autoFocus
            margin="dense"
            id="SeatsAvailable"
            label="Available Seats"
            type="text"
            value={SeatsAvailable}
            onChange={(e) => { setSeats(e.target.value) }}
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
