import * as React from 'react';
import Typography from '@mui/material/Typography';

export default function Summary(props) {
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Review
      </Typography>
      Departure flight Chosen: {} <br />
      Return flight Chosen: {}
    </React.Fragment>
  );
}