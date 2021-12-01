import * as React from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom"; // version 5.2.0

export default function Summary(props) {
  //searchData
  const navigate = useNavigate();
  let loggedIn = true;

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
        Review
      </Typography>
      Departure flight Chosen: {props.selectedDep.FlightNo} <br />
      Return flight Chosen: {props.selectedRet.FlightNo}
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        {" "}
        <Button
          variant="contained"
          onClick={handleRedirection}
          sx={{ mt: 3, ml: 1 }}
        >
          Confirmm
        </Button>
      </div>
    </React.Fragment>
  );
}
