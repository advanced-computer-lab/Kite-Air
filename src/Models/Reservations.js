const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reservationSchema = new Schema(
    {
  
        
    flight: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Flights"
    },
    choosenCabin:{
        type: String,
       // required: true
    },
 
    noOfPassengers: {
        type: Number,
  //      required: true
    },

    seatsNo:[String],
    
    },
 
  { timestamps: true }
);


const Reservation = mongoose.model("Reservation", reservationSchema);
module.exports = Reservation;
