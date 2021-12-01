var express = require("express");
var router = express.Router();
const nodemailer = require("nodemailer");
const Reservation = require("../Models/Reservations");

const Reservationinstance = new Reservation({
  flight: "61879985e3e3d1284cbd294d",
  User: "619fc2769dc8cc7dc0475947",
  choosenCabin: "Economy",
  noOfPassengers: 3,
  seatsNo: ["1A", "2A", "3A"],
});

router.get("/allreservations", async (req, res) => {
  Reservation.find()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.status(400).send("Error fetching reservations!");
      console.log(err);
    });
});


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

router.post("/send", async (req, res) => {
  const output = `Hello from the back end`;

  let transporter = nodemailer.createTransport({
    host: "main.google.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "winter21team@gmail.com", // generated ethereal user
      pass: "MRRHMETCSEN#7#", // generated ethereal password
    },
    tls: {
      rejectUnauthorized: false,
    },
  });
  //send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"NodeMailar" <winter21team@gmail.com>', // sender address
    to: "hadeerelhussen1111@gmail.com", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: output, // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
});

router.get("/allreservations", async (req, res) => {
  console.log("Hiiiiiiiiiii");
  //console.log(req.body);
  Reservation.find()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.status(400).send("Error fetching reservations!");
      console.log(err);
    });
});

router.get("/userFlightReservation", async (req, res) => {
  console.log(req.body);
  Reservation.find({ flight: req.body.flight, User: req.body.User })
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.status(400).send("Error fetching user's Reservation!");
      console.log(err);
    });
});

router.post("/addReservation", async (req, res) => {
  const reser = new Reservation(req.body);

  await reser
  .save()
  .then((result) => {
    res.json({
      ok: true,
    });
    console.log("Reservation successfully added");
  })
  .catch((err) => {
    console.log(err);
  });


});

router.post("/seatsFlight", async (req, res) => {
  console.log("tigger");
  //console.log(req.body);

  Reservation.find({
    flight: req.body.flight,
    choosenCabin: req.body.choosenCabin,
  })
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.status(400).send("Error fetching reservation!");
    });
});

module.exports = router;
