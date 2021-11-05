import axios from "axios";
import React, { useState } from "react";

const baseURL = "http://localhost:8000/flights/create-flights";

export default function CreateFlight() {
  const [flightno, setFlightNo] = useState(0);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [flightdate, setFlightDate] = useState("");
  const [cabin, setCabin] = useState("");
  const [seatsavailable, setSeatsAvailable] = useState("");
  // const [DepartureTime, setDepartureTime] = useState("");
  // const [ArrivalTime, setArrivalTime] = useState("");

  const inputsHandlerFlightNo = (e) => {
    setFlightNo(e.target.value);
  };
  const inputsHandlerFrom = (e) => {
    setFrom(e.target.value);
  };
  const inputsHandlerTo = (e) => {
    setTo(e.target.value);
  };
  const inputsHandlerFlightDate = (e) => {
    setFlightDate(e.target.value);
  };
  const inputsHandlerCabin = (e) => {
    setCabin(e.target.value);
  };
  const inputsHandlerSeatsAvailable = (e) => {
    setSeatsAvailable(e.target.value);
  };
  // const inputsHandlerDepartureTime = (e) => {
  //   setDepartureTime(e.target.value);
  // };
  // const inputsHandlerArrivalTime = (e) => {
  //   setArrivalTime(e.target.value);
  //   };

  const inputs = {
    
    From: from,
    To: to,
    FlightDate: flightdate,
    Cabin: cabin,
    SeatsAvailable: seatsavailable,
    FlightNo: flightno,
    // DepartureTime: DepartureTime,
    // ArrivalTime: ArrivalTime,
  };

  const submitButton =async () => {
     await axios
      .post(baseURL, inputs)
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="wrapper">
      <form onSubmit={submitButton}>
        <div className="form-group">
          <label>Enter Flight Number</label>
          <input
            type="Number"
            className="form-control"
            onChange={inputsHandlerFlightNo}
          />
        </div>
        <div className="form-group">
          <label>From</label>
          <input
            type="text"
            className="form-control"
            onChange={inputsHandlerFrom}
          />
        </div>
        <div className="form-group">
          <label>To</label>
          <input
            type="text"
            className="form-control"
            onChange={inputsHandlerTo}
          />
        </div>
        <div className="form-group">
          <label> flight Date</label>
          <input
            type="Date"
            className="form-control"
            onChange={inputsHandlerFlightDate}
          />
        </div>
        <div className="form-group">
          <label>Enter Cabin</label>

          <select className="form-control" onChange={inputsHandlerCabin}>
            <option value="First">First Class</option>
            <option value="Business">Business</option>
            <option value="Economy">Economy</option>
          </select>
        </div>
        <div className="form-group">
          <label>Enter Seats Available</label>
          <input
            type="text"
            className="form-control"
            onChange={inputsHandlerSeatsAvailable}
          />
        </div>
        {/* <div className="form-group">
            <label>Enter Phone Number</label>
            <input
              type="text"
              className="form-control"
              onChange={inputsHandlerDepartureTime}
            />
          </div>
          <div className="form-group">
            <label>Enter Job</label>
            <input
              type="text"
              className="form-control"
              onChange={inputsHandlerArrivalTime}
            />
          </div> */}
        <div>
          <button
            type="submit"
            name="Create Flight"
          >
            Create Flight
          </button>
        </div>
      </form>
    </div>
  );
}
