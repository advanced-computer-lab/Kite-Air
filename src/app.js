const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const { MongoURI } = require("../config/keys");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

mongoose
  .connect(MongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => console.log("MongoDB is now connected"))
  .catch((err) => console.log(err));

const flightController = require("./Routes/FlightController");
const reservationcontroller = require("./Routes/reservationController");
const userController = require("./Routes/userController");

app.use("/flights", flightController);
app.use("/reservations", reservationcontroller);
app.use("/users", userController);

const port = process.env.PORT || "8000";

app.listen(port, () => {
  console.log(`Listening to requests on http://localhost:${port}`);
});
