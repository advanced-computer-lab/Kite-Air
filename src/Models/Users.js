const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const userSchema = new Schema(
  {
    username: { 
      type: String,
      required: true,
      unique: true, // unique bec we will check if it is not in system
      trim: true,
    },
    Password: {
        type: String,
        required: true,
        minlength: 8
       
    },
    FirstName: {
      type: String,
      required: true,
      trim: true,
      validate: {
        validator: function(v) {
             return /^[A-Za-z]+$/.test(v);
         },
         message: "-Only characters are allowed in First Name field!"
     }
    },
    LastName: {
      type: String,
      required: true,
      trim: true,
      validate: {
        validator: function(v) {
             return /^[A-Za-z]+$/.test(v);
         },
         message: "-Only characters are allowed in Last Name field!"
     }
    },
    Address: {
      type: String,
      required: true,
    },
    PassportNo: {
      type: String,
      required: true,
      validate: {
        validator: function(v) {
             return /^[A-Z]{1}[0-9]{8}$/.test(v);
         },
         message: "-Please enter a valid Passport Number!"
     }
  },
    CountryCode: {
    type: String,
    required: true,
    },
    TelephoneNo: {
        type: String,
        required: true,
    },
    Email: {
        type: String,
        Unique: true,
        required: true,
        trim: true,
        validate: {
           validator: function(v) {
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
            },
            message: "-Please enter a valid Email!"
        }
    },
    Admin: {
        type: String, //1 if admin 0/null if user 3ady
    }


  },
  { timestamps: true }
);



const User = mongoose.model("User", userSchema);
module.exports = User;