import React from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import CreateFlight from "./components/CreateFlight.js";
import Search from "./components/Search.js";

const App = () => {

  return (
    <>
 


      <Router>
        <div>
          <Routes>
            <Route path="/add-new-flight" element={<CreateFlight/>}></Route>
            <Route path="/" element={<Search/>}></Route>

          </Routes>
        </div>
      </Router>

    </>
  );
};

export default App;
