import chatModel from "../models/chat.model.js";

export async function getAllUserChats(req, res){
    try {
        let {_id} = req.user;
    const chats = await chatModel.find({user: _id});
    if(!chats) return res.status(400).json({message: 'No chat found!'})
        return res.status(200).json({message: "Chats fetched successfully!", chats})
    } catch (error) {
        console.log(error);
         return res.status(500).json({ message: "Server error" });
    }
}

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
