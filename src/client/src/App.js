import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Navbar from "./components/PrimarySearchAppBar";
import Footer from "./components/Footer";

import CreateFlight from "./components/CreateFlight.js";
import Search from "./components/Search.js";

const App = () => {
  return (
    <>
      

      <Router>
        <div>
        <Navbar />
          <Routes>
            <Route path="/add-new-flight" element={<CreateFlight />}></Route>
            <Route path="/" element={<Search/>}></Route>
          </Routes>
        </div>
      </Router>
      <ToastContainer />

      <Footer />
    </>
  );
};

export default App;
