const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const flightSchema = new Schema(
  {
    FlightNo: {
      type: String,
      required: true,
    },
    From: {
      type: String,
      required: true,
    },
    To: {
      type: String,
      required: true,
    },
    FlightDate: {
      type: String,
      required: true,
    },
    Cabin: {
      type: String,
      required: true,
    },
    SeatsAvailable: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const Flight = mongoose.model("Flight", flightSchema);
module.exports = Flight;
