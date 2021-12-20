import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import axios from "axios";

var canceledFlight;

export default function CancelDialog({ reser }) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const cancelFlight = () => {
    axios
      .delete("http://localhost:8000/reservations/" + reser[0])
      .then((res) => {
        console.log("success");
        var newSeats = 0;
        if (reser[9] === "Business") {
          newSeats = reser[12] + reser[16];

          const data = {
            FlightNo: reser[2],
            From: reser[3],
            To: reser[4],
            Terminal: reser[8],
            FlightDate: reser[5],
            fseatsAvailable: reser[15],
            bseatsAvailable: newSeats,
            eseatsAvailable: reser[17],
            DepartureTime: reser[6],
            ArrivalTime: reser[7],
          };

          axios
            .put("http://localhost:8000/flights/" + reser[1], data)
            .then((res) => {
              console.log(data);
              console.log("success");
              alert("Success");
              window.location.reload(false);

            })
            .catch((err) => {
              console.log("Error in business seats update!");
            });

        } else {
          if (reser[9] === "Economy") {
            newSeats = reser[12] + reser[17];

            const data = {
              FlightNo: reser[2],
              From: reser[3],
              To: reser[4],
              Terminal: reser[8],
              FlightDate: reser[5],
              fseatsAvailable: reser[15],
              bseatsAvailable: reser[16],
              eseatsAvailable: newSeats,
              DepartureTime: reser[6],
              ArrivalTime: reser[7],
            };

            axios
              .put("http://localhost:8000/flights/" + reser[1], data)
              .then((res) => {
                console.log(data);
                console.log("success");
                alert("Success");
                window.location.reload(false);

              })
              .catch((err) => {
                console.log("Error in economy seats update!");
              });
          } else {
            if (reser[9] === "First") {
              newSeats = reser[12] + reser[15];

              const data = {
                FlightNo: reser[2],
                From: reser[3],
                To: reser[4],
                Terminal: reser[8],
                FlightDate: reser[5],
                fseatsAvailable: newSeats,
                bseatsAvailable: reser[16],
                eseatsAvailable: reser[17],
                DepartureTime: reser[6],
                ArrivalTime: reser[7],
              };

              axios
                .put("http://localhost:8000/flights/" + reser[1], data)
                .then((res) => {
                  console.log(data);
                  console.log("success");

                  alert("Success");
                  window.location.reload(false);

                })
                .catch((err) => {
                  console.log("Error in first seats update!");
                });
            }
          }
        }

        setOpen(false);

        var info = `This email confirms that your reservation with details: 
        <p>Flight Number: ${reser[2]} <strong>from</strong> ${reser[3]} <strong>to</strong> ${reser[4]} with flight depature date ${reser[5]} has been cancelled.
        <br/>
        Your refund amount is ${reser[13]}.
        </p>
      `;
        var json = {};
        json["info"] = info.toString();
        axios
          .post("http://localhost:8000/reservations/send", {
            data: info.toString(),
          })
          .then((res) => {
            console.log("email is sent");
          });
      })
      .catch((err) => {
        console.log("Error in FlightDelete!");
      });
  };

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
          <Button align="left" onClick={handleClose}>
            Back
          </Button>
          <Button color="error" align="center" onClick={cancelFlight} autoFocus>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
