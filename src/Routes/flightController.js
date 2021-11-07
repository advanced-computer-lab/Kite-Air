var express = require('express');
const Flight = require('../Models/Flights');
var router = express.Router();


// Flight.insertMany([
  
// {
//     "FlightNo": "KL123",
//     "From": "FRA",
//     "To": "YYZ",
//     "Terminal": 1,
//     "FlightDate": "8-8-2022",
//     "DepartureTime": "22:02",
//     "ArrivalTime": "01:11",
//     "fseatsAvailable": 10,
//     "bseatsAvailable": 12,
//     "eseatsAvailable": 42,
//     "fprice": 1000,
//     "bprice": 560,
//     "eprice": 200,
//     "fbaggage": 25,
//     "bbaggage": 25,
//     "ebaggage": 20,
   
//   },
//   {
//     "FlightNo": "MH134",
//     "From": "CAI",
//     "To": "RUH",
//     "Terminal": 2,
//     "FlightDate": "8-8-2022",
//     "DepartureTime": "23:00",
//     "ArrivalTime": "03:11",
//     "fseatsAvailable": 5,
//     "bseatsAvailable": 15,
//     "eseatsAvailable": 45,
//     "fprice": 1000,
//     "bprice": 560,
//     "eprice": 200,
//     "fbaggage": 25,
//     "bbaggage": 25,
//     "ebaggage": 20,
   
//   },

//   {
//     "FlightNo": "ME133",
//     "From": "BEY",
//     "To": "CAI",
//     "Terminal": 1,
//     "FlightDate": "7-7-2020",
//     "DepartureTime": "23:00",
//     "ArrivalTime": "03:11",
//     "fseatsAvailable": 5,
//     "bseatsAvailable": 15,
//     "eseatsAvailable": 45,
//     "fprice": 1000,
//     "bprice": 560,
//     "eprice": 200,
//     "fbaggage": 25,
//     "bbaggage": 25,
//     "ebaggage": 20,
   
//   },

//  ]
// ).then(function(){
//     console.log("Data inserted")  // Success
// }).catch(function(error){
//     console.log(error)      // Failure
// });

//Get all entered flights

router.get('/all-flights', (req, res) => {
    Flight.find({})
      .then(result => {
        res.json(result);
        console.log("Found");
      })
      .catch(err => {
        console.log(err);
      });
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

