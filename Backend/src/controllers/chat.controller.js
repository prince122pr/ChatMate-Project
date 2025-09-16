import chatModel from "../models/chat.model.js";
import messageModel from "../models/message.model.js";

export async function getAllUserChats(req, res){
    try {
        let {_id} = req.user;
    const chats = await chatModel.find({user: _id});
    if(!chats) return res.status(400).json({message: 'No chat found!'})
        return res.status(200).json({message: "Chats fetched successfully!", chats})
    } catch (error) {
        console.log(error);
         return res.status(500).json({ message: "Chats fetched error!" });
    }
}

export async function createChat(req, res){
    try {
        let {_id} = req.user;
    let {title} = req.body;
    
   let chat = await chatModel.create({
    user: _id,
    title,
   })

   res.status(201).json({
    message: "Chat Created Successfully!",
    chat:{
        chatId: chat._id,
        userId: chat.user,
        title, 
        lastActivity: chat.lastActivity
    }
   });
    } catch (error) {
          console.log(error);
         return res.status(500).json({ message: "Chat not created!"});
    }
}


export async function getChatMessages(req, res){
    try {
        const {chatId} = req.params;     
        const { page = 1, limit = 10 } = req.query;  // pagination from query string


         const chatMessages = await messageModel
      .find({ chat: chatId })
      .sort({ createdAt: -1 })  // newest first
      .skip((page - 1) * limit) // skip older ones
      .limit(parseInt(limit));  // fetch only "limit" messages

        if(!chatMessages) return res.status(400).json({message:"Chat messages not found!"})

        return res.status(201).json({
            message: "Chat messages fetched successfully!",
            chatMessages: chatMessages.reverse(), // return oldest → newest order
            });

    } catch (error) {
        console.log(error);
         return res.status(500).json({ message: "Chat messages not fetched!"});
    }
}
