import * as React from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom"; // version 5.2.0
import { useContext } from "react";
import { UserContext } from "../context/index.js";

export default function Summary(props) {
  //searchData
  const [state, setState] = useContext(UserContext);
  const navigate = useNavigate();
  let loggedIn =  state && state.user;

  function getBaggage(selectedDepF) {
    if (props.searchData.fseatsAvailable) {
      return selectedDepF.fbaggage;
    } else if (props.searchData.bseatsAvailable) {
      return selectedDepF.bbaggage;
    } else if (props.searchData.eseatsAvailable) {
      return selectedDepF.ebaggage;
    }
  }

  function getClass() {
    if (props.searchData.fseatsAvailable) {
      return "First";
    } else if (props.searchData.bseatsAvailable) {
      return "Business";
    } else if (props.searchData.eseatsAvailable) {
      return "Economy";
    }
  }

  function getPrice(selectedF) {
    if (props.searchData.fseatsAvailable) {
      return selectedF.fprice;
    } else if (props.searchData.bseatsAvailable) {
      return selectedF.bprice;
    } else if (props.searchData.eseatsAvailable) {
      return selectedF.eprice;
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

  const handleRedirection = () => {
    console.log("In nav");
    if (loggedIn) {
      navigate("/pickSeats", {
        state: {
          searchData: props.searchData,
          selectedDepF: props.selectedDep,
          selectedRetF: props.selectedRet,
        },
      });
    }
    else{
      
      navigate("/login");
      
    }
  };

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Reservation Summary
      </Typography>
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
              {props.selectedDep.FlightNo}
            </td>
            <td style={{ borderBottom: "1px solid #ddd", padding: "8px" }}>
              {props.selectedRet.FlightNo}
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
              {props.selectedDep.From} - {props.selectedDep.To}
            </td>
            <td style={{ borderBottom: "1px solid #ddd", padding: "8px" }}>
              {props.selectedRet.From} - {props.selectedRet.To}
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
              {props.selectedDep.FlightDate.replaceAll("-", "/")}{" "}
            </td>
            <td style={{ borderBottom: "1px solid #ddd", padding: "8px" }}>
              {props.selectedRet.FlightDate.replaceAll("-", "/")}{" "}
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
              {props.selectedDep.DepartureTime} -{" "}
              {props.selectedDep.ArrivalTime}
            </td>
            <td style={{ borderBottom: "1px solid #ddd", padding: "8px" }}>
              {props.selectedRet.DepartureTime} -{" "}
              {props.selectedRet.ArrivalTime}
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
              {getBaggage(props.selectedDep)} checked bags, 1 Carry-on
            </td>
            <td style={{ borderBottom: "1px solid #ddd", padding: "8px" }}>
              {getBaggage(props.selectedRet)} checked bags, 1 Carry-on
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
              ${getPrice(props.selectedDep)}
            </td>
            <td style={{ borderBottom: "1px solid #ddd", padding: "8px" }}>
              ${getPrice(props.selectedRet)}
            </td>
          </tr>
        </tbody>
      </table>

      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        {" "}
        <Button
          variant="contained"
          onClick={handleRedirection}
          sx={{ mt: 3, ml: 1 }}
        >
          Confirm
        </Button>
      </div>
    </React.Fragment>
  );
}
