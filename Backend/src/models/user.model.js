import { Schema, model } from 'mongoose';

let userSchema = new Schema({
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

let userModel = model("User", userSchema)

export default userModel;