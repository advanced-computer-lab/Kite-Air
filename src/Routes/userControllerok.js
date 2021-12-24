var express = require('express');
var router = express.Router();
const User = require('../Models/Users');



router.put('/:id', async(req, res) => {
    console.log(req.params.id);
    const opts = { runValidators: true };
    await User.findByIdAndUpdate(req.params.id, req.body, opts)
      .then(result => {

        res.status(200).send("User updated ");
        
        console.log('The User is Updated successfully !');
      }).catch(err => {
     
        res.status(400).send(err.message);

        console.log(err.message);
      })
    });




router.post("/loggedIn", async(req, res) => {

  await User.findOne({"username" : req.body.username})
    .then((result) => {
      res.json(result);
      console.log("plz " + result);
    })
    .catch((err) => {
      console.log(err);
    });
});



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

