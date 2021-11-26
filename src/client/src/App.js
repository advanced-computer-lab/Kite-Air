import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Navbar from "./components/PrimarySearchAppBar";
import Footer from "./components/Footer";

import CreateFlight from "./components/CreateFlight.js";
import Search from "./components/Search.js";
import CollapsibleTable from "./components/CollapsibleTable";

const App = () => {
  return (
    <>
      

      <Router>
        <div>
        <Navbar />
          <Routes>
            <Route path="/add-new-flight" element={<CreateFlight />}></Route>
            <Route path="/" element={<Search/>}></Route>
            <Route path="/reservations" element={<CollapsibleTable/>}></Route>
          </Routes>
        </div>
      </Router>
      <ToastContainer />

      <Footer />
    </>
  );
};

export default App;
