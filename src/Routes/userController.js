var express = require('express');
var router = express.Router();
const User = require('../Models/Users');




// User.collection.insertMany([
//   {
//     "username": "maryam",
//     "Password": "123456",
//     "FirstName": "maryam",
//     "LastName": "Kite Air",
//     "Address": "Company",
//     "PassportNo": "03123131",
//     "CountryCode": "EGY",
//     "TelephoneNo": "0",
//     "Email": "admin-kiteair@gmail.com",
//     "Admin": "0",
//     "Reservations": ["619d51edfb493b373ad3da34"],
     
//   }
//    ]
//   ).then(function(){
//       console.log("User w reservation inserted")  // Success
//   }).catch(function(error){
//       console.log(error)      // Failure
//   });
  

// const userinstance = new User({
//   username: "User1",
//   Password: "123456",
//   FirstName: "User",
//   LastName: "New",
//   Address: "Company",
//   PassportNo: "A234567",
//   CountryCode: "EGY",
//   TelephoneNo: "0",
//   Email: "user1@gmail.com",
//   Admin: "0"

// });

// userinstance.save((err, doc) => {
//     if (!err){
//         res.redirect('/');
//     }
//     else
//         console.log('Error during record insertion : ' + err);
// });





module.exports = router;


