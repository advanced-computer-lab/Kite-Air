require("dotenv").config();

const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const { MongoURI } = require("../config/keys");
const cors = require("cors");
const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

mongoose
  .connect(MongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => console.log("MongoDB is now connected"))
  .catch((err) => console.log(err));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const Users = require("./models/Users");
const accessTokens = require("./models/accessTokens");

app.post("/register", async (req, res) => {
    try {
      const hashedPassword = await bcrypt.hash(req.body.Password, 10);
      const userObject = {
        username: req.body.username,
        Password: hashedPassword,
        FirstName:  req.body.FirstName,
        LastName:  req.body.LastName,
        Address: req.body.Address,
        PassportNo: req.body.PassportNo,
        CountryCode: req.body.CountryCode,
        TelephoneNo: req.body.TelephoneNo,
        Email: req.body.Email,
        Admin: "0"

      };
      console.log(userObject);
      const user = new Users(userObject);
  
      user.save();

      res.status(201).send();
    } catch {
      res.status(500);
    }
  });




  app.post("/login", async (req, res) => {
    console.log(req.body);
  
    const user2 = await Users.findOne({ username: req.body.username });
    const userObject = { username: user2.username };

    if (user2 == null) {
      return res.status(400).send("Cannot find user");
    }
    try {

      if (await bcrypt.compare(req.body.Password, user2.Password)) {


        const accessToken = generateAccessToken(userObject);
        console.log(accessToken);

        usertokenObject = {
            token: accessToken
        }

        const usertoken = new accessTokens(usertokenObject);
        console.log("created usertoken");
        usertoken.save();
        res.json({ token: accessToken });
        res.send("Success");
      } else {
        res.send("Not Allowed");
      }
    } catch {
      res.status(500).send();
    }
  });

  

  app.delete("/logout", (req, res) => {
   // refreshTokens = refreshTokens.filter((token) => token !== req.body.token);

   //Deleting an existing user
   accessTokens.findOneAndRemove(req.body.token).then(result =>{
        res.status(200).send("Token Deleted ");
        console.log("The Token is deleted successfully !");

    }).catch(err => {
        console.log(err);
      });


  });
  


function generateAccessToken(user) {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
}


const port = process.env.PORT || "4000";
app.listen(port, () => {
  console.log(`Listening to requests on http://localhost:${port}`);
});

