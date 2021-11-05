import React from 'react';
import {useState,useEffect} from 'react';
import ReactDOM from 'react-dom';
import DataTable from './components/DataGrid';
import EnhancedTable from './components/EnhancedGrid.js';
import ViewFlights from './components/ViewFlights.js';
import CreateFlight from './components/CreateFlight.js';



const App = () =>  {




  return (


    <div>
<CreateFlight />

    <ViewFlights/>
     

    </div>
  );
}

export default App;
