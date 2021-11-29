var express = require("express");
var router = express.Router();
const Flight = require("../Models/Flights");



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
router.get("/all-flights", async(req, res) => {
  await Flight.find({})
    .then((result) => {
      res.json(result);
      console.log("Found");
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/seats-of-flight", async(req, res) => {
  await Flight.find({_id: "619fb71b037c50c870bc7821"})
    .then((result) => {
      res.json(result);
      console.log("Found");
    })
    .catch((err) => {
      console.log(err);
    });
});

router.put('/:id', async(req, res) => {
  console.log(req.params.id);
  await Flight.findByIdAndUpdate(req.params.id, req.body)
    .then(result => {
      res.status(200).send("User updated ");
      
      console.log('The User is Updated successfully !');
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


  router.route('/:id').delete( async(req,res) => {
    // console.log(req.params.id);
    console.log("heyy");
    await Flight.findByIdAndDelete(req.params.id)
      .then(result => {
        res.status(200).send("Flight deleted ");
        
        console.log('The Flight is deleted successfully !');
      }).catch(err => {
        console.log(err);
      })
    });

  router.post('/create-flights', async (req, res) => {
    
    console.log(req.body);
    const flight = new Flight(req.body)
  

  const {From,
  To,
  Terminal,
  FlightDat,
  FlightNo,
  DepartureTime,
  ArrivalTime,
  fseatsAvailable,
  bseatsAvailable,
  eseatsAvailable} = req.body;
  //validation

  if(fseatsAvailable%4 != 0 ){
    return res.status(400).send("Number of first class seats must be a multiple of 4!");
  }
  if(bseatsAvailable%4 != 0 ){
    return res.status(400).send("Number of business class seats must be a multiple of 4!");
  }
  if(eseatsAvailable%4 != 0 ){
    return res.status(400).send("Number of economy class seats must be a multiple of 4!");
  }

  if(!From || From.length < 3 )  return res.status(400).send('Please enter a valid airport code');
  const exist = await Flight.findOne({FlightNo: FlightNo});

  if(exist) return res.status(400).send("Flight Already Exists");

   await flight.save()
      .then(result => {
        res.json({
          ok: true
        });
        console.log("flight successfully added");
      })
      .catch(err => {
        console.log(err);
      });

  });

  

module.exports = router;
