import * as React from 'react';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';


export default function DatePick(props) {


    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Stack spacing={3}>
            <DesktopDatePicker
              label= {props.label}
              inputFormat="dd/MM/yyyy"
              value={props.val}
              onChange={props.handleChange}
              renderInput={(params) => <TextField {...params} />}

            />
         
         
          </Stack>
        </LocalizationProvider>
      );
    }