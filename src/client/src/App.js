import React from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import ViewFlights from "./components/ViewFlights.js";
import CreateFlight from "./components/CreateFlight.js";

const App = () => {

  return (
    <>
 

      <Router>
        <div>
          <Routes>
            <Route path="/add-new-flight" element={<CreateFlight/>}></Route>
            <Route path="/" element={<ViewFlights/>}></Route>

          </Routes>
        </div>
      </Router>

    </>
  );
};

export default App;
