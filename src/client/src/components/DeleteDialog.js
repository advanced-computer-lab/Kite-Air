import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import axios from 'axios';
import ViewFlights from './ViewFlights';

var inn = [];
export default function DeleteDialog({rows}) {
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const handleClickOpen = () => {
    setOpen(true);
  };


  const deleteFlights = (rowsIn) => {

    for (let i in rowsIn){
    axios
      .delete('http://localhost:8000/flights/' + i)
      .then(res => {
        console.log("success");
         window.location.reload(false);
        setOpen(false);

      })
      .catch(err => {
        console.log("Error in FlightDelete!");
      }
      ) }

    // console.log( Object.keys(rowsIn).length);

    // handleClose();
};

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
        <Button variant="contained" color="error" onClick={handleClickOpen}> Delete </Button>
      <Dialog
        fullScreen={fullScreen}
        open= {open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {"Are you sure you want to delete the selected item(s)?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Upon clicking Agree, the selected item(s) will be permenantly deleted.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus align="left" onClick={handleClose}>
            Disagree
          </Button>
          <Button onClick={deleteFlights(rows)} autoFocus color="error" >
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}


