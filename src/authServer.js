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

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const Users = require("./models/Users");
const accessTokens = require("./models/accessTokens");

app.post("/register", async (req, res) => {
  try {
    if (
      !(
        req.body.username &&
        req.body.Email &&
        req.body.Password &&
        req.body.PasswordC &&
        req.body.FirstName &&
        req.body.LastName &&
        req.body.Address &&
        req.body.PassportNo &&
        req.body.CountryCode &&
        req.body.TelephoneNo
      )
    ) {
       res.status(400).send("Please fill in all feilds!");
    }

    if( (""+req.body.Password)!==(""+req.body.PasswordC)){
       res.status(400).send("Passwords don't match!");

    }
    const hashedPassword = await bcrypt.hash(req.body.Password, 10);
    const userObject = {
      username: req.body.username,
      Password: hashedPassword,
      FirstName: req.body.FirstName,
      LastName: req.body.LastName,
      Address: req.body.Address,
      PassportNo: req.body.PassportNo,
      CountryCode: req.body.CountryCode,
      TelephoneNo: req.body.TelephoneNo,
      Email: req.body.Email,
      Admin: "0",
    };

    console.log(userObject);

    const oldUser = await Users.findOne({ username: req.body.username });
    if (oldUser) {
       res.status(400).send("Username is already used.");
    }

    const oldUserEmail = await Users.findOne({ Email: req.body.Email });
    if (oldUserEmail) {
       res
        .status(400)
        .send("Email is already registered.");
    }

    
    const user = new Users(userObject);

    user.save();

    res.status(201).send();
  } catch {
    return res.status(400).send(err.message);
  }
});

app.post("/login", async (req, res) => {
  console.log(req.body);

  const user2 = await Users.findOne({ username: req.body.username });

  if (user2 == null || !user2) {
    return res.status(400).send("The username you entered doesn't belong to an account.");
  }
  try {
    const userObject = { username: user2.username };
    if (await bcrypt.compare(req.body.Password, user2.Password)) {
      const accessToken = generateAccessToken(userObject);
      console.log(accessToken);

      usertokenObject = {
        token: accessToken,
      };

      const usertoken = new accessTokens(usertokenObject);
      console.log("created usertoken");
      usertoken.save();
      res.json({ user: user2, token: accessToken });
      res.send("Success");
    } else {
      return res.status(400).send("Sorry, your password was incorrect.");
    }
  } catch {
    return res.status(500).send();
  }
});

app.delete("/logout", (req, res) => {
  // refreshTokens = refreshTokens.filter((token) => token !== req.body.token);

  //Deleting an existing user
  accessTokens
    .findOneAndRemove(req.body.token)
    .then((result) => {
      res.status(200).send("Token Deleted ");
      console.log("The Token is deleted successfully !");
    })
    .catch((err) => {
      console.log(err);
    });
});

function generateAccessToken(user) {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
}

// const verifyToken = (req, res, next) => {
//   const authHeader = req.headers['authorization']

//   const token = req.body.token || req.query.token;

//   if (!token) {
//     return res.status(403).send("Please log in first");
//   }

//   jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
//     if (err) return res.status(401).send("Invalid Token");
//     req.user = user;
//     return next();
//   });
// };


function auth(req,res,next){
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (token ==null) return res.sendStatus(401)

  jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,user)=>{
      if (err) return res.sendStatus(403) 
      req.user = user
      next()
  })
}


const port = process.env.PORT || "4000";
app.listen(port, () => {
  console.log(`Listening to requests on http://localhost:${port}`);
});
