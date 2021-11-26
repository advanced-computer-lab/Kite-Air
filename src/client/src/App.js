import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Navbar from "./components/PrimarySearchAppBar";
import Footer from "./components/Footer";
import Seats from "./components/SeatsPicker";
import Header from "./components/Header";
import LandingPage from "./components/LandingPage";

import CreateFlight from "./components/CreateFlight.js";
import Search from "./components/Search.js";
import Login from "./components/Login";



const App = () => {
  return (
    <>
      

      <Router>
        <div>
    
      <ToastContainer />
       <Header/>
          <Routes>
            <Route path="/add-new-flight" element={<CreateFlight />} ></Route>
            <Route path="/admin" element={<Search/>}></Route>
            <Route path="/login" element={<Login/>}></Route>
            <Route path="/seats" element={<Seats/>}></Route>
            <Route path="/" element={<LandingPage/>}></Route>
          </Routes>
        </div>
      </Router>
   
      <Footer />
    </>
  );
};

export default App;
