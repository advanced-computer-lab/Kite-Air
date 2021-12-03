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

export default function FlightSummary({
  row,
  handleNext,
  setSelected,
  searchData,
}) {
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
    setOpen(false);
  };

  const handleSelect = () => {
    setSelected(row);
  };

  function getBaggage(selectedDepF) {
    if (searchData.fseatsAvailable) {
      return selectedDepF.fbaggage;
    } else if (searchData.bseatsAvailable) {
      return selectedDepF.bbaggage;
    } else if (searchData.eseatsAvailable) {
      return selectedDepF.ebaggage;
    }
  }

  function getClass() {
    if (searchData.fseatsAvailable) {
      return "First";
    } else if (searchData.bseatsAvailable) {
      return "Business";
    } else if (searchData.eseatsAvailable) {
      return "Economy";
    }
  }
  return (
    <div>
      <Button variant="contained" onClick={handleClickOpen}>
        View Summary
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle> Flight Summary </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <div style={{ width: "500px" }}>
              <strong>{row.FlightNo} </strong>
        
               ( {row.From} 🠖 {row.To}{" "})
           
              <br />
              <br />

              <span>
                <strong>&#128337; Departure Time</strong> {row.DepartureTime} &nbsp;
                &nbsp; <strong>Arrival Time </strong> {row.ArrivalTime}{" "}
              </span>
              <br />

              <br />
              <strong> &#128198; Date </strong>{" "}
              {row.FlightDate.replaceAll("-", "/")}
              <br />
              <br />

              <strong>&#128186; {getClass()} Class</strong>
              <br/>
              <br />

              <strong>&#128188; Baggage Allowance </strong>{" "}
              {getBaggage(row)} Checked Bags, 1 Carry-On.
              <br />
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            onClick={() => {
              handleNext();
              handleSelect();
            }}
          >
            Select
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
