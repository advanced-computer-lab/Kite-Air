var express = require('express');
var router = express.Router();
const Reservation = require('../Models/Reservations');


const Reservationinstance = new Reservation({
flight: "61879985e3e3d1284cbd294d",
User: "619fc2769dc8cc7dc0475947",
choosenCabin: "Economy",
noOfPassengers: 2,
seatsNo: ["1G","4A"]
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



router.get("/allreservations", async (req, res) => {
    console.log(req.body);
      Reservation.find()
       .then((result) => {  
        res.send(result);
       })
       .catch((err) => {
         res.status(400).send("Error fetching reservations!");
         console.log(err);
       });
   });

   
router.get("/seatsofcabinOfaFlight", async (req, res) => {
   console.log(req.body);
  //  console.log("tigger");
     Reservation.find({flight : "619fb71b037c50c870bc7821", choosenCabin :"Business" }) //req.body.flights, req.body.cabin
      .then((result) => {
       res.send(result);
      })
      .catch((err) => {
        res.status(400).send("Error fetching reservation!");
        console.log(err);
      });
  });


  router.get("/userFlightReservation", async (req, res) => {
    console.log(req.body);
    Reservation.find({flight : req.body.flight, User : req.body.User, choosenCabin :req.body.choosenCabin})
       .then((result) => { 
        res.send(result);
       })
       .catch((err) => {
         res.status(400).send("Error fetching user's Reservation!");
         console.log(err);
       });
   });


   router.put("/updateSeats", async (req, res) => {
    console.log(req.body);
    Reservation.findByIdAndUpdate(req.body._id,{ seatsNo : req.body.seatsNo })
       .then((result) => { 
        res.status(200).send("Updated!");
        console.log('Update Successful');
       })
       .catch((err) => {
         res.status(400).send("Error!");
         console.log(err);
       });
   });


module.exports = router;

