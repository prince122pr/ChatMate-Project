const { Server } = require("socket.io");  // Socket.IO server
const cookie = require('cookie')   // To parse cookies from handshake
const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");
const messageModel = require("../models/message.model");
const { generateResponse, generateVector } = require("../services/ai.service");
const { createMemory, queryMemory } = require("../services/vector.service");

const { v4: uuidv4 } = require('uuid');

// Initialize Socket.IO server function
function initSocketServer(httpServer){

  // Create a new Socket.IO server instance attached to httpServer
    const io = new Server(httpServer, { /* options */ });

    // Middleware to authenticate each incoming socket connection
    io.use(async(socket, next)=>{

      // Parse cookies from the handshake headers
      const cookies = cookie.parse(socket.handshake.headers?.cookie || "");

      // Extract the token from cookies
      let { token } = cookies;

      // If no token is present, block the connection
      if (!token) return next(new Error("Authentication error: No token provided!"));

      try {
        // Verify the token with the secret key
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);

        // Find the user in the database using decoded token's id
        let user = await userModel.findById(decodedToken.id);

        // Attach the user to the socket object
        socket.user = user;

      } 
      catch (error) {
        // If token is invalid, stop the connection
        return next(new Error("Authentication error: Invalid token"));
      }
      
      // If everything is fine, allow the connection
      next()
    })


  // Event when a client successfully connects
  io.on("connection", (socket) => {

    socket.on("ai-message", async(messagePayload)=>{

      await messageModel.create({
        user: socket.user._id,
        chat: messagePayload.chatID,
        content: messagePayload.content,
        role: "user"
      })

            let userVectors = await generateVector(messagePayload.content);

            await queryMemory({queryVector: userVectors,
               metadata: {}});

            const userMessageId = uuidv4();

            // store vectors into pinecone db   
            await createMemory({
              vectors: userVectors,
              messageId: userMessageId,
              metadata:{chat: messagePayload.chatID,
                        user: socket.user._id,
                        content: messagePayload.content,
                        role: "user"}
              })


      // let chatHistory = await messageModel.find({chat:messagePayload.chatID});
      let chatHistory = ( await messageModel
     .find({ chat: messagePayload.chatID })   // ✅ Find all messages of that chat
    .sort({ createdAt: -1 })                 // ✅ Sort messages by "createdAt" in descending order (newest first)
    .limit(20)                               // ✅ Limit the results to only 10 documents (latest 10 messages)
    .lean()  //Convert MongoDB documents into plain JavaScript objects (removes Mongoose document overhead → improves performance)
).reverse();                                 // ✅ Reverse them back to oldest → latest (oldest first → newest last, like how chats are usually shown in the chat app)


       const res = await generateResponse(chatHistory.map(item=>{
        return {
          role: item.role,
          parts: [{text: item.content}]
        }
      }));  

      await messageModel.create({
        user: socket.user._id,
        chat: messagePayload.chatID,
        content: res,
        role: "model"
      })      

      let modelVectors = await generateVector(res);
      
      const modelMessageId = uuidv4();

      await queryMemory(
        {queryVector: modelVectors,
           metadata: {}}
          );   

      await createMemory({
              vectors: modelVectors,
              messageId: modelMessageId,
              metadata:{chat: messagePayload.chatID,
                        user: socket.user._id,
                      content: res,
                        role: "model"}
              })

                          
              socket.emit("ai-response", {
        content: res,
        chat: messagePayload.chatID
       })
    })

     
});

}

module.exports = initSocketServer