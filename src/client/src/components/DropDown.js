import * as React from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import { useState, useEffect } from "react";
import axios from "axios";
import { FormHelperText } from "@material-ui/core";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = [
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "11",
  "12",
  "13",
  "14",
];

const DropDown = () => {
 
  const [flights, setFlights] = React.useState([]);

  const handleChange = (event) => {
    const {
      target: { value }
    } = event;
    setFlights(
      // On autofill we get a the stringified value.
      typeof value === "string" ? `{ FlightNo:} ${value}` : value
    );
  };

  return (
    <div>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-multiple-checkbox-label">Flight Number</InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={flights}
          onChange={handleChange}
          input={<OutlinedInput label="Flight Number" />}
          renderValue={(selected) => selected.join(", ")}
          MenuProps={MenuProps}
        >
          {names.map((name) => (
            <MenuItem key={name} value={name}>
              <Checkbox checked={flights.indexOf(name) > -1} />
              <ListItemText primary={name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );

};

export default DropDown;
// const [flights, setFlights] = React.useState([]);

// //   const test = {
// //     FlightNo: 14,
// //   };

// //   const handleChange = (event) => {
// //     const {
// //       target: { value },
// //     } = event;
// //     setPersonName(
// //       // On autofill we get a the stringified value.
// //       typeof value === "string" ? value.split(",") : value
// //     );
// //   };
// const help = (event) => {
//   const {
//     target: { renderValue },
//   } = event;
//   setFlights(typeof renderValue !== null ? renderValue : 1);
// };

// if (setFlights !== 1) {
//   var fetchFilghts = () => {
//     axios
//       .post("https://localhost:8000/search", setFlights)
//       .then(({ data }) => setFlights(data.filghts))
//       .catch((err) => console.log(err));
//   };
// }

// useEffect(() => {
//   fetchFilghts();
// }, []);

// return (
//   <div>
//     {flights &&
//       flights.map((flight) => (
//         <div className="alert alert-primary" key={flight.FlightNo}>
//           {flight.FlightNo} {flight.From} {flight.To} {flight.FlightDate}{" "}
//           {flight.Cabin} {flight.SeatsAvailable}
//         </div>
//       ))}

//     <FormControl sx={{ m: 1, width: 300 }}>
//       <InputLabel id="demo-multiple-checkbox-label">Flight Number</InputLabel>
//       <Select
//         labelId="demo-multiple-checkbox-label"
//         id="demo-multiple-checkbox"
//         multiple
//         value={flights}
//         onChange={help}
//         input={<OutlinedInput label="Flight Number" />}
//         renderValue={(selected) => JSON.stringify(selected)}
//         MenuProps={MenuProps}
//       >
//         {names.map((name) => (
//           <MenuItem key={name} value={name}>
//             <Checkbox checked={flights.indexOf(name) > -1} />
//             <ListItemText primary={name} />
//           </MenuItem>
//         ))}
//       </Select>
//     </FormControl>
//   </div>
// );