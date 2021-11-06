import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import styleFunctionSx from "@mui/system/styleFunctionSx";

function DropDown1() {
  const [flights, setFlight] = useState({});

  const [fs, setFs] = useState([]);

  const handleChange = (event) => {
    if (event.target.value !== `FlightNo:None`) {
      const j = {};
      j["FlightNo"] = event.target.value;
      setFlight(j);
    } else {
      console.log("Failed");
    }
  };

  useEffect(() => {
    if (flights !== { FlightNo: "None" })
      axios
        .post(`http://localhost:8000/flights/search`, flights)
        .then((res) => setFs(res.data));
  }, [flights]);

  return (
    <div>
      {fs.map((flight) => (
        <div className="alert alert-primary" key={flight}>
          {flight.FlightNo} {flight.From} {flight.To} {flight.FlightDate}{" "}
          {flight.Cabin} {flight.SeatsAvailable}
        </div>
      ))}

      <FormControl sx={{ m: 1, minWidth: 160 }}>
        <InputLabel id="demo-simple-select-autowidth-label">
          Flight Number
        </InputLabel>
        <Select
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
          value={flights}
          onChange={handleChange}
          autoWidth
          label="Flight Number"
        >
          <MenuItem value={`FlightNo:"None"`}>
            <em>None</em>
          </MenuItem>
          <MenuItem value={`${1}`}>1</MenuItem>
          <MenuItem value={`{FlightNo:${2}}`}>2</MenuItem>
          <MenuItem value={`{FlightNo:${3}}`}>3</MenuItem>
          <MenuItem value={`{FlightNo:${4}}`}>4</MenuItem>
          <MenuItem value={`{FlightNo:${5}}`}>5</MenuItem>
          <MenuItem value={`{FlightNo:${6}}`}>6</MenuItem>
          <MenuItem value={`{FlightNo:${7}}`}>7</MenuItem>
          <MenuItem value={`{FlightNo:${8}}`}>8</MenuItem>
          <MenuItem value={`{FlightNo:${9}}`}>9</MenuItem>
          <MenuItem value={`{FlightNo:${10}}`}>10</MenuItem>
          <MenuItem value={`{FlightNo:${11}}`}>11</MenuItem>
          <MenuItem value={`{FlightNo:${12}}`}>12</MenuItem>
          <MenuItem value={`{FlightNo:${13}}`}>13</MenuItem>
          <MenuItem value={`{FlightNo:${14}}`}>14</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}

export default DropDown1;

//{flights &&
//     flights.map((flight) => (
//       <div className="alert alert-primary" key={flight.FlightNo}>
//         {flight.FlightNo} {flight.From} {flight.To} {flight.FlightDate}{" "}
//         {flight.Cabin} {flight.SeatsAvailable}
//       </div>
//     ))}

// {flights &&
//   flights.map((flight) => (
//     <div className="alert alert-primary" key={flight.FlightNo}>
//       {flight.FlightNo} {flight.From} {flight.To} {flight.FlightDate}{" "}
//       {flight.Cabin} {flight.SeatsAvailable}
//     </div>
//   ))}
