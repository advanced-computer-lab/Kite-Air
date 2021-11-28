import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Navbar from "./components/PrimarySearchAppBar";
import Footer from "./components/Footer";

import CreateFlight from "./components/CreateFlight.js";
import Search from "./components/Search.js";
import ProfilePage from "./components/ProfilePage.js";
import SignIn from "./components/SignIn"
import UserViewFlights from "./components/UserViewFlights.js"
const user = {
  _id
    :
    "619fc2769dc8cc7dc0475947",
username
    :
    "User1",
Password
    :
    "123456",
FirstName
    :
    "User1",
LastName
    :
    "New",
Address
    :
    "Company",
PassportNo
    :
    "A234567",
CountryCode
    :
    "EGY",
TelephoneNo
    :
    "0",
Email
    :
    "user1@gmail.com",
Admin
    :
    "0",
}
const App = () => {
  return (
    <>
      <Router>
        <div>
          <Navbar />
          <Routes>
            <Route path="/add-new-flight" element={<CreateFlight />}></Route>
         
            <Route path="/" element={<Search/>}></Route>
            <Route path="ProfilePage" element={<ProfilePage user={user}/>} />
            <Route path="login"  element={<SignIn/>} />
    
          </Routes>
        </div>
      </Router>
      <ToastContainer />

      <Footer />
    </>
  );
};
//<Route path="/" element={<ProfilePage user={user}/>}></Route>
//<Route path="/" element={<ProfilePage user={user}/>}></Route>
export default App;
