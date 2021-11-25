import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Navbar from "./components/PrimarySearchAppBar";
import Footer from "./components/Footer";

import CreateFlight from "./components/CreateFlight.js";
import Search from "./components/Search.js";
import SearchM2 from "./components/SearchM2.js";
import BasicDateRange from "./components/BasicDateRange.js";
import CabinClass from "./components/CabinClass.js";

const App = () => {
  return (
    <>
      <Router>
        <div>
          <Navbar />
          <Routes>
            <Route path="/" element={<CabinClass />}></Route>
          </Routes>
        </div>
      </Router>
      <ToastContainer />

      <Footer />
    </>
  );
};

export default App;
