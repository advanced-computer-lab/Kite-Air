var express = require('express');
var router = express.Router();
const Reservation = require('../Models/Reservations');


// const Reservationinstance = new Reservation({
//  flight: "61879985e3e3d1284cbd294d",
// seatsNo: ["10A","667"]
// });

// Reservationinstance.save((err, doc) => {
//     if (!err){
//        console.log('SUCCESS!');
   
//     }
//     else
//         console.log('Error during record insertion : ' + err);
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

//find all availabe seats of a certian flight
router.get("/all-reservations", async(req, res) => {

    await Reservation.find({flight: req.body.flight, choosenCabin:req.body.choosenCabin })
      .then((result) => {
        res.json(result);
        console.log("Found");
      })
      .catch((err) => {
        console.log(err);
      });
  });




module.exports = router;


