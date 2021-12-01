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
import DepartureFlights from "./DepartureFlights";
import ReturnFlights from "./ReturnFlights";
import Summary from "./Summary";

const steps = ["Departure Flight", "Return Flight", "Summary"];

const theme = createTheme();

export default function Checkout(props) {
  const [activeStep, setActiveStep] = React.useState(0);

  const [selectedDep, setselectedDep] = React.useState({});
  const [selectedRet, setselectedRet] = React.useState({});

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };


  function getStepContent(step) {
    switch (step) {
      case 0:
        return (
          <DepartureFlights
            handleNext={handleNext}
            depFlights={props.depFlights}
            setselectedDep={setselectedDep}
            searchData={props.searchData}
          />
        );
      case 1:
        return (
          <ReturnFlights
            handleNext={handleNext}
            depFlights={props.retlights}
            setselectedRet={setselectedRet}
            searchData={props.searchData}

          />
        );
      case 2:
        return <Summary selectedDep={selectedDep} selectedRet={selectedRet} searchData={props.searchData} />;
      default:
        throw new Error("Unknown step");
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <Container component="main" maxWidth="lg" sx={{ mb: 4 }}>
        <Paper
          variant="outlined"
          sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
        >
          <Typography component="h1" variant="h4" align="center">
            Select Flight
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
                {/* <Typography variant="h5" gutterBottom>
                  Thank you for your order.
                </Typography> */}
                {/* <Typography variant="subtitle1">
                  Your order number is #2001539. We have emailed your order
                  confirmation, and will send you an update when your order has
                  shipped.
                </Typography> */}
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

                
                </Box>
              </React.Fragment>
            )}
          </React.Fragment>
        </Paper>
      </Container>
    </ThemeProvider>
  );
}
