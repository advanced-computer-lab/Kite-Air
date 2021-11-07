var express = require("express");
var router = express.Router();
const Flight = require("../Models/Flights");

//Insert flights

// Flight.insertMany([
//   {
//     "From": "LAX",
//     "To": "JFK",
//     "FlightDate": "12-1-2022",
//     "Cabin": "Economy",
//     "SeatsAvailable": 20,
//     "FlightNo": 1
//   },
//   {
//     "From": "LAX",
//     "To": "JFK",
//     "FlightDate": "12-1-2022",
//     "Cabin": "Business",
//     "SeatsAvailable": 10,
//     "FlightNo": 1
//   },
//   {
//     "From": "LAX",
//     "To": "JFK",
//     "FlightDate": "12-1-2022",
//     "Cabin": "First",
//     "SeatsAvailable": 6,
//     "FlightNo": 1
//   },
//   {
//     "From": "JFK",
//     "To": "LAX",
//     "FlightDate": "22-1-2022",
//     "Cabin": "Economy",
//     "SeatsAvailable": 30,
//     "FlightNo": 2
//   },
//   {
//     "From": "JFK",
//     "To": "LAX",
//     "FlightDate": "22-1-2022",
//     "Cabin": "Business",
//     "SeatsAvailable": 15,
//     "FlightNo": 2
//   },
//   {
//     "From": "JFK",
//     "To": "LAX",
//     "FlightDate": "22-1-2022",
//     "Cabin": "First",
//     "SeatsAvailable": 16,
//     "FlightNo": 2
//   },
//   {
//     "From": "JFK",
//     "To": "LHR",
//     "FlightDate": "21-2-2022",
//     "Cabin": "Economy",
//     "SeatsAvailable": 22,
//     "FlightNo": 3
//   },
//   {
//     "From": "JFK",
//     "To": "LHR",
//     "FlightDate": "21-2-2022",
//     "Cabin": "Business",
//     "SeatsAvailable": 2,
//     "FlightNo": 3
//   },
//   {
//     "From": "JFK",
//     "To": "LHR",
//     "FlightDate": "21-2-2022",
//     "Cabin": "First",
//     "SeatsAvailable": 5,
//     "FlightNo": 3
//   },
//   {
//     "From": "LHR",
//     "To": "JFK",
//     "FlightDate": "6-3-2022",
//     "Cabin": "Economy",
//     "SeatsAvailable": 43,
//     "FlightNo": 4
//   },
//   {
//     "From": "LHR",
//     "To": "JFK",
//     "FlightDate": "6-3-2022",
//     "Cabin": "Business",
//     "SeatsAvailable": 26,
//     "FlightNo": 4
//   },
//   {
//     "From": "LHR",
//     "To": "JFK",
//     "FlightDate": "6-3-2022",
//     "Cabin": "First",
//     "SeatsAvailable": 16,
//     "FlightNo": 4
//   },
//   {
//     "From": "CAI",
//     "To": "DXB",
//     "FlightDate": "10-4-2022",
//     "Cabin": "Economy",
//     "SeatsAvailable": 50,
//     "FlightNo": 5
//   },
//   {
//     "From": "CAI",
//     "To": "DXB",
//     "FlightDate": "10-4-2022",
//     "Cabin": "Business",
//     "SeatsAvailable": 22,
//     "FlightNo": 5
//   },
//   {
//     "From": "CAI",
//     "To": "DXB",
//     "FlightDate": "10-4-2022",
//     "Cabin": "First",
//     "SeatsAvailable": 10,
//     "FlightNo": 5
//   },
//   {
//     "From": "DXB",
//     "To": "CAI",
//     "FlightDate": "18-4-2022",
//     "Cabin": "Economy",
//     "SeatsAvailable": 50,
//     "FlightNo": 6
//   },
//   {
//     "From": "DXB",
//     "To": "CAI",
//     "FlightDate": "18-4-2022",
//     "Cabin": "Business",
//     "SeatsAvailable": 22,
//     "FlightNo": 6
//   },
//   {
//     "From": "DXB",
//     "To": "CAI",
//     "FlightDate": "18-4-2022",
//     "Cabin": "First",
//     "SeatsAvailable": 10,
//     "FlightNo": 6
//   },
//   {
//     "From": "CDG",
//     "To": "MUC",
//     "FlightDate": "25-4-2022",
//     "Cabin": "Economy",
//     "SeatsAvailable": 43,
//     "FlightNo": 7
//   },
//   {
//     "From": "CDG",
//     "To": "MUC",
//     "FlightDate": "25-4-2022",
//     "Cabin": "Business",
//     "SeatsAvailable": 26,
//     "FlightNo": 7
//   },
//   {
//     "From": "CDG",
//     "To": "MUC",
//     "FlightDate": "25-4-2022",
//     "Cabin": "First",
//     "SeatsAvailable": 16,
//     "FlightNo": 7
//   },
//   {
//     "From": "MUC",
//     "To": "CDG",
//     "FlightDate": "2-5-2022",
//     "Cabin": "Economy",
//     "SeatsAvailable": 43,
//     "FlightNo": 8
//   },
//   {
//     "From": "MUC",
//     "To": "CDG",
//     "FlightDate": "2-5-2022",
//     "Cabin": "Business",
//     "SeatsAvailable": 26,
//     "FlightNo": 8
//   },
//   {
//     "From": "MUC",
//     "To": "CDG",
//     "FlightDate": "2-5-2022",
//     "Cabin": "First",
//     "SeatsAvailable": 16,
//     "FlightNo": 8
//   },
//   {
//     "From": "LHR",
//     "To": "CDG",
//     "FlightDate": "6-5-2022",
//     "Cabin": "Economy",
//     "SeatsAvailable": 30,
//     "FlightNo": 9
//   },
//   {
//     "From": "LHR",
//     "To": "CDG",
//     "FlightDate": "6-5-2022",
//     "Cabin": "Business",
//     "SeatsAvailable": 13,
//     "FlightNo": 9
//   },
//   {
//     "From": "LHR",
//     "To": "CDG",
//     "FlightDate": "6-5-2022",
//     "Cabin": "First",
//     "SeatsAvailable": 3,
//     "FlightNo": 9
//   },
//   {
//     "From": "CDG",
//     "To": "LHR",
//     "FlightDate": "17-5-2022",
//     "Cabin": "Economy",
//     "SeatsAvailable": 60,
//     "FlightNo": 10
//   },
//   {
//     "From": "CDG",
//     "To": "LHR",
//     "FlightDate": "17-5-2022",
//     "Cabin": "Business",
//     "SeatsAvailable": 16,
//     "FlightNo": 10
//   },
//   {
//     "From": "CDG",
//     "To": "LHR",
//     "FlightDate": "17-5-2022",
//     "Cabin": "First",
//     "SeatsAvailable": 16,
//     "FlightNo": 10
//   },
//   {
//     "From": "CAI",
//     "To": "RUH",
//     "FlightDate": "6-6-2022",
//     "Cabin": "Economy",
//     "SeatsAvailable": 43,
//     "FlightNo": 11
//   },
//   {
//     "From": "CAI",
//     "To": "RUH",
//     "FlightDate": "6-6-2022",
//     "Cabin": "Business",
//     "SeatsAvailable": 26,
//     "FlightNo": 11
//   },
//   {
//     "From": "CAI",
//     "To": "RUH",
//     "FlightDate": "6-6-2022",
//     "Cabin": "First",
//     "SeatsAvailable": 16,
//     "FlightNo": 11
//   },
//   {
//     "From": "RUH",
//     "To": "CAI",
//     "FlightDate": "16-6-2022",
//     "Cabin": "Economy",
//     "SeatsAvailable": 22,
//     "FlightNo": 12
//   },
//   {
//     "From": "RUH",
//     "To": "CAI",
//     "FlightDate": "16-6-2022",
//     "Cabin": "Business",
//     "SeatsAvailable": 10,
//     "FlightNo": 12
//   },
//   {
//     "From": "RUH",
//     "To": "CAI",
//     "FlightDate": "16-6-2022",
//     "Cabin": "First",
//     "SeatsAvailable": 6,
//     "FlightNo": 12
//   },
//   {
//     "From": "YYZ",
//     "To": "FRA",
//     "FlightDate": "7-7-2020",
//     "Cabin": "Economy",
//     "SeatsAvailable": 43,
//     "FlightNo": 13
//   },
//   {
//     "From": "YYZ",
//     "To": "FRA",
//     "FlightDate": "7-7-2020",
//     "Cabin": "Business",
//     "SeatsAvailable": 26,
//     "FlightNo": 13
//   },
//   {
//     "From": "YYZ",
//     "To": "FRA",
//     "FlightDate": "7-7-2020",
//     "Cabin": "First",
//     "SeatsAvailable": 16,
//     "FlightNo": 13
//   },
//   {
//     "From": "FRA",
//     "To": "YYZ",
//     "FlightDate": "8-8-2022",
//     "Cabin": "Economy",
//     "SeatsAvailable": 43,
//     "FlightNo": 14
//   },
//   {
//     "From": "FRA",
//     "To": "YYZ",
//     "FlightDate": "8-8-2022",
//     "Cabin": "Business",
//     "SeatsAvailable": 26,
//     "FlightNo": 14
//   },
//   {
//     "From": "FRA",
//     "To": "YYZ",
//     "FlightDate": "8-8-2022",
//     "Cabin": "First",
//     "SeatsAvailable": 16,
//     "FlightNo": 14
//   }
//  ]
// ).then(function(){
//     console.log("Data inserted")  // Success
// }).catch(function(error){
//     console.log(error)      // Failure
// });

//Get all entered flights
router.get("/all-flights", (req, res) => {
  Flight.find({})
    .then((result) => {
      res.json(result);
      console.log("Found");
    })
    .catch((err) => {
      console.log(err);
    });
});

router.put('/:id', (req, res) => {
  console.log(req.params.id);
  Flight.findByIdAndUpdate(req.params.id, req.body)
    .then(result => {
      res.status(200).send("User updated ");
      
      console.log('The User is Updated successfully !');
    }).catch(err => {
      console.log(err);
    })
  });
// router.get("/all-flights", (req, res) => {
//   Flight.find({})
//     .then((result) => {
//         for(int i=0; i<result.length; i++){

//         }

//       res.json(result);
//       console.log("Found");
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });

// exports.getUser = (req, res) => {
//   var data = req.body;
//   var flight = {
//     FlightNo: data.FlightNo,
//   };
//   User.find(flight)
//     .then((result) => {
//       res.send(result);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// };

router.post("/search", (req, res) => {
  console.log("from backend");
  console.log(req.body);
  Flight.find(req.body)
    .then((result) => {
      res.send(result);
      console.log("Filtered");
    })
    .catch((err) => {
      console.log(err);
    });
});

// exports.getUser = (req, res) => {
//   User.find({Name:req.params.name})
//     .then(result => {
//       res.send(result);
//     })
//     .catch(err => {
//       console.log(err);
//     });
// };

// router.get('/find', (req, res) => {
//   Flight.find({Name:req.body.fliter})
//     .then(result => {
//       res.send(result => {
//         res.json(result);
//         console.log("Filtered");
//     })
//     .catch(err => {
//       console.log(err);
//     });
// });

  router.route('/:id').delete((req,res) => {
    // console.log(req.params.id);
    console.log("heyy");
    Flight.findByIdAndDelete(req.params.id)
      .then(result => {
        res.status(200).send("Flight deleted ");
        
        console.log('The Flight is deleted successfully !');
      }).catch(err => {
        console.log(err);
      })
    });

    router.post('/create-flights', async (req, res) => {
    
      console.log('request came');
      console.log(req.body);
      const flight = new Flight(req.body)
    
     await flight.save()
        .then(result => {
          res.send(result);
          console.log("added");
        })
        .catch(err => {
          console.log(err);
        });
  
    });

  module.exports = router;

//var Flight = require("./Models/Flights");

// new object
// const flight = new Flight({
//   From: "LAX",
//   To: "JFK",
//   FlightDate: "12-1-2022", // Date ??
//   Cabin: "Economy",
//   SeatsAvailable: 20,
// });

// Flight.create({   From: "LAX",
// To: "JFK",
// FlightDate: "12-1-2022", // Date ??
// Cabin: "Economy",
// SeatsAvailable: 20, })
//   .then((newInst) => {
//     console.log(newInst);
//   })
//   .catch((err) => {
//     console.log("Error creating!");
//   }

//flight.save();
