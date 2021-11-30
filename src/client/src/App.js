import React from "react";
import { BrowserRouter as Router, Routes, Route  } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import HeaderPic from "./components/HeaderPic";

import LandingPage from "./components/LandingPage";

import CreateFlight from "./components/CreateFlight.js";
import Search from "./components/Search.js";
import Login from "./components/Login";

import SeatsPicker from "./components/SeatsPickermain";


import BasicDateRange from "./components/BasicDateRange.js";
import CabinClass from "./components/CabinClass.js";
import Test from "./components/Test.js";

const App = (props) => {
  return (
    <>

      <Router>
        <div>

      <ToastContainer />
       <Header/>
          <Routes>
            <Route path="/pickSeats" element={<SeatsPicker/>}></Route>
            <Route path="/add-new-flight" element={<CreateFlight />} ></Route>
            <Route path="/admin" element={<Search/>}></Route>
            <Route path="/login" element={<Login/>}></Route>
            <Route path="/Search" element={<Test />}></Route>

            <Route path="/" element={<LandingPage/>}></Route>
          </Routes>
        </div>
      </Router>
       
  
      <Footer />
    </>
  );
};

export default App;
