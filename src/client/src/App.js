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
import Payment from "./components/Payment.js";
import SignIn from "./components/SignIn";
import Test from "./components/Test";
import CollapsibleTable from "./components/CollapsibleTable";
import SeatsPickermain from "./components/SeatsPickermain";
import { Elements } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import { publishableKeyGet } from "./functions";
// import { useContext } from "react";
// import { UserContext } from "./context/index.js";

const App = () => {
  const [user, setUser] = useState({});
  // const [state, setState] = useContext(UserContext);
  //const stripePromise = loadStripe("STRIPE_PUBLISHABLE_API_KEY");
  const [stripePromise, setStripePromise] = useState(null);

  useEffect(() => {
    const retrievePublishableKey = async () => {
      // const publishableKey = await publishableKeyGet();
      const stripe = loadStripe("pk_test_nqH70Fb8FmabuVsU5kp4gpYf00XGNeVxyf");
      setStripePromise(stripe);
    };
    retrievePublishableKey();
  }, []);

  return (
    <UserProvider>
      <Router>
        <div>
          <ToastContainer />
          <Header />
          <Routes>
            <Route path="/pickSeats" element={<SeatsPickermain />}></Route>
            <Route path="/add-new-flight" element={<CreateFlight />}></Route>
            <Route path="/admin" element={<Search />}></Route>
            <Route path="/Search" element={<Test />}></Route>
            <Route path="/" element={<LandingPage />}></Route>
            <Route path="ProfilePage" element={<ProfilePage />} />
            <Route path="mybookings" element={<MyBookings />} />
            <Route path="login" element={<SignIn />} />
            <Route
              path="/Payment"
              element={
                <React.Fragment>
                <Box>
                  <Container maxWidth="md">
                    <Paper elevation={5}>
                      {stripePromise ? (
                        <Elements stripe={stripePromise}>
                          <Payment />
                        </Elements>
                      ) : null}
                    </Paper>
                  </Container>
                </Box>
              </React.Fragment>
              }
            />
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
