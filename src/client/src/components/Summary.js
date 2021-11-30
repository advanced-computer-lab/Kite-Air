import * as React from 'react';
import Typography from '@mui/material/Typography';
import Button from "@mui/material/Button";


export default function Summary(props) {

  const [selectedDep, setselectedDep] = React.useState({});
  const [selectedRet, setselectedRet] = React.useState({});


  const handleRedirection = () => {
    //redirect to seats if logged in else redirct to login page
  };


  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Review
      </Typography>
      Departure flight Chosen: {props.selectedDep.FlightNo} <br />
      Return flight Chosen: {props.selectedRet.FlightNo}


      <div style={{display: 'flex', justifyContent: 'flex-end'}}>  <Button
                    variant="contained"
                    onclick={handleRedirection}
                    sx={{ mt: 3, ml: 1 }}
                  >
                    Confirm
                  </Button></div>
    </React.Fragment>
  );
  }