import React from 'react';
import {useState,useEffect} from 'react';
import ReactDOM from 'react-dom';
import DataTable from './components/DataGrid';
import Badge from '@mui/material/Badge';
import MyTable from './components/MyTable';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import ViewFlights from './components/ViewFlights';
import MyNewTable from './components/MyNewTable'




const App = () =>  {

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

          <ViewFlights />
         {/* // <Routes> */}
        {/* <Route exact path='/flights' component={myTable} /> */}
       {/* // </Routes> */}
        </div>
  //   <div >

  //  {/* <button onClick="fetchFlights" className="getData">Get Data</button> */}

  //   {/* <DataTable id="allflights"></DataTable> */}
  //   </div>

  
  );
}

export default App;
