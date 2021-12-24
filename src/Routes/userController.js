var express = require('express');
var router = express.Router();
const User = require('../Models/Users');
const jwt = require('jsonwebtoken');

var bcrypt = require('bcryptjs');
const Cryptr = require('cryptr');
const cryptr = new Cryptr('ReallySecretKey');


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

router.put('/:id',async(req, res) => {
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

 
router.put('/password/:id', async(req, res) => {
  console.log(req.body._id);

  console.log(req.body.NewPassword);
  if(req.body.NewPassword.length<8) throw new Error("short length");
  console.log("enter password");
  const opts = { runValidators: true };

 const hashedPassword = await bcrypt.hash(req.body.NewPassword, 10);
 console.log("NEW PASS "+ hashedPassword);
  console.log( hashedPassword);
  await User.findByIdAndUpdate(req.body._id,{Password: hashedPassword}, opts)
    .then(result => {

      res.status(200).send("User updated ");
      
      console.log('PAS SUCCESS !');
    }).catch(err => {
   
      res.status(400).send(err.message);
      console.log('PAS FAIL !');
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

router.post('/checkPassword/:id', async(req, res) => {

  console.log(req.body);
  
  const user2 = await User.findOne({ _id: req.body._id });
 
  console.log("pass that should be used "+user2.Password);
console.log(req.body.Current);
  if (user2 == null) {
    return res.status(400).send("Cannot find user");
  }
  try {

    if (await bcrypt.compare(req.body.Current, user2.Password)) {
      console.log("successss");
      res.send("Success");
    } else {
      throw new error("Not correct current password");
      res.send("Not Allowed");
    }
  } catch {
    res.status(500).send();
  }

  });


module.exports = router;

