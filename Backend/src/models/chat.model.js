import { Schema, model } from 'mongoose';

let chatSchema = new Schema({
   user:{
     type: Schema.Types.ObjectId,
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

let chatModel = model("Chat", chatSchema);

export default chatModel