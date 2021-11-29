import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import axios from "axios";

export default function CancelDialog({reser}) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const cancelFlight = () => {
      axios
      .delete('http://localhost:8000/reservations/' + reser[0])
      .then(res => {
        console.log("success");
         window.location.reload(false);
        setOpen(false);

      })
      .catch(err => {
        console.log("Error in FlightDelete!");
      }
      )};

  return (
    <div>
      <Button variant="contained" color="error" onClick={handleClickOpen}>
        Cancel
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you sure you want to cancel this flight?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          Upon clicking cancel, this flight will be permenantly cancelled.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button align = "left" onClick={handleClose}>Back</Button>
          <Button color="error" align = "right" onClick={cancelFlight} autoFocus>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
