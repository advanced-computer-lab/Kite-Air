var express = require('express');
var router = express.Router();
const User = require('../Models/Users');
const jwt = require('jsonwebtoken');



function auth(req,res,next){
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  console.log("user");
  console.log(token);
  if (token == null) return res.status(403).send("Please log in first");

  jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(user,err)=>{
      if (err) {
        return res.status(401).send("Invalid Token");}

      req.user = user
      next();
  })
}

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

 
router.post("/loggedIn", auth,async(req, res) => {

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

