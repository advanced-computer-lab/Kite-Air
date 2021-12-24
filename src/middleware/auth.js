const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

app.use(express.json())
app.use(express.urlencoded({ extended: false }))


const verifyToken = (req,res,next) => {

  const token = req.body.token || req.query.token;

  if(!token){

    return res.status(403).send("Please log in first");

  }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
          if (err) return res.status(401).send("Invalid Token");
          req.user = user
         return next();
        })


}


module.exports = verifyToken;