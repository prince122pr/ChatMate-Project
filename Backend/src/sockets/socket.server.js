const { Server } = require("socket.io");  // Socket.IO server
const cookie = require('cookie')   // To parse cookies from handshake
const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");
const generateResponse = require("../services/ai.service");
const messageModel = require("../models/message.model");

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

      let chatHistory = await messageModel.find({chat:messagePayload.chatID});

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


      // getting all conversation between user and ai
      // console.log("chatHistory: ",);
      
       
       socket.emit("ai-response", {
        content: res,
        chat: messagePayload.chatID
       })
    })
     
});

}

module.exports = initSocketServer