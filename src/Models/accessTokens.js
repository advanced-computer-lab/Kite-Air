const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tokenSchema = new Schema(
    {
      token: {
          type: String,
      }
  
    },
    { timestamps: true }
  );
  
const accessTokens = mongoose.model("accessTokens", tokenSchema);
module.exports = accessTokens;