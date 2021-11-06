import * as React from 'react';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import TimePicker from '@mui/lab/TimePicker';
import DateTimePicker from '@mui/lab/DateTimePicker';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import MobileDatePicker from '@mui/lab/MobileDatePicker';
import { areDayPropsEqual } from '@mui/lab/PickersDay/PickersDay';

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
              shouldDisableTime = 'true'
            />
            {/* <MobileDatePicker
              label= {props.label}
              inputFormat="dd/MM/yyyy"
              value={props.value}
              onChange={props.handlechange}
              renderInput={(params) => <TextField {...params} />}
              
            /> */}
         
          </Stack>
        </LocalizationProvider>
      );
    }