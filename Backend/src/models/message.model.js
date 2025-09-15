import { Schema, model } from 'mongoose';

const messageSchema = new Schema({
    user:{
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    chat:{
        type: Schema.Types.ObjectId,
        ref: "Chat"
    },
    content:{
        type: String,
        required: true
    },
    role:{
        type: String,
        enum: ["user", "model"],
        default: "user"
    }
},{timestamps:true});

let messageModel = model("Message", messageSchema);

export default messageModel;