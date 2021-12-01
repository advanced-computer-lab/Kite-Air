import React from "react";
import { BrowserRouter as Router, Routes, Route  } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import LandingPage from "./components/LandingPage";
import CreateFlight from "./components/CreateFlight.js";
import Search from "./components/Search.js";
import Login from "./components/Login";
import ProfilePage from "./components/ProfilePage.js";
import SignIn from "./components/SignIn"
import Test from "./components/Test"

import SeatsPickermain from "./components/SeatsPickermain"
import { useEffect, useState } from "react";


const App = () => {
const [user, setUser] = useState({});

  return (
    <>

      <Router>
        <div>

      <ToastContainer />
       <Header/>
          <Routes>
            <Route path="/pickSeats" element={<SeatsPickermain/>}></Route>
            <Route path="/add-new-flight" element={<CreateFlight />} ></Route>
            <Route path="/admin" element={<Search/>}></Route>
          {/* <Route path="/login" element={<Login/>}></Route> */}
            <Route path="/Search" element={<Test />}></Route>
            <Route path="/" element={<LandingPage/>}></Route>

            <Route path="ProfilePage" element={<ProfilePage user={user}/>} />
            <Route path="login"  element={<SignIn user={user} setUser={setUser}/>} />

          </Routes>
        </div>
      </Router>
       
  
      <Footer />
    </>
  );
};
//<Route path="/" element={<ProfilePage user={user}/>}></Route>
//<Route path="/" element={<ProfilePage user={user}/>}></Route>
export default App;
