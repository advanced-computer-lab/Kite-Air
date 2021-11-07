import React from 'react';
import { useState, useEffect } from 'react';
import { BrowserRouter, Routes , Route } from 'react-router-dom'
// import Header from './components/Header'
// import { BrowserRouter as Router, Route } from 'react-router-dom';
import EnhancedTable from './components/EnhancedGrid.js';
import ViewFlights from './components/ViewFlights.js';




const App = () => {


  return (


    <div >
    <Search />
    </div>


  );
}

export default App;