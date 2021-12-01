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
        Review
      </Typography>
      <div>
        Departure Flight Details: <br />
        {props.selectedDepF.FlightNo} <br />
        {props.selectedDepF.From} <br />
        {props.selectedDepF.To} <br />
        {props.selectedDepF.FlightDate.replaceAll("-", "/")} <br />
        {props.selectedDepF.DepartureTime} <br />
        {props.selectedDepF.ArrivalTime} <br />
        {getClass()} <br />
        {getPrice()} <br />
        {getBaggage()} <br />
        Departure Seats Chosen: {props.selectedDepartureSeats} <br />
        Return Seats Chosen: {props.selectedReturnSeats}
      </div>
    </React.Fragment>
  );
}
