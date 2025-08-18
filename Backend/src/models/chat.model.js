const mongoose = require('mongoose');

let chatSchema = mongoose.Schema({
   user:{
     type: mongoose.Schema.Types.ObjectId,
     ref: "User",
     required: true
   },
   title:{
        type: String,
     required: true
   },
   lastActivity:{
    type: Date,
    default:Date.now
   }
}, {timestamps: true});

let chatModel = mongoose.model("Chat", chatSchema);

module.exports = chatModel