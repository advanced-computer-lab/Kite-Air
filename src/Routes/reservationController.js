var express = require('express');
var router = express.Router();
const Reservation = require('../Models/Reservations');


const Reservationinstance = new Reservation({
flight: "61879985e3e3d1284cbd294d",
User: "619fc2769dc8cc7dc0475947",
choosenCabin: "Economy",
noOfPassengers: 3,
seatsNo: ["1A","2A","3A"]
});

// Reservationinstance.save((err, doc) => {
//     if (!err){
//        console.log('Res SUCCESS!');
   
//     }
//     else
//         console.log('Error during record insertion res : ' + err);
// });


// Reservation.collection.insertOne([
// {
//     // flight: "61879985e3e3d1284cbd294d",
//     seatsNo: ['10A','667']
   
// }
//  ]
// ).then(function(){
//     console.log("Data inserted")  // Success
// }).catch(function(error){
//     console.log(error)      // Failure
// });



// const showAllSeatNo = async function() {
//     const identifiers = await Reservation.find().populate("seatNo");
  
//     console.log("> All Identifiers\n", identifiers);
//   };





module.exports = router;

