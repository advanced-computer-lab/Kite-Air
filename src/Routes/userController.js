var express = require('express');
var router = express.Router();
const User = require('../Models/Users');


const userinstance = new User({
  username: "admin",
  Password: "123456",
  FirstName: "Admin",
  LastName: "Kite Air",
  Address: "Company",
  PassportNo: "0",
  CountryCode: "EGY",
  TelephoneNo: "0",
  Email: "admin-kiteair@gmail.com",
  Admin: "1"

});

// userinstance.save((err, doc) => {
//     if (!err){
//         res.redirect('/');
//     }
//     else
//         console.log('Error during record insertion : ' + err);
// });





module.exports = router;


