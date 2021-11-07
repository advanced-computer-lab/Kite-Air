import * as React from 'react';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import TimePicker from '@mui/lab/TimePicker';


export default function TimePick(props) {


  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Stack spacing={3}>
     
     
        <TimePicker
              ampm={false}
              label= {props.labels}    
              value={props.val}
              onChange={props.handleChange}
              renderInput={(params) => <TextField {...params} />}
        />
     
      </Stack>
    </LocalizationProvider>
  );
}

