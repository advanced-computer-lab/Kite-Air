import * as React from 'react';
import Typography from '@mui/material/Typography';

export default function Review(props) {
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