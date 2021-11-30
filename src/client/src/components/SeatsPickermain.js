import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import SeatsDeparture from './SeatsDeparture';
import SeatsReturn from './SeatsReturn';
import Review from './Review';
import Payment from './PaymentForm';



const steps = ['Departure Seats', 'Return Seats', 'Review'];



const theme = createTheme();

export default function SeatsPickermain(props) {
  const [activeStep, setActiveStep] = React.useState(0);
  const [dis, setDis] = React.useState(0);
  const [selectedDeparture, setSelectedDeparture] = React.useState([]);
  const [selectedReturn, setSelectedReturn] = React.useState([]);

  function getStepContent(step) {
    switch (step) {
      case 0:
        return <SeatsDeparture setDis={setDis} setSelectedDeparture={setSelectedDeparture}  />;
      case 1:
        return <SeatsReturn setDis={setDis} setSelectedReturn={setSelectedReturn} />;
      case 2:
        return <Review selectedDeparture={selectedDeparture} selectedReturn={selectedReturn} />;
      default:
        throw new Error('Unknown step');
    }
  }

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <br />
      <br />
      <Container component="main" maxWidth="lg" sx={{ mb: 4 }}>
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
          <Typography component="h1" variant="h4" align="center">
            Confirm
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
                <Typography variant="h5" gutterBottom>
                  Thank you for choosing to fly with KiteAir!
                </Typography>
                <Typography variant="subtitle1">
                  Your seats have been reserved successfully! <br />
                  You are now one step away from finalizing your reservation... <br />
                  All you have to do is proceed with payment!
                </Typography>
                <div style={{display: 'flex', justifyContent: 'flex-end'}}><Button variant="contained">Proceed to Payment</Button></div>
              </React.Fragment>
            ) : (
              <React.Fragment>
                {getStepContent(activeStep)}
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
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
                    {activeStep === steps.length - 1 ? 'Confirm' : 'Next'}
                    {/* {activeStep === steps.length ? 'Proceed to Payment' : 'Next'} */}
                  </Button>
                </Box>
              </React.Fragment>
            )}
          </React.Fragment>
        </Paper>
      </Container>
    </ThemeProvider>
  );
}