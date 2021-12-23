var express = require("express");
var router = express.Router();
const nodemailer = require("nodemailer");
const Flight = require("../Models/Flights");
const Reservation = require("../Models/Reservations");
const jwt = require('jsonwebtoken');


function auth(req,res,next){
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  console.log("reservation");

  console.log(token);
  if (token == null) return res.status(403).send("Please log in first");

  jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(user,err)=>{
      if (err) {
        return res.status(401).send("Invalid Token");}

      req.user = user
      next();
  })
}


router.get("/allreservations", auth,async (req, res) => {
  Reservation.find()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.status(400).send("Error fetching reservations!");
      console.log(err);
    });
});

router.post("/all-reservations", auth,async (req, res) => {
  await Reservation.find(req.body)
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

router.get("/userFlightReservation", auth,async (req, res) => {
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




router.post("/addReservation", auth,async (req, res) => {
  const reser = new Reservation(req.body);

  await reser
    .save()
    .then(async (result) => {

      if (req.body.choosenCabin == "First") {
        const resultFlight = await  Flight.find({_id: req.body.flight});
         Flight.findByIdAndUpdate({
           _id: req.body.flight},{
           fseatsAvailable: (resultFlight[0].fseatsAvailable - req.body.noOfPassengers),
         }).then();
       
       } else 
        if (req.body.choosenCabin == "Business") {
     
        const resultFlight = await  Flight.find({_id: req.body.flight});
         Flight.findByIdAndUpdate({
           _id: req.body.flight},{
           bseatsAvailable: (resultFlight[0].bseatsAvailable - req.body.noOfPassengers),
         }).then();
       
       } 
       else
      
       if (req.body.choosenCabin == "Economy") {
         console.log(req.body.choosenCabin);
      
         const resultFlight = await  Flight.find({_id: req.body.flight});
   

          Flight.findByIdAndUpdate({
            _id: req.body.flight},{
            eseatsAvailable: (resultFlight[0].eseatsAvailable - req.body.noOfPassengers),
          }).then();
        
        } 
        

      res.json({
        ok: true,
      });
      console.log("Reservation successfully added");
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/seatsFlight", auth, async (req, res) => {
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

router.post("/updateSeats",auth, async (req, res) => {
  await Reservation.findByIdAndUpdate({_id: req.body._id},{seatsNo : req.body.seatsNo})
    .then((result) => {
      res.send(result);
      res.status(400).send("Seats Successfully updated!");

    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/send", auth,(req, res) => {
  try {
    const output = `<p>Hello,</p>
    ${req.body.data}
    If you think this cancellation is in error or you have other questions, please contact us on this email.
    <br/>
    KITE AIR :)
    `;
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
      from: '"Kite Air" <winter21team@gmail.com>', // sender address
      to: "hadeerelhussen1111@gmail.com", // list of receivers
      subject: "Reservation cancelled", // Subject line
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

module.exports = router;
