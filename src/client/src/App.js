import React from "react";
import { UserProvider } from "./context/index";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import LandingPage from "./components/LandingPage";
import CreateFlight from "./components/CreateFlight.js";
import Search from "./components/Search.js";
import ProfilePage from "./components/ProfilePage.js";
import MyBookings from "./components/MyBookings.js";
import SignIn from "./components/SignIn";
import Test from "./components/Test";
import CollapsibleTable from "./components/CollapsibleTable";
import SeatsPickermain from "./components/SeatsPickermain";
import Register from "./components/Register";


const App = () => {

  return (
    <UserProvider>
      <Router>
        <div>
          <ToastContainer />
          <Header />
          <Routes>
            <Route path="/pickSeats" element={<SeatsPickermain />}></Route>
            <Route path="/addNewFlight" element={<CreateFlight /> }></Route>
            <Route path="/admin" element={ <Search />}></Route>
            <Route path="/Search" element={<Test />}></Route>
            <Route path="/" element={<LandingPage />}></Route>
            <Route path="ProfilePage" element={<ProfilePage />} />
            <Route path="mybookings" element={<MyBookings />} />
            <Route path="login" element={<SignIn />} />
            <Route path="signup" element={<Register />} />

            <Route
              path="/userReservations"
              element={<CollapsibleTable />}
            ></Route>
          </Routes>
        </div>
      </Router>

      <Footer />
    </UserProvider>
  );
};

export default App;
