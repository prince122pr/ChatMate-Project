import chatModel from "../models/chat.model.js";

export async function createChat(req, res){
    let {_id} = req.user;
    let {title} = req.body
    
   let chat = await chatModel.create({
    user: _id,
    title,
   })

   res.status(201).json({
    message: "Chat Created Successfully!",
    chat:{
        chatId: chat._id,
        userId: chat.userId,
        title, 
        lastActivity: chat.lastActivity
    }
   });
}
