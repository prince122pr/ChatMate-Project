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


export async function getChatMessages(req, res) {
    try {
        const { chatId } = req.params;
        const { page = 1, limit = 10 } = req.query;

        const chatMessages = await messageModel
            .find({ chat: chatId })
            .sort({ createdAt: -1 })
            .skip((page - 1) * Number(limit))
            .limit(Number(limit));

        return res.status(200).json({
            message: chatMessages.length ? "Chat messages fetched successfully!" : "No messages yet",
            chatMessages: chatMessages.reverse(), // oldest → newest
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Chat messages not fetched!" });
    }
}

export async function sendMessage (req, res){
    try {
        const { chatId, content, role, user } = req.body;
        const message = await messageModel.create({
      chat: chatId,
      content,
      role,
      user
    });

     return res.status(201).json({
      message: "Message sent successfully!",
      chatMessage: message,
    });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Chat message response error!" });
    }
}
