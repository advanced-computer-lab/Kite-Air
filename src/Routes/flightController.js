var express = require("express");
var router = express.Router();
const Flight = require("../Models/Flights");
const jwt = require('jsonwebtoken');


function auth(req,res,next){
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (token == null) return res.status(403).send("Please log in first");

  jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(user,err)=>{
      if (err) {
        return res.status(401).send("Invalid Token");}

      req.user = user
      next();
  })
}


// Flight.insertMany([


//   {
//     "FlightNo": "KL223",
//     "From": "CAI",
//     "To": "JFK",
//     "Terminal": 1,
//     "FlightDate": "12-11-2021",
//     "DepartureTime": "04:02",
//     "ArrivalTime": "06:11",
//     "fseatsAvailable": 16,
//     "bseatsAvailable": 16,
//     "eseatsAvailable": 16,
//     "fprice": 2000,
//     "bprice": 1560,
//     "eprice": 900,
//     "fbaggage": 25,
//     "bbaggage": 20,
//     "ebaggage": 20,
//     "ftotalSeats":16,
//     "btotalSeats":16,
//     "etotalSeats":16,

//   },
//   {
//     "FlightNo": "KL233",
//     "From": "JFK",
//     "To": "CAI",
//     "Terminal": 3,
//     "FlightDate": "12-20-2021",
//     "DepartureTime": "08:02",
//     "ArrivalTime": "10:11",
//     "fseatsAvailable": 16,
//     "bseatsAvailable": 16,
//     "eseatsAvailable": 16,
//     "fprice": 2000,
//     "bprice": 1560,
//     "eprice": 900,
//     "fbaggage": 25,
//     "bbaggage": 20,
//     "ebaggage": 20,
//     "ftotalSeats":16,
//     "btotalSeats":16,
//     "etotalSeats":16,
//   }

//  ]
// ).then(function(){
//     console.log("Data inserted")  // Success
// }).catch(function(error){
//     console.log(error)      // Failure
// });

//Get all entered flights
router.get("/all-flights", async (req, res) => {
  await Flight.find({})
    .then((result) => {
      res.json(result);
      console.log("Found");
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/seats-of-flight", auth, async (req, res) => {
 


  await Flight.find({_id: req.body._id})
    .then((result) => {
      res.json(result);
      //console.log(result);

    })
    .catch((err) => {
      console.log(err);
    });
});

router.put("/:id", async (req, res) => {
  console.log(req.params.id);
  await Flight.findByIdAndUpdate(req.params.id, req.body)
    .then((result) => {
      res.status(200).send("User updated ");

      console.log("The User is Updated successfully !");
    })
    .catch((err) => {
      console.log(err);
    });
});


  // router.get('/seats/:id', async(req, res) => {
  //   console.log(req.params.id);
  //   await Flight.findById(req.params.id)
  //     .then(result => {
  //       //res.status(200).send("User updated ");
  //       if(req.body === "Business"){
  //         res.status(200).send("no. of business seats: " + result.bseatsAvailable);
  //       }
  //       else{
  //         if(req.body === "Economy"){
  //           res.status(200).send("no. of economy seats: " + result.eseatsAvailable);
  //         }
        
  //       else{
  //         res.status(200).send("no. of first seats: " + result.fseatsAvailable);
  //       }
  //     }
  //       //console.log('The User is Updated successfully !');
  //     }).catch(err => {
  //       console.log(err);
  //     })
  //   });

  router.get('/:id', async(req, res) => {
    console.log(req.params.id);
    await Flight.findById(req.params.id)
      .then(result => {
        res.status(200).send(result);
        
      }).catch(err => {
        console.log(err);
      })
    });

router.post("/search", async (req, res) => {
  console.log("from backend");
  console.log(req.body);
  await Flight.find(req.body)
    .then((result) => {
      res.send(result);
      console.log("Filtered");
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/search-m2", async (req, res) => {
  console.log(req.body);

  // const {
  //   From,
  //   To,
  //   FlightDate,
  //   fseatsAvailable,
  //   bseatsAvailable,
  //   eseatsAvailable,
  // } = req.body;

  // From: From,
  // To: To,
  // FlightDate: FlightDate,
  // fseatsAvailable: {$gte: fseatsAvailable},
  // bseatsAvailable: {$gte: bseatsAvailable},
  // eseatsAvailable: {$gte: eseatsAvailable},

  if (Object.keys(req.body).length != 0) {
    await Flight.find(req.body)
      .then((result) => {
        res.send(result);
      })
      .catch((err) => {
        console.log(err);
      });
  }
});

router.route("/:id").delete(async (req, res) => {
  await Flight.findByIdAndDelete(req.params.id)
    .then((result) => {
      res.status(200).send("Flight deleted ");

      console.log("The Flight is deleted successfully !");
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/create-flights",auth, async (req, res) => {
  console.log(req.body);
  const flight = new Flight(req.body);

  const {
    From,
    To,
    Terminal,
    FlightDat,
    FlightNo,
    DepartureTime,
    ArrivalTime,
    fseatsAvailable,
    bseatsAvailable,
    eseatsAvailable,
    ftotalSeats,
    btotalSeats,
    etotalSeats,
  } = req.body;
  //validation

  if (fseatsAvailable % 4 != 0) {
    return res
      .status(400)
      .send("Number of first class seats must be a multiple of 4!");
  }
  if (bseatsAvailable % 4 != 0) {
    return res
      .status(400)
      .send("Number of business class seats must be a multiple of 4!");
  }
  if (eseatsAvailable % 4 != 0) {
    return res
      .status(400)
      .send("Number of economy class seats must be a multiple of 4!");
  }

  if (!From || From.length < 3)
    return res.status(400).send("Please enter a valid airport code");
  const exist = await Flight.findOne({ FlightNo: FlightNo });

  if (exist) return res.status(400).send("Flight Already Exists");

  await flight
    .save()
    .then((result) => {
      res.json({
        ok: true,
      });
      console.log("flight successfully added");
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
