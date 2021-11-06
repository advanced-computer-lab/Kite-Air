import React from "react";
import { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import ViewFlights from "./components/ViewFlights.js";
import CreateFlight from "./components/CreateFlight.js";

const App = () => {
  //const history = useHistory();
  // function handleClick() {

  // }
  return (
    <>
      {/* <Routes>
        <Router>
          <Route path="/add-new-flight" component={CreateFlight}></Route>
        </Router>
      </Routes> */}

      <Router>
        <div>
          <Routes>
            <Route path="/add-new-flight" element={<CreateFlight/>}></Route>
            <Route path="/" element={<ViewFlights/>}></Route>

            {/* <Route path='/products' element={<Products />}></Route> */}
          </Routes>
        </div>
      </Router>

      {/* <ViewFlights> </ViewFlights> */}
    </>
  );
};

export default App;
