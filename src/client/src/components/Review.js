import * as React from "react";
import Typography from "@mui/material/Typography";


export default function Review(props) {
  /*
  selectedDepF
  selectedRetF
  
  searchData
  
  selectedReturnSeats
  selectedDepartureSeats*/




// flight id , user id, choosenCabin, noOfpassengers, seatsNo

  function getClass() {
    if (props.searchData.fseatsAvailable) {
      return "First";
    } else if (props.searchData.bseatsAvailable) {
      return "Business";
    } else if (props.searchData.eseatsAvailable) {
      return "Economy";
    }
  }

  function getNoOfPassengers() {
    if (props.searchData.fseatsAvailable) {
      return props.searchData.fseatsAvailable;
    } else if (props.searchData.bseatsAvailable) {
      return props.searchData.bseatsAvailable;
    } else if (props.searchData.eseatsAvailable) {
      return props.searchData.eseatsAvailable;
    }
  }

  function getPrice() {
    if (props.searchData.fseatsAvailable) {
      return props.selectedDepF.fprice;
    } else if (props.searchData.bseatsAvailable) {
      return props.selectedDepF.bprice;
    } else if (props.searchData.eseatsAvailable) {
      return props.selectedDepF.eprice;
    }
  }

  function getBaggage() {
    if (props.searchData.fseatsAvailable) {
      return props.selectedDepF.fbaggage;
    } else if (props.searchData.bseatsAvailable) {
      return props.selectedDepF.bbaggage;
    } else if (props.searchData.eseatsAvailable) {
      return props.selectedDepF.ebaggage;
    }
  }

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Reservation Review
      </Typography>
      <div>
      <table class="tg" style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{}}>
            <td class="tg-0lax" style={{ fontWeight: "bold" }}></td>

            <td class="tg-0lax" style={{ fontWeight: "bold" }}>
              {" "}
              Departure Flight
            </td>
            <td class="tg-0lax" style={{ fontWeight: "bold" }}>
              Return Flight
            </td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="tg-0lax" style={{ fontWeight: "bold" }}>
              &nbsp;{" "}
            </td>

            <td class="tg-0lax"> &nbsp;</td>
            <td class="tg-0lax">&nbsp; </td>
          </tr>
          <tr>
            <td
              class="tg-0lax"
              style={{
                borderBottom: "1px solid #ddd",
                padding: "8px",
                fontWeight: "bold",
              }}
            >
              {" "}
              Flight No.{" "}
            </td>

            <td style={{ borderBottom: "1px solid #ddd", padding: "8px" }}>
              {props.selectedDepF.FlightNo}
            </td>
            <td style={{ borderBottom: "1px solid #ddd", padding: "8px" }}>
              {props.selectedRetF.FlightNo}
            </td>
          </tr>
          <tr>
            <td
              style={{
                borderBottom: "1px solid #ddd",
                padding: "8px",
                fontWeight: "bold",
              }}
            >
              {" "}
              From - To
            </td>

            <td style={{ borderBottom: "1px solid #ddd", padding: "8px" }}>
              {props.selectedDepF.From} - {props.selectedDepF.To}
            </td>
            <td style={{ borderBottom: "1px solid #ddd", padding: "8px" }}>
              {props.selectedRetF.From} - {props.selectedRetF.To}
            </td>
          </tr>
          <tr>
            <td
              style={{
                borderBottom: "1px solid #ddd",
                padding: "8px",
                fontWeight: "bold",
              }}
            >
              {" "}
              Departure Date{" "}
            </td>

            <td style={{ borderBottom: "1px solid #ddd", padding: "8px" }}>
              {props.selectedDepF.FlightDate.replaceAll("-", "/")}{" "}
            </td>
            <td style={{ borderBottom: "1px solid #ddd", padding: "8px" }}>
              {props.selectedRetF.FlightDate.replaceAll("-", "/")}{" "}
            </td>
          </tr>
          <tr>
            <td
              style={{
                borderBottom: "1px solid #ddd",
                padding: "8px",
                fontWeight: "bold",
              }}
            >
              {" "}
              Departure - Arrival
            </td>

            <td style={{ borderBottom: "1px solid #ddd", padding: "8px" }}>
              {props.selectedDepF.DepartureTime} -{" "}
              {props.selectedDepF.ArrivalTime}
            </td>
            <td style={{ borderBottom: "1px solid #ddd", padding: "8px" }}>
              {props.selectedRetF.DepartureTime} -{" "}
              {props.selectedRetF.ArrivalTime}
            </td>
          </tr>

          <tr>
            <td
              style={{
                borderBottom: "1px solid #ddd",
                padding: "8px",
                fontWeight: "bold",
              }}
            >
              Cabin Class
            </td>

            <td style={{ borderBottom: "1px solid #ddd", padding: "8px" }}>
              {getClass()}
            </td>
            <td style={{ borderBottom: "1px solid #ddd", padding: "8px" }}>
              {getClass()}
            </td>
          </tr>

          <tr>
            <td
              style={{
                borderBottom: "1px solid #ddd",
                padding: "8px",
                fontWeight: "bold",
              }}
            >
              Baggage Allowance
            </td>

            <td style={{ borderBottom: "1px solid #ddd", padding: "8px" }}>
              {getBaggage(props.selectedDepF)} checked bags, 1 Carry-on
            </td>
            <td style={{ borderBottom: "1px solid #ddd", padding: "8px" }}>
              {getBaggage(props.selectedRetF)} checked bags, 1 Carry-on
            </td>
          </tr>
          <tr>
            <td
              style={{
                borderBottom: "1px solid #ddd",
                padding: "8px",
                fontWeight: "bold",
              }}
            >
              Number of Passengers
            </td>

            <td style={{ borderBottom: "1px solid #ddd", padding: "8px" }}>
              {getNoOfPassengers()}
            </td>
            <td style={{ borderBottom: "1px solid #ddd", padding: "8px" }}>
              {getNoOfPassengers()}
            </td>
          </tr>
          <tr>
            <td
              style={{
                borderBottom: "1px solid #ddd",
                padding: "8px",
                fontWeight: "bold",
              }}
            >
              Ticket Price (per 1)
            </td>

            <td style={{ borderBottom: "1px solid #ddd", padding: "8px" }}>
              ${getPrice(props.selectedDepF)}
            </td>
            <td style={{ borderBottom: "1px solid #ddd", padding: "8px" }}>
              ${getPrice(props.selectedRetF)}
            </td>

          </tr>
          <tr>
            <td
              style={{
                borderBottom: "1px solid #ddd",
                padding: "8px",
                fontWeight: "bold",
              }}
            >
              Seats Chosen
            </td>

            <td style={{ borderBottom: "1px solid #ddd", padding: "8px" }}>
            {props.selectedDepartureSeats}
            </td>
            <td style={{ borderBottom: "1px solid #ddd", padding: "8px" }}>
             {props.selectedReturnSeats}
            </td>
          </tr>
        </tbody>
      </table>


    
      </div>
    </React.Fragment>
  );
}
