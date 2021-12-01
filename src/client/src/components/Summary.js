import * as React from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom"; // version 5.2.0

export default function Summary(props) {
  //searchData
  const navigate = useNavigate();
  let loggedIn = true;

  
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
  };

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Reservation Summary
      </Typography>
      <table class="tg" style={{width:"100%"}}>
        <thead>
          <tr>
          <td class="tg-0lax" style={{fontWeight: "bold"}}></td>

            <td class="tg-0lax" style={{fontWeight: "bold"}}> Departure flight</td>
            <td class="tg-0lax" style={{fontWeight: "bold"}}>Return Flight</td>
          </tr>
        </thead>
        <tbody>
        <tr>
          <td class="tg-0lax" style={{fontWeight: "bold"}}>&nbsp; </td>

            <td class="tg-0lax"> &nbsp;</td>
            <td class="tg-0lax">&nbsp; </td>
          </tr>
          <tr>
          <td class="tg-0lax" style={{fontWeight: "bold"}}> Flight Number</td>

            <td class="tg-0lax">{props.selectedDep.FlightNo}</td>
            <td class="tg-0lax">{props.selectedRet.FlightNo}</td>
          </tr>
          <tr>
          <td class="tg-0lax" style={{fontWeight: "bold"}}> From-To</td>

            <td class="tg-0lax">{props.selectedDep.From} - {props.selectedDep.To}</td>
            <td class="tg-0lax">{props.selectedRet.From} - {props.selectedRet.To}</td>
          </tr>
          <tr>
          <td class="tg-0lax" style={{fontWeight: "bold"}}> Departure Date </td>

            <td class="tg-0lax">{props.selectedDep.FlightDate.replaceAll("-", "/")} </td>
            <td class="tg-0lax">{props.selectedRet.FlightDate.replaceAll("-", "/")} </td>
          </tr>
          <tr>
          <td class="tg-0lax" style={{fontWeight: "bold"}}> Departure - Arrival</td>

            <td class="tg-0lax">{props.selectedDep.DepartureTime} - {props.selectedDep.ArrivalTime}</td>
            <td class="tg-0lax">{props.selectedRet.DepartureTime} - {props.selectedRet.ArrivalTime}</td>
          </tr>
          
          <tr>
          <td class="tg-0lax" style={{fontWeight: "bold"}}>Cabin Class</td>

            <td class="tg-0lax">{getClass()}</td>
            <td class="tg-0lax">{getClass()}</td>
          </tr>

          <tr>
          <td class="tg-0lax" style={{fontWeight: "bold"}}>Baggage Allowance</td>

            <td class="tg-0lax">{getBaggage(props.selectedDep)} checked bags 1 Carry-on</td>
            <td class="tg-0lax">{getBaggage(props.selectedRet)} checked bags 1 Carry-on</td>
          </tr>
          <tr>
         
          <td class="tg-0lax" style={{fontWeight: "bold"}}>Number of Passengers</td>

            <td class="tg-0lax">{getNoOfPassengers()}</td>
            <td class="tg-0lax">{getNoOfPassengers()}</td>
          </tr>
          <tr>
          <td class="tg-0lax" style={{fontWeight: "bold"}}>Ticket Price (per 1)</td>

            <td class="tg-0lax">${getPrice(props.selectedDep)}</td>
            <td class="tg-0lax">${getPrice(props.selectedRet)}</td>
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
