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

router.get("/all-reservations", async (req, res) => {
  await Reservation.find({ User: "619fc2769dc8cc7dc0475947" })
    .then((result) => {
      res.send(result);
      //console.log("Found");
    })
    .catch((err) => {
      console.log(err);
    });
});

router.route("/:id").delete(async (req, res) => {
  // console.log(req.params.id);
  // console.log("heyy");
  await Reservation.findByIdAndDelete(req.params.id)
    .then((result) => {
      res.status(200).send("Reservation deleted ");

      console.log("The Reservation is deleted successfully !");
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/send", (req, res) => {
  try {
    const output = `Hello from the back end ${req.body.data}`;
    console.log({ req });
    let transporter = nodemailer.createTransport({
      service: "Gmail",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: "winter21team@gmail.com", // generated ethereal user
        pass: "MRRHMETCSEN#7#", // generated ethereal password
      },
      connectionTimeout: 5 * 60 * 1000,
      tls: {
        rejectUnauthorized: false,
      },
    });

    // send mail with defined transport object
    let info = transporter.sendMail({
      // i deleted await
      from: '"NodeMailar" <winter21team@gmail.com>', // sender address
      to: "hadeerelhussen1111@gmail.com", // list of receivers
      subject: "Hello ✔", // Subject line
      text: "Hello world?", // plain text body
      html: output, // html body
    });
  } catch (err) {
    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    console.log(err);
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
  }
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
