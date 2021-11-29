import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export default function FlightSummary({ row,handleNext }) {
  console.log(row);

  const [FlightNo, setFlightNo] = useState(row.FlightNo);
  const [From, setFrom] = useState(row.From);
  const [To, setTo] = useState(row.To);
  const [FlightDate, setFlightDate] = useState(row.FlightDate);
  const [fseatsAvailable, setfSeats] = useState(row.fseatsAvailable);
  const [bseatsAvailable, setbSeats] = useState(row.bseatsAvailable);
  const [eseatsAvailable, seteSeats] = useState(row.eseatsAvailable);
  const [DepartureTime, setDeparture] = useState(row.DepartureTime);
  const [ArrivalTime, setArrival] = useState(row.ArrivalTime);
  const [Terminal, setTerminal] = useState(row.Terminal);
  const [ebaggage, setEbaggage] = useState(row.ebaggage);
  const [bbaggage, setBbaggage] = useState(row.bbaggage);
  const [fbaggage, setFbaggage] = useState(row.fbaggage);
  const [eprice, seteprice] = useState(row.eprice);
  const [bprice, setbprice] = useState(row.bprice);
  const [fprice, setfprice] = useState(row.fprice);

  const [open, setOpen] = React.useState(false);

  const data = {
    FlightNo: FlightNo,
    From: From,
    To: To,
    Terminal: Terminal,
    FlightDate: FlightDate,
    fseatsAvailable: fseatsAvailable,
    bseatsAvailable: bseatsAvailable,
    eseatsAvailable: eseatsAvailable,
    fbaggage: fbaggage,
    bbaggage: bbaggage,
    ebaggage: ebaggage,
    fprice: fprice,
    bprice: bprice,
    eprice: eprice,
    DepartureTime: DepartureTime,
    ArrivalTime: ArrivalTime,
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    // setFlightNo(row.FlightNo);
    // setFrom(row.From);
    // setTo(row.To);
    // setFlightDate(row.FlightDate);
    // setfSeats(row.fseatsAvailable);
    // seteSeats(row.eseatsAvailable);
    // setbSeats(row.bseatsAvailable);
    // setDeparture(row.DepartureTime);
    // setArrival(row.ArrivalTime);
    // setTerminal(row.Terminal);
    setOpen(false);
  };

  
  const handleSelect = () => {
 


  };

  return (
    <div>
      <Button variant="contained" onClick={handleClickOpen}>
        View Summary
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle> Flight Summary </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <div style={{ width: "300px" }}>
              {row.FlightNo}
              <br /> {row.From} 🠖 {row.To}
              <br /> {row.fprice}
              <br /> {row.eprice}
              <br /> {row.bprice}
              <br /> {row.fseatsAvailable}
              <br /> {row.eseatsAvailable}
              <br /> {row.bseatsAvailable}
              <br /> {row.fbaggage}
              <br /> {row.ebaggage}
              <br /> {row.bbaggage}
              <span>
                {" "}
                <strong>Departure </strong> {row.DepartureTime} &nbsp; &nbsp;{" "}
                <strong>Arrival </strong> {row.ArrivalTime}{" "}
              </span>
              <br />
              {row.FlightDate.replaceAll("-", "/")}{" "}
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleNext}>Select</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
