const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const flightSchema = new Schema(
  {
    FlightNo: {
      type: String,
      required: true,
      unique: true,
      trime: true,
    },
    From: {
      type: String,
      required: true,
      trime: true,
    },
    To: {
      type: String,
      required: true,
      trime: true,
    },
    Terminal: {
      type: Number,
      required: true,
    },
    FlightDate: {
      type: String,
      required: true,
    },
    DepartureTime: {
      type: String,
      required: true,
    },
    ArrivalTime: {
      type: String,
      required: true,
    },
    fseatsAvailable: {
      type: Number,
      required: true,
    },

    bseatsAvailable: {
      type: Number,
      required: true,
    },
    eseatsAvailable: {
      type: Number,
      required: true,
    },
    fprice: {
      type: Number,
    },
    bprice: {
      type: Number,
    },
    eprice: {
      type: Number,
    },
    fbaggage: {
      type: Number,
    },
    bbaggage: {
      type: Number,
    },
    ebaggage: {
      type: Number,
    },
  },
  { timestamps: true }
);

const Flight = mongoose.model("Flight", flightSchema);
module.exports = Flight;