import React from "react";
import { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import DataTable from "./components/DataGrid";
import DropDown from "./components/DropDown";
import DropDown1 from "./components/DropDown1";
import ViewFlights from "./components/ViewFlights";
import Search from "./components/Search";
const App = () => {
  // const [flight,setFlight] = useState("");

  // const fetchFlights = () =>{
  //   fetch(`http://localhost:8000/flights/all-flights`, {method:"GET"}).then(
  //     (response => {return response.json();})
  //     .then(flight => console.log(flight))
  //     .catch(err => console.log("Error!!!"))
  //   );
  // }

  return (
    <div>
      {/* <button onClick="fetchFlights" className="getData">Get Data</button> */}
      <Search />
      {/* <DataTable id="allflights"></DataTable> */}
    </div>
  );
};

export default App;

//<DropDown1></DropDown1>;
