import React from "react";
import { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import DataTable from "./components/DataGrid";
import EnhancedTable from "./components/EnhancedGrid.js";
import ViewFlights from "./components/ViewFlights.js";
import CreateFlight from "./components/CreateFlight.js";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Link } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <div>
        <Link to="/add-flight"> + Add Flight </Link>
        <Routes>
          <Route path="/add-flight" exact component={CreateFlight} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
