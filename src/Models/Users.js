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
    },
    FirstName: {
      type: String,
      required: true,
      trim: true,
    },
    LastName: {
      type: String,
      required: true,
      trim: true,
    },
    Address: {
      type: String,
      required: true,
    },
    PassportNo: {
      type: String,
      required: true,
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
    },
    Admin: {
        type: String, //1 if admin 0/null if user 3ady
    }


  },
  { timestamps: true }
);



const User = mongoose.model("User", userSchema);
module.exports = User;
