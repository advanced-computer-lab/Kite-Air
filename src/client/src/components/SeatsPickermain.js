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
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { UserContext } from "../context/index.js";

import SeatsDeparture from "./SeatsDeparture";
import SeatsReturn from "./SeatsReturn";
import Review from "./Review";
import axios from "axios";
import StripeCheckout from "react-stripe-checkout";

import Unauthorized from "./Unauthorized";

const steps = ["Departure Seats", "Return Seats", "Review"];

const theme = createTheme();

export default function SeatsPickermain(props) {
  const location = useLocation();
  const [state, setState] = useContext(UserContext);

  const [activeStep, setActiveStep] = React.useState(0);
  const [dis, setDis] = React.useState(0);
  const [selectedDepartureSeats, setSelectedDepartureSeats] = React.useState();
  const [selectedReturnSeats, setSelectedReturnSeats] = React.useState([]);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
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
      console.log(location.state.searchData.eseatsAvailable);
      return location.state.searchData.eseatsAvailable;
    }
  }

  function getPrice() {
    if (location.state.searchData.fseatsAvailable) {
      return location.state.selectedDepF.fprice;
    } else if (location.state.searchData.bseatsAvailable) {
      return location.state.selectedDepF.bprice;
    } else if (location.state.searchData.eseatsAvailable) {
      console.log(location.state.selectedDepF.fprice);
      return location.state.selectedDepF.eprice;
    }
  }

  function getBaggage() {
    if (location.state.searchData.fseatsAvailable) {
      return location.state.selectedDepF.fbaggage;
    } else if (location.state.searchData.bseatsAvailable) {
      return location.state.selectedDepF.bbaggage;
    } else if (location.state.searchData.eseatsAvailable) {
      return location.state.selectedDepF.ebaggage;
    }
  }

  let baseURL = "http://localhost:8000/reservations/addReservation";

  const saveselectedDept = () => {
    console.log(selectedDepartureSeats);
    axios
      .post(
        baseURL,
        {
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
        }
      )
      .then((response) => {
        console.log("saved!");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const saveselectedRet = () => {
    axios
      .post(
        baseURL,
        {
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
        }
      )
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
      // saveselectedRet();
      // saveselectedDept();
    }
  };

  const navigate = useNavigate();
  const displayButton = () => {
    navigate("/myBookings");
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };
  const isLoggedIn = state && state.token != "";
  function onPaymentSuccess() {
    // send the stripe token to your backend!
    //setPaymentSuccess(true);
    console.log(paymentSuccess);
  }

  const [product, setProduct] = useState({
    name: "flight reserved",
    price: getNoOfPassengers() * getPrice(),
  });

  const makePayment = (token) => {
    saveselectedDept();
    saveselectedRet();

    let text1 = "";
    for (let i of selectedDepartureSeats) {
      text1 += i + " ";
    }
    let text2 = "";
    for (let i of selectedReturnSeats) {
      text2 += i + " ";
    }
    var info = ` 
    <!DOCTYPE html>
    <html>
    <head>
    <meta charset="UTF-8">
    </head>
    <body>
    <p>Hello ${state.user.FirstName},</p>
    <p> Thank you for choosing to fly with KiteAir!</p>
    <p>Here's your flight reservation.</p>
<div>
<table class="tg" style="width:100%;border-collapse:collapse">
<thead>
<tr>
<td class="tg-0lax" style="font-weight:bold">
</td>
<td class="tg-0lax" style="font-weight:bold"> Departure Flight</td>
<td class="tg-0lax" style="font-weight:bold">Return Flight</td>
</tr>
</thead>
<tbody>
<tr>
<td class="tg-0lax" style="font-weight:bold">
  </td><td class="tg-0lax"> 
 </td><td class="tg-0lax">  
</td></tr><tr><td class="tg-0lax" style="border-bottom:1px solid #ddd;padding:8px;font-weight:bold"> Flight No. </td>
<td style="border-bottom:1px solid #ddd;padding:8px">${
      location.state.selectedDepF.FlightNo
    }</td>
<td style="border-bottom:1px solid #ddd;padding:8px">${
      location.state.selectedRetF.FlightNo
    }</td>
</tr>
<tr>
<td style="border-bottom:1px solid #ddd;padding:8px;font-weight:bold"> From - To</td>
<td style="border-bottom:1px solid #ddd;padding:8px"> ${
      location.state.selectedDepF.From
    } - ${location.state.selectedDepF.To}</td>
<td style="border-bottom:1px solid #ddd;padding:8px"> ${
      location.state.selectedDepF.To
    } - ${location.state.selectedDepF.From}</td>
</tr>
<tr><td style="border-bottom:1px solid #ddd;padding:8px;font-weight:bold"> Departure Date </td>
<td style="border-bottom:1px solid #ddd;padding:8px">${location.state.selectedDepF.FlightDate.replaceAll(
      "-",
      "/"
    )} </td>
<td style="border-bottom:1px solid #ddd;padding:8px"> ${location.state.selectedRetF.FlightDate.replaceAll(
      "-",
      "/"
    )} </td>
</tr>
<tr><td style="border-bottom:1px solid #ddd;padding:8px;font-weight:bold"> Departure - Arrival</td>
<td style="border-bottom:1px solid #ddd;padding:8px">  ${
      location.state.selectedDepF.DepartureTime
    } - ${" "}
${location.state.selectedDepF.ArrivalTime}</td>
<td style="border-bottom:1px solid #ddd;padding:8px">  ${
      location.state.selectedRetF.DepartureTime
    } - ${" "}
${location.state.selectedRetF.ArrivalTime}</td>
</tr>
<tr>
<td style="border-bottom:1px solid #ddd;padding:8px;font-weight:bold">Cabin Class</td>
<td style="border-bottom:1px solid #ddd;padding:8px"> ${getClass()}</td>
<td style="border-bottom:1px solid #ddd;padding:8px">${getClass()}</td>
</tr>
<tr>
<td style="border-bottom:1px solid #ddd;padding:8px;font-weight:bold">Baggage Allowance</td>
<td style="border-bottom:1px solid #ddd;padding:8px">${getBaggage(
      location.state.selectedDepF
    )} checked bags, 1 Carry-on</td>
<td style="border-bottom:1px solid #ddd;padding:8px">${getBaggage(
      location.state.selectedRetF
    )} checked bags, 1 Carry-on</td>
</tr>
<tr><td style="border-bottom:1px solid #ddd;padding:8px;font-weight:bold">Number of Passengers</td>
<td style="border-bottom:1px solid #ddd;padding:8px">${getNoOfPassengers()}</td><td style="border-bottom:1px solid #ddd;padding:8px">${getNoOfPassengers()}</td>
</tr>
<tr><td style="border-bottom:1px solid #ddd;padding:8px;font-weight:bold">Ticket Price (per 1)</td>
<td style="border-bottom:1px solid #ddd;padding:8px"> ${getPrice(
      location.state.selectedDepF
    )}</td><td style="border-bottom:1px solid #ddd;padding:8px"> ${getPrice(
      location.state.selectedDepF
    )}</td>
</tr>
<tr><td style="border-bottom:1px solid #ddd;padding:8px;font-weight:bold">Seats Chosen</td>
<td style="border-bottom:1px solid #ddd;padding:8px">
${text1}
</td>
<td style="border-bottom:1px solid #ddd;padding:8px">${text2}
</td>
</tr>
<tr><td style="border-bottom:1px solid #ddd;padding:8px;font-weight:bold">Total price</td>
<td style="border-bottom:1px solid #ddd;padding:8px">${
      getNoOfPassengers() * getPrice()
    }</td><td style="border-bottom:1px solid #ddd;padding:8px">${
      getNoOfPassengers() * getPrice()
    }</td>
</tr>
</tbody></table></div>
<br/>
</body>
</html>
<p>KITE AIR &#9992;</p>
      `;

    var email = `${state.user.Email}`;
    console.log(email);
    var json = {};
    json["info"] = info.toString();
    axios
      .post("http://localhost:8000/reservations/EmailButton", {
        data1: info.toString(),
        data2: email.toString(),
      })
      .then((res) => {
        console.log("email is sent");
      })
      .catch((err) => {
        console.log("Error in FlightDelete!");
      });

    setPaymentSuccess(true);
    console.log("hereeeeeeeeeeeeeeekede");
    const body = {
      token,
      product,
    };
    const headers = {
      "Content-Type": "application/json",
    };

    return fetch("http://localhost:8000/payment", {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    })
      .then((response) => {
        console.log("RESPONSE ", response);
        const { status } = response;
        console.log("STATUS ", status);
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
      {!isLoggedIn ? (
        <Unauthorized />
      ) : (
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
                Choose your seats!
              </Typography>
              <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
                {steps.map((label) => (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
              <React.Fragment>
                {paymentSuccess ? (
                  <React.Fragment>
                    <div style={{ justifyContent: "center" }}>
                      <Typography
                        variant="h5"
                        gutterBottom
                        style={{
                          justifyContent: "center",
                          textAlign: "center",
                        }}
                      >
                        Thank you for choosing to fly with KiteAir!
                      </Typography>
                    </div>

                    <div style={{ textAlign: "center" }}>
                      <div
                        style={{ display: "inline-block", textAlign: "left" }}
                      >
                        <br />
                        Your seats have been reserved successfully! <br />
                        Please check your email to view your reservation
                        details. <br />
                      </div>
                    </div>
                    <Box sx={{ display: "flex", justifyContent: "flex-end" }}>

                        <Button onClick={displayButton} sx={{ mt: 3, ml: 1 }} variant="contained">
                          My Bookings
                        </Button>

                    </Box>
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

                      {activeStep === steps.length - 1 ? (
                        <div>
                          <br />
                          <StripeCheckout
                            stripeKey="pk_test_51K8SsmEqt2T4r3H7Dv4W361XbP9J3TNHzMQDKVtljLjJaoHg8aQKnhDTcfFaWtLO69MG8DK8ZuVwgmmkbB3Nea2p00IUseecKz"
                            amount={getNoOfPassengers() * getPrice() * 100}
                            imageUrl="https://pbs.twimg.com/profile_images/778378996580888577/MFKh-pNn_400x400.jpg"
                            name="Payment"
                            currency="USD"
                            token={makePayment}
                            allowRememberMe={false}
                            onPaymentSuccess={onPaymentSuccess}
                          />
                        </div>
                      ) : (
                        <Button
                          variant="contained"
                          onClick={handleNext}
                          disabled={dis === 0}
                          sx={{ mt: 3, ml: 1 }}
                        >
                          Next
                        </Button>
                      )}
                    </Box>
                  </React.Fragment>
                )}
              </React.Fragment>
            </Paper>
          </Container>
        </ThemeProvider>
      )}
    </>
  );
}
