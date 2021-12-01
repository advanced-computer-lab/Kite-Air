import * as React from 'react';
import Typography from '@mui/material/Typography';

export default function Review(props) {



  // for(let i=0; i<props.selectedDeparture.length; i=i+2){
  //   // console.log(props.selectedDeparture.substring(i,i+2));

  // }
  //selectedRetF
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Review
      </Typography>
      Departure Seats Chosen: {props.selectedDeparture} <br />
      Return Seats Chosen: {props.selectedReturn}
    </React.Fragment>
  );
}