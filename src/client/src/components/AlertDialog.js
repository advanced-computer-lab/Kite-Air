import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import axios from 'axios';
import {useState,useEffect} from 'react';

export default function AlertDialog({rows}) {
  const [open, setOpen] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };



// useEffect(
//   ()=>{

//     if(confirm){
//       deleteFlights(rows);
//     }
//   }
  
  
//   ,[]);




  const deleteFlights = () => {
    console.log('rows: ' + rows);

    for (let i in rows){
      console.log(rows[i]);
    axios
      .delete('http://localhost:8000/flights/' + rows[i])
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

  return (
    <div>
      <Button variant="contained" color="error" onClick={handleClickOpen}>
        Delete
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you sure you want to delete the selected item(s)?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Upon clicking "Agree", the selected item(s) will be permenantly deleted
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
          <Button onClick={deleteFlights} color="error" autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
