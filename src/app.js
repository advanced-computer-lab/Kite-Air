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


const flightController = require('./Routes/FlightController');

app.use("/", flightController);

const port = process.env.PORT || "8000";

app.listen(port, () => {
  console.log(`Listening to requests on http://localhost:${port}`);
});
