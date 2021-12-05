var express = require("express");
var router = express.Router();
const Flight = require("../Models/Flights");

// Flight.insertMany([

// {
//     "FlightNo": "KL221",
//     "From": "CAI",
//     "To": "JFK",
//     "Terminal": 1,
//     "FlightDate": "12-11-2021",
//     "DepartureTime": "02:02",
//     "ArrivalTime": "05:11",
//     "fseatsAvailable": 16,
//     "bseatsAvailable": 20,
//     "eseatsAvailable": 24,
//     "fprice": 2000,
//     "bprice": 1560,
//     "eprice": 1000,
//     "fbaggage": 25,
//     "bbaggage": 25,
//     "ebaggage": 20,

//   },
//   {
//     "FlightNo": "KL200",
//     "From": "JFK",
//     "To": "CAI",
//     "Terminal": 2,
//     "FlightDate": "12-20-2021",
//     "DepartureTime": "13:00",
//     "ArrivalTime": "15:00",
//     "fseatsAvailable": 16,
//     "bseatsAvailable": 20,
//     "eseatsAvailable": 24,
//     "fprice": 2000,
//     "bprice": 1560,
//     "eprice": 1000,
//     "fbaggage": 25,
//     "bbaggage": 25,
//     "ebaggage": 20,

//   },
//   {
//     "FlightNo": "KL223",
//     "From": "CAI",
//     "To": "JFK",
//     "Terminal": 1,
//     "FlightDate": "12-11-2021",
//     "DepartureTime": "04:02",
//     "ArrivalTime": "06:11",
//     "fseatsAvailable": 16,
//     "bseatsAvailable": 20,
//     "eseatsAvailable": 24,
//     "fprice": 2000,
//     "bprice": 1560,
//     "eprice": 900,
//     "fbaggage": 25,
//     "bbaggage": 25,
//     "ebaggage": 20,

//   },
//   {
//     "FlightNo": "KL243",
//     "From": "JFK",
//     "To": "CAI",
//     "Terminal": 3,
//     "FlightDate": "12-20-2021",
//     "DepartureTime": "08:02",
//     "ArrivalTime": "10:11",
//     "fseatsAvailable": 16,
//     "bseatsAvailable": 20,
//     "eseatsAvailable": 24,
//     "fprice": 2000,
//     "bprice": 1560,
//     "eprice": 900,
//     "fbaggage": 25,
//     "bbaggage": 25,
//     "ebaggage": 20,

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

router.post("/seats-of-flight", async (req, res) => {
  // console.log("Sushi");
  // console.log(req.body);


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
        
        console.log('Flight found successfully !');
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
  console.log("from backend search m2");
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
  // console.log(req.params.id);
  console.log("heyy");
  await Flight.findByIdAndDelete(req.params.id)
    .then((result) => {
      res.status(200).send("Flight deleted ");

      console.log("The Flight is deleted successfully !");
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/create-flights", async (req, res) => {
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
