import * as React from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "../context/index.js";
import { toast } from "react-toastify";

export default function EmailButton({ entry }) {
  const [state, setState] = useContext(UserContext);

  function sendEmail() {
    console.log(
      state.user.FirstName +
        " " +
        entry[2] +
        " " +
        entry[3] +
        " " +
        entry[4] +
        " " +
        entry[5] +
        " " +
        entry[6] +
        " " +
        entry[7]
    );

    var info = ` 
    <!DOCTYPE html>
    <html>
    <head>
    <meta charset="UTF-8">
    </head>
    <body>
    <p>Hello ${state.user.FirstName},</p>
    <p>This email is sent upon your request. Here's your flight reservation.</p>
<div>
<table class="tg" style="width:100%;border-collapse:collapse">
<tbody>
<tr>
<td class="tg-0lax" style="font-weight:bold">
  </td><td class="tg-0lax"> 
 </td><td class="tg-0lax">  
</td></tr><tr><td class="tg-0lax" style="border-bottom:1px solid #ddd;padding:8px;font-weight:bold"> Flight No. </td>
<td style="border-bottom:1px solid #ddd;padding:8px">${entry[2]}</td>
</tr>
<tr>
<td style="border-bottom:1px solid #ddd;padding:8px;font-weight:bold"> From - To</td>
<td style="border-bottom:1px solid #ddd;padding:8px">${entry[3]} - ${entry[4]}</td>
</tr>
<tr><td style="border-bottom:1px solid #ddd;padding:8px;font-weight:bold"> Departure Date </td>
<td style="border-bottom:1px solid #ddd;padding:8px">${entry[5]} </td>
</tr>
<tr><td style="border-bottom:1px solid #ddd;padding:8px;font-weight:bold"> Departure - Arrival</td>
<td style="border-bottom:1px solid #ddd;padding:8px">${entry[6]} - ${entry[7]}</td>
</tr>
</tbody></table></div>
<br/>
</body>
</html>
<p>KITE AIR &#9992;</p>
      `;

    var email = `${state.user.Email}`;
    console.log(email);
    var json = {};
    json["info"] = info.toString();
    axios
      .post("http://localhost:8000/reservations/EmailButton", {
        data1: info.toString(),
        data2: email.toString(),
      })
      .then((res) => {
        toast.success("Email sent successfully!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        console.log("email is sent");
      })
      .catch((err) => {
        toast.error("Error sending mail.", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        console.log("Error sending mail.");
      });
  }

  return (
    <Button
      style={{ background: "#191b3a" }}
      variant="contained"
      onClick={sendEmail}
    >
      Email
    </Button>
  );
}

// <br/>    Flight Number: ${entry[2]}
// <br/>
//              From: ${entry[3]}
//              <br/>
//              To: ${entry[4]}
//              <br/>
//              FlightDate: ${entry[5]}
//              <br/>
//              DepartureTime: ${entry[6]},
//              <br/>
//              ArrivalTime: ${entry[7]},
//              <br/>

// <style>
// table, th, td {
//   border: 1px solid black;
//   border-collapse: collapse;
// }

// td {
//   background-color: #b7d7e8;
// }
// tr {
//   border-bottom: 1px solid #ddd;
// }
// th {
//   text-align: left;
//   background-color: #87bdd8;
// }
// </style>

// <table>
// <tr>
//   <th> Flight Number  </th>
//   <th> From  </th>
//   <th> To  </th>
//   <th> FlightDate  </th>
//   <th> DepartureTime  </th>
//   <th> ArrivalTime  </th>
// </tr>
// <tr>
//   <td> ${entry[2]}  </td>
//   <td> ${entry[3]}  </td>
//   <td> ${entry[4]}  </td>
//   <td> ${entry[5]}  </td>
//   <td> ${entry[6]}  </td>
//   <td> ${entry[7]}  </td>
// </tr>
// </table>
