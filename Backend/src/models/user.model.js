const mongoose = require('mongoose');

let userSchema = new mongoose.Schema({
    fullname:{
      firstname: {
         type: String,
         required: true
      },
      lastname:{
         type: String,
         required: true
      }
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
    }
}, {timestamps: true});

let userModel = mongoose.model("User", userSchema)

module.exports = userModel;