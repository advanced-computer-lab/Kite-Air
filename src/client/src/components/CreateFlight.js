import axios from "axios";
import React, { useState } from "react";

const baseURL = "http://localhost:8000/flights/create-flights";

export default function CreateFlight() {

    const [FlightNo, setFlightNo] = useState("");
    const [From, setFrom] = useState("");
    const [To, setTo] = useState("");
    const [FlightDate, setFlightDate] = useState("");
    const [Cabin, setCabin] = useState("");
    const [SeatsAvailable, setSeatsAvailable] = useState("");
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
        FlightNo: flightno,
        From: from,
        To: to,
        FlightDate: flightdate,
        Cabin: cabin,
        SeatsAvailable: seatsavailable,
        // DepartureTime: deptime,
        // ArrivalTime: arrtime,
      };
  
      const submitButton = () => {
        axios.post(baseURL, inputs)
          .then((res) => {
            console.log(inputs);
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
              type="text"
              className="form-control"
              onChange={inputsHandlerName}
            />
          </div>
          <div className="form-group">
            <label>Enter Email</label> 
            <input
              type="text"
              className="form-control"
              onChange={inputsHandlerEmail}
            />
          </div>
          <div className="form-group">
            <label>Enter Age</label>
            <input
              type="number"
              className="form-control"
              onChange={inputsHandlerAge}
            />
          </div>
          <div className="form-group">
            <label>Enter the city born in</label>
            <input
              type="text"
              className="form-control"
              onChange={inputsHandlerBorn}
            />
          </div>
          <div className="form-group">
            <label>Enter Your city</label>
            <input
              type="text"
              className="form-control"
              onChange={inputsHandlerLiveIn}
            />
          </div>
          <div className="form-group">
            <label>Enter MartialStatus</label>
            <input
              type="text"
              className="form-control"
              onChange={inputsHandlerMarital}
            />
          </div>
          <div className="form-group">
            <label>Enter Phone Number</label>
            <input
              type="text"
              className="form-control"
              onChange={inputsHandlerPhone}
            />
          </div>
          <div className="form-group">
            <label>Enter Job</label>
            <input
              type="text"
              className="form-control"
              onChange={inputsHandlerJob}
            />
          </div>
          <div className="form-group">
            <button
              type="submit"
              name="Create User"
              className="btn btn-success btn-block"
            >
              create
            </button>
          </div>
        </form>
      </div>
    );
  }
