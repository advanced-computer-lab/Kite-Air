import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import Paper from "@mui/material/Paper";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useLocation } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { UserContext } from "../context/index.js";

import SeatsDeparture from "./SeatsDeparture";
import SeatsReturn from "./SeatsReturn";
import Review from "./Review";
import axios from "axios";

import Unauthorized from "./Unauthorized";

const steps = ["Departure Seats", "Return Seats", "Review"];

const theme = createTheme();

export default function SeatsPickermain(props) {
  const location = useLocation();

  const [activeStep, setActiveStep] = React.useState(0);
  const [dis, setDis] = React.useState(0);
  const [selectedDepartureSeats, setSelectedDepartureSeats] = React.useState();
  const [selectedReturnSeats, setSelectedReturnSeats] = React.useState([]);
  const [state, setState] = useContext(UserContext);


  function getClass() {
    if (location.state.searchData.fseatsAvailable) {
      return "First";
    } else if (location.state.searchData.bseatsAvailable) {
      return "Business";
    } else if (location.state.searchData.eseatsAvailable) {
      return "Economy";
    }
  }

  function getNoOfPassengers() {
    if (location.state.searchData.fseatsAvailable) {
      return location.state.searchData.fseatsAvailable;
    } else if (location.state.searchData.bseatsAvailable) {
      return location.state.searchData.bseatsAvailable;
    } else if (location.state.searchData.eseatsAvailable) {
      return location.state.searchData.eseatsAvailable;
    }
  }

  let baseURL = "http://localhost:8000/reservations/addReservation";

  const saveselectedDept = () => {
    console.log(selectedDepartureSeats);
    axios
      .post(baseURL, {
        User: state.user._id,
        flight: location.state.selectedDepF._id,
        choosenCabin: getClass(),
        noOfPassengers: getNoOfPassengers(),
        seatsNo: selectedDepartureSeats,
      },
      {
        headers: {
          Authorization: "Bearer " + state.token,
        },
      })
      .then((response) => {
        console.log("saved!");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const saveselectedRet = () => {
    axios
      .post(baseURL, {
        User: state.user._id,
        flight: location.state.selectedRetF._id,
        choosenCabin: getClass(),
        noOfPassengers: getNoOfPassengers(),
        seatsNo: selectedReturnSeats,
      },
      {
        headers: {
          Authorization: "Bearer " + state.token,
        },
      })
      .then((response) => {
        console.log("saved!");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  function getStepContent(step) {
    switch (step) {
      case 0:
        return (
          <SeatsDeparture
            setDis={setDis}
            setSelectedDeparture={setSelectedDepartureSeats}
            selectedDepF={location.state.selectedDepF}
            searchData={location.state.searchData}
          />
        );
      case 1:
        return (
          <SeatsReturn
            setDis={setDis}
            setSelectedReturn={setSelectedReturnSeats}
            selectedRetF={location.state.selectedRetF}
            searchData={location.state.searchData}
          />
        );
      case 2:
        return (
          <Review
            selectedDepartureSeats={selectedDepartureSeats} //seats
            selectedReturnSeats={selectedReturnSeats} //seats
            searchData={location.state.searchData} //no of passengers and cabin
            selectedRetF={location.state.selectedRetF} //flight
            selectedDepF={location.state.selectedDepF} //flight
          />
        );
      default:
        throw new Error("Unknown step");
    }
  }

  const handleNext = () => {
    setActiveStep(activeStep + 1);

    if (activeStep === steps.length - 1) {

      saveselectedDept();
      saveselectedRet();

      console.log("Saved");
    }
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };
  const isLoggedIn = state && state.token != "";

  return (
    <>
    {!isLoggedIn? 
      <Unauthorized/>
       :
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <br />
      <br />
      <Container component="main" maxWidth="lg" sx={{ mb: 4 }}>
        <Paper
          variant="outlined"
          sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
        >
          <Typography component="h1" variant="h4" align="center">
            Pick Seats
          </Typography>
          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <React.Fragment>
            {activeStep === steps.length ? (
              <React.Fragment>
                <div style={{ justifyContent: "center" }}>
                  <Typography
                    variant="h5"
                    gutterBottom
                    style={{ justifyContent: "center", textAlign: "center" }}
                  >
                    Thank you for choosing to fly with KiteAir!
                  </Typography>
                
                </div>

                <div style={{textAlign: "center"}}>
                  <div style={{display: "inline-block", textAlign: "left"}}>
                  <br />
                  
                  Your seats have been reserved successfully! <br />
                    You are now one step away from finalizing your reservation,{" "}
                    <br />
                    All you have to do is proceed with payment!
                  </div>
                </div>

                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                  <Button variant="contained">Proceed to Payment</Button>
                </div>
              </React.Fragment>
            ) : (
              <React.Fragment>
                {getStepContent(activeStep)}
                <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                  {activeStep !== 0 && (
                    <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                      Back
                    </Button>
                  )}

                  <Button
                    variant="contained"
                    onClick={handleNext}
                    disabled={dis === 0}
                    sx={{ mt: 3, ml: 1 }}
                  >
                    {activeStep === steps.length - 1 ? "Confirm" : "Next"}
                  </Button>
                </Box>
              </React.Fragment>
            )}
          </React.Fragment>
        </Paper>
      </Container>
    </ThemeProvider>
    }
</>
  );
}
