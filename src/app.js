const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();

mongoose
  .connect(
    "mongodb+srv://KiteAir:1234@cluster0.bkctu.mongodb.net/Flights?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then((result) => console.log("MongoDB is now connected"))
  .catch((err) => console.log(err));

var Flight = require("./Models/Flights");

// new object
const flight = new Flight({
  From: "LAX",
  To: "JFK",
  FlightDate: "12-1-2022", // Date ??
  Cabin: "Economy",
  SeatsAvailable: 20,
});

// Flight.create({   From: "LAX",
// To: "JFK",
// FlightDate: "12-1-2022", // Date ??
// Cabin: "Economy",
// SeatsAvailable: 20, })
//   .then((newInst) => {
//     console.log(newInst);
//   })
//   .catch((err) => {
//     console.log("Error creating!");
//   }

flight.save();

const port = process.env.PORT || "8000";

app.listen(port, () => {
  console.log(`Listening to requests on http://localhost:${port}`);
});
