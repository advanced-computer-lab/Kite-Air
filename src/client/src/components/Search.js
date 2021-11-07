import * as React from "react";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import EnhancedTable from "./EnhancedGrid";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import TimePicker from "@mui/lab/TimePicker";
import DateTimePicker from "@mui/lab/DateTimePicker";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import MobileDatePicker from "@mui/lab/MobileDatePicker";

function Search() {
  const click_flightNo = useRef();
  const click_Date = useRef();
  const click_Departure_Time = useRef();
  const click_Arrival_Time = useRef();
  const click_Terminals = useRef();
  const [value, setValue] = React.useState(new Date("2014-08-18T21:11:54"));

  const handleChange = (newValue) => {
    setValue(newValue);
  };

  const [flights, setFlight] = useState({});
  const [fs, setFs] = useState([]);

  function handeleClick(e) {
    const flightNo = click_flightNo.current.value;
    var date = click_Date.current.value;

    var year =
      date.charAt(0) + date.charAt(1) + date.charAt(2) + date.charAt(3);
    var month =
      date.charAt(5) == 0 ? date.charAt(6) : date.charAt(5) + date.charAt(6);
    var day =
      date.charAt(8) == 0 ? date.charAt(9) : date.charAt(8) + date.charAt(9);
    date = day + "-" + month + "-" + year;
    const departureTime = click_Departure_Time.current.value;
    const arrivalTime = click_Arrival_Time.current.value;
    const terminal = click_Terminals.current.value;
    console.log(arrivalTime);

    console.log(departureTime);
    const j = {};
    if (flightNo) {
      j["FlightNo"] = flightNo;
    }
    if (date !== "--") {
      j["FlightDate"] = date;
    }
    if (departureTime !== "") {
      j["DepartureTime"] = departureTime;
    }
    if (arrivalTime !== "") {
      j["ArrivalTime"] = arrivalTime;
    }
    if (terminal !== "") {
      j["Terminal"] = terminal;
    }
    console.log(j);
    setFlight(j);
    console.log(flights);
  }
  useEffect(() => {
    if (flights !== {}) {
      axios
        .post(`http://localhost:8000/flights/search`, flights)
        .then((res) => setFs(res.data));
    }
  }, [flights]);

  return (
    <div>
      <p>Flight Number</p>
      <input type="text" ref={click_flightNo} label="Flight Number"></input>
      <p>Flight Date</p>
      <input type="date" required ref={click_Date}></input>
      <p>Departure Time</p>
      <input
        type="time"
        placeholder="Departure Time"
        ref={click_Departure_Time}
      ></input>
      <p>Arrival Time</p>
      <input
        type="time"
        placeholder="Arrival Time"
        ref={click_Arrival_Time}
      ></input>
      <p>Terminal</p>
      <input type="text" ref={click_Terminals}></input>
      <button onClick={handeleClick}>Search</button>
      <EnhancedTable rows={fs} />
    </div>
  );
}

export default Search;

// {fs.map((flight) => (
//     <div className="alert alert-primary" key={flight._id}>
//       {flight.FlightNo} {flight.From} {flight.To} {flight.FlightDate}{" "}
//       {flight.Cabin} {flight.SeatsAvailable}
//     </div>
//   ))}

//

// <LocalizationProvider>
// <Stack spacing={3}>
//   <DesktopDatePicker
//     label="Flight Date"
//     inputFormat="dd/mm/yyyy"
//     value={value}
//     onChange={handleChange}
//     required
//     ref={click_Date}
//     renderInput={(params) => <TextField {...params} />}
//   />
//   <TimePicker
//     label="Departure Time"
//     value={value}
//     onChange={handleChange}
//
//     renderInput={(params) => <TextField {...params} />}
//   />
//   <TimePicker
//     label="Arrival Time"
//     value={value}
//     onChange={handleChange}
//
//     renderInput={(params) => <TextField {...params} />}
//   />
// </Stack>
// </LocalizationProvider>
