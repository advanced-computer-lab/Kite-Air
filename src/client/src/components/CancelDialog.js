import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import axios from "axios";
import { UserContext } from "../context/index.js";
import { useState, useEffect, useContext } from "react";

var canceledFlight;

export default function CancelDialog({ reser }) {
  const [open, setOpen] = React.useState(false);
  const [state, setState] = useContext(UserContext);
  console.log(state.user.FirstName);

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

        var info = `
        <!DOCTYPE html>
        <html>
        <head>
        <meta charset="UTF-8">
        </head>
        <body>
        <p>Hello ${state.user.FirstName},</p>
        <p> This email confirms that your reservation with the following details  has been cancelled.</p>
    <div>
    <table class="tg" style="width:100%;border-collapse:collapse">
    <tbody>
    <tr>
    <td class="tg-0lax" style="font-weight:bold">
      </td><td class="tg-0lax"> 
     </td><td class="tg-0lax">  
    </td></tr><tr><td class="tg-0lax" style="border-bottom:1px solid #ddd;padding:8px;font-weight:bold"> Flight No. </td>
    <td style="border-bottom:1px solid #ddd;padding:8px">${reser[2]} </td>
    </tr>
    <tr>
    <td style="border-bottom:1px solid #ddd;padding:8px;font-weight:bold"> From - To</td>
    <td style="border-bottom:1px solid #ddd;padding:8px"> ${reser[3]} -  ${reser[4]}</td>
    </tr>
    <tr><td style="border-bottom:1px solid #ddd;padding:8px;font-weight:bold"> Departure Date </td>
    <td style="border-bottom:1px solid #ddd;padding:8px">${reser[5]} </td>
    </tr>
    <tr><td style="border-bottom:1px solid #ddd;padding:8px;font-weight:bold"> Departure - Arrival</td>
    <td style="border-bottom:1px solid #ddd;padding:8px">${reser[6]} - ${reser[7]} </td>
    </tr>
    <tr><td style="border-bottom:1px solid #ddd;padding:8px;font-weight:bold"> Terminal </td>
    <td style="border-bottom:1px solid #ddd;padding:8px">${reser[8]} </td>
    </tr>
    <tr><td style="border-bottom:1px solid #ddd;padding:8px;font-weight:bold">Cabin</td>
    <td style="border-bottom:1px solid #ddd;padding:8px">${reser[9]}</td>
    </tr>
    <tr><td style="border-bottom:1px solid #ddd;padding:8px;font-weight:bold">Baggage(per ticket)</td>
    <td style="border-bottom:1px solid #ddd;padding:8px">${reser[10]} </td>
    </tr>
    <tr><td style="border-bottom:1px solid #ddd;padding:8px;font-weight:bold"> Price(per ticket)</td>
    <td style="border-bottom:1px solid #ddd;padding:8px">${reser[11]} </td>
    </tr>
    <tr><td style="border-bottom:1px solid #ddd;padding:8px;font-weight:bold"> Passengers#</td>
    <td style="border-bottom:1px solid #ddd;padding:8px">${reser[12]}</td>
    </tr>
    <tr><td style="border-bottom:1px solid #ddd;padding:8px;font-weight:bold"> Seats</td>
    <td style="border-bottom:1px solid #ddd;padding:8px">${reser[14]} </td>
    </tr>
    <tr><td style="border-bottom:1px solid #ddd;padding:8px;font-weight:bold"> Refund amount</td>
    <td style="border-bottom:1px solid #ddd;padding:8px">${reser[13]} </td>
    </tr>
    </tbody></table></div>
  <p>If you think this cancellation is in error or you have other questions, please contact us on this email.</p>
    <br/>
    </body>
    </html>
    <p>KITE AIR &#9992;</p>
      `;
        var email = `${state.user.Email}`;
        var json = {};
        json["info"] = info.toString();
        axios
          .post("http://localhost:8000/reservations/send", {
            data1: info.toString(),
            data2: email.toString(),
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
          <Button color="error" align="right" onClick={cancelFlight} autoFocus>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

// This email confirms that your reservation with details:
//         <p>Flight Number: ${reser[2]} <strong>from</strong> ${reser[3]} <strong>to</strong> ${reser[4]} with flight depature date ${reser[5]} has been cancelled.
//         <br/>
//         Your refund amount is ${reser[13]}.
//         </p>
