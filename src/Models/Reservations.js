const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reservationSchema = new Schema(
    {
  
    User: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users"
    },

    flight: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Flights"
    },

    choosenCabin:{
        type: String,
    },
 
    noOfPassengers: {
        type: Number,
    },

    seatsNo:[String],
    
    },
 
  { timestamps: true }
);


const Reservation = mongoose.model("Reservation", reservationSchema);
module.exports = Reservation;