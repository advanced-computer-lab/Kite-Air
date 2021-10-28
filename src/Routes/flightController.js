var express = require('express');
var router = express.Router();
const Flight = require('../Models/Flights');

//Insert flights
// Flight.insertMany(
//     [
//         {
//           "From": "LAX",
//           "To": "JFK",
//           "FlightDate": "12-1-2022",
//           "Cabin": "Economy",
//           "SeatsAvailable": 20
//         },
//         {
//           "From": "LAX",
//           "To": "JFK",
//           "FlightDate": "12-1-2022",
//           "Cabin": "Business",
//           "SeatsAvailable": 10
//         },
//         {
//           "From": "LAX",
//           "To": "JFK",
//           "FlightDate": "12-1-2022",
//           "Cabin": "First",
//           "SeatsAvailable": 6
         
//         },
//         {
//           "From": "JFK",
//           "To": "LAX",
//           "FlightDate": "22-1-2022",
//           "Cabin": "Economy",
//           "SeatsAvailable": 30
//         },
//         {
//           "From": "JFK",
//           "To": "LAX",
//           "FlightDate": "22-1-2022",
//           "Cabin": "Business",
//           "SeatsAvailable": 15
          
//         },
//         {
//           "From": "JFK",
//           "To": "LAX",
//           "FlightDate": "22-1-2022",
//           "Cabin": "First",
//           "SeatsAvailable": 16
//         },
//         {
//           "From": "JFK",
//           "To": "LHR",
//           "FlightDate": "21-2-2022",
//           "Cabin": "Economy",
//           "SeatsAvailable": 22
//         },
//         {
//           "From": "JFK",
//           "To": "LHR",
//           "FlightDate": "21-2-2022",
//           "Cabin": "Business",
//           "SeatsAvailable": 2
         
//         },
//         {
//           "From": "JFK",
//           "To": "LHR",
//           "FlightDate": "21-2-2022",
//           "Cabin": "First",
//           "SeatsAvailable": 5
//         },
//         {
//           "From": "LHR",
//           "To": "JFK",
//           "FlightDate": "6-3-2022",
//           "Cabin": "Economy",
//           "SeatsAvailable": 43
         
//         },
//         {
//           "From": "LHR",
//           "To": "JFK",
//           "FlightDate": "6-3-2022",
//           "Cabin": "Business",
//           "SeatsAvailable": 26
//         },
//         {
//           "From": "LHR",
//           "To": "JFK",
//           "FlightDate": "6-3-2022",
//           "Cabin": "First",
//           "SeatsAvailable": 16
         
          
//         },
//         {
//           "From": "CAI",
//           "To": "DXB",
//           "FlightDate": "10-4-2022",
//           "Cabin": "Economy",
//           "SeatsAvailable": 50
//         },
//         {
//           "From": "CAI",
//           "To": "DXB",
//           "FlightDate": "10-4-2022",
//           "Cabin": "Business",
//           "SeatsAvailable": 22
//         },
//         {
//           "From": "CAI",
//           "To": "DXB",
//           "FlightDate": "10-4-2022",
//           "Cabin": "First",
//           "SeatsAvailable": 10
//         },
//         {
//           "From": "DXB",
//           "To": "CAI",
//           "FlightDate": "18-4-2022",
//           "Cabin": "Economy",
//           "SeatsAvailable": 50
//         },
//         {
//           "From": "DXB",
//           "To": "CAI",
//           "FlightDate": "18-4-2022",
//           "Cabin": "Business",
//           "SeatsAvailable": 22 
//         },
//         {
//           "From": "DXB",
//           "To": "CAI",
//           "FlightDate": "18-4-2022",
//           "Cabin": "First",
//           "SeatsAvailable": 10
//         },
//         {
//           "From": "CDG",
//           "To": "MUC",
//           "FlightDate": "25-4-2022",
//           "Cabin": "Economy",
//           "SeatsAvailable": 43
//         },
//         {
//           "From": "CDG",
//           "To": "MUC",
//           "FlightDate": "25-4-2022",
//           "Cabin": "Business",
//           "SeatsAvailable": 26
          
//         },
//         {
//           "From": "CDG",
//           "To": "MUC",
//           "FlightDate": "25-4-2022",
//           "Cabin": "First",
//           "SeatsAvailable": 16
//         },
//         {
//           "From": "MUC",
//           "To": "CDG",
//           "FlightDate": "2-5-2022",
//           "Cabin": "Economy",
//           "SeatsAvailable": 43
//         },
//         {
//           "From": "MUC",
//           "To": "CDG",
//           "FlightDate": "2-5-2022",
//           "Cabin": "Business",
//           "SeatsAvailable": 26
//         },
//         {
//           "From": "LHR",
//           "To": "CDG",
//           "FlightDate": "6-5-2022",
//           "Cabin": "Economy",
//           "SeatsAvailable": 30
//         },
//         {
//           "From": "LHR",
//           "To": "CDG",
//           "FlightDate": "6-5-2022",
//           "Cabin": "Business",
//           "SeatsAvailable": 13
//         },
//         {
//           "From": "LHR",
//           "To": "CDG",
//           "FlightDate": "6-5-2022",
//           "Cabin": "First",
//           "SeatsAvailable": 3
//         },
//         {
//           "From": "CDG",
//           "To": "LHR",
//           "FlightDate": "17-5-2022",
//           "Cabin": "Economy",
//           "SeatsAvailable": 60
//         },
//         {
//           "From": "CDG",
//           "To": "LHR",
//           "FlightDate": "17-5-2022",
//           "Cabin": "Business",
//           "SeatsAvailable": 16
//         },
//         {
//           "From": "CDG",
//           "To": "LHR",
//           "FlightDate": "17-5-2022",
//           "Cabin": "First",
//           "SeatsAvailable": 16
//         },
//         {
//           "From": "CAI",
//           "To": "RUH",
//           "FlightDate": "6-6-2022",
//           "Cabin": "Economy",
//           "SeatsAvailable": 43
//         },
//         {
//           "From": "CAI",
//           "To": "RUH",
//           "FlightDate": "6-6-2022",
//           "Cabin": "Business",
//           "SeatsAvailable": 26
//         },
//         {
//           "From": "CAI",
//           "To": "RUH",
//           "FlightDate": "6-6-2022",
//           "Cabin": "First",
//           "SeatsAvailable": 16
        
//         },
//         {
//           "From": "RUH",
//           "To": "CAI",
//           "FlightDate": "16-6-2022",
//           "Cabin": "Economy",
//           "SeatsAvailable": 22
//         },
//         {
//           "From": "RUH",
//           "To": "CAI",
//           "FlightDate": "16-6-2022",
//           "Cabin": "Business",
//           "SeatsAvailable": 10
//         },
//         {
//           "From": "RUH",
//           "To": "CAI",
//           "FlightDate": "16-6-2022",
//           "Cabin": "First",
//           "SeatsAvailable": 6
//         },
//         {
//           "From": "YYZ",
//           "To": "FRA",
//           "FlightDate": "7-7-2020",
//           "Cabin": "Economy",
//           "SeatsAvailable": 43
//         },
//         {
//           "From": "YYZ",
//           "To": "FRA",
//           "FlightDate": "7-7-2020",
//           "Cabin": "Business",
//           "SeatsAvailable": 26
//         },
//         {
//           "From": "YYZ",
//           "To": "FRA",
//           "FlightDate": "7-7-2020",
//           "Cabin": "First",
//           "SeatsAvailable": 16
//         },
//         {
//           "From": "FRA",
//           "To": "YYZ",
//           "FlightDate": "8-8-2022",
//           "Cabin": "Economy",
//           "SeatsAvailable": 43
//         },
//         {
//           "From": "FRA",
//           "To": "YYZ",
//           "FlightDate": "8-8-2022",
//           "Cabin": "Business",
//           "SeatsAvailable": 26
//         },
//         {
//           "From": "FRA",
//           "To": "YYZ",
//           "FlightDate": "8-8-2022",
//           "Cabin": "First",
//           "SeatsAvailable": 16
//         }
//        ]    
// ).then(function(){
//     console.log("Data inserted")  // Success
// }).catch(function(error){
//     console.log(error)      // Failure
// });

//Get all entered flights
router.get('/all-flights', (req, res) => {
    Flight.find({})
      .then(result => {
        res.send(result);
        console.log("Found");
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

