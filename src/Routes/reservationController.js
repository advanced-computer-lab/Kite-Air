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


// router.post('/create-reservation', async (req, res) => {
    
//     console.log(req.body);
//     const reservation = new Reservation(req.body)

//   const {User,
//   flight,
//   choosenCabin,
//   noOfPassengers,
//   seatsNo} = req.body;
  
//    await reservation.save()
//       .then(result => {
//         res.json({
//           ok: true
//         });
//         console.log("reservation successfully added");
//       })
//       .catch(err => {
//         console.log(err);
//       });

//   });

  router.get("/all-reservations", async(req, res) => {
    await Reservation.find({User: "619fc2769dc8cc7dc0475947"})
      .then((result) => {
        res.send(result);
        //console.log("Found");
      })
      .catch((err) => {
        console.log(err);
      });
  });

  router.route('/:id').delete( async(req,res) => {
    // console.log(req.params.id);
   // console.log("heyy");
    await Reservation.findByIdAndDelete(req.params.id)
      .then(result => {
        res.status(200).send("Reservation deleted ");
        
        console.log('The Reservation is deleted successfully !');
      }).catch(err => {
        console.log(err);
      })
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


