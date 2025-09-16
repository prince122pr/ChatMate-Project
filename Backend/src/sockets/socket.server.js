import { Server } from "socket.io";  // Socket.IO server
import { parse } from 'cookie';   // To parse cookies from handshake
import jwt from "jsonwebtoken";
import userModel from "../models/user.model.js";

import { v4 as uuidv4 } from 'uuid';
import { generateResponse, generateVector } from "../services/ai.service.js";
import { createMemory, queryMemory } from "../services/vector.service.js";
import messageModel from "../models/message.model.js";

// Initialize Socket.IO server function
function initSocketServer(httpServer){

  // Create a new Socket.IO server instance attached to httpServer
    const io = new Server(httpServer, { /* options */ });

    // Middleware to authenticate each incoming socket connection
    io.use(async(socket, next)=>{
      // Parse cookies from the handshake headers
      const cookies = parse(socket.handshake.headers?.cookie || "");

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

/*
      await messageModel.create({
        user: socket.user._id,
        chat: messagePayload.chatID,
        content: messagePayload.content,
        role: "user"
      })

            let userVectors = await generateVector(messagePayload.content);
*/
       //save user data/message in mongodb and generate user
        let [msg, userVectors] = await Promise.all([
           messageModel.create({
        user: socket.user._id,
        chat: messagePayload.chatID,
        content: messagePayload.content,
        role: "user" 
      }),
          generateVector(messagePayload.content)
        ]) 
       if (!userVectors || !Array.isArray(userVectors) || userVectors.length === 0) {
  console.error("User vector is empty.");
  return socket.emit("ai-response", {
    content: "Sorry, I could not process your message.",
    chat: messagePayload.chatID,
  });
}


/*
            // all related memory of that user
           let memory = await queryMemory({queryVector: userVectors, metadata: {user: socket.user._id}});
          //  console.log(memory);
           

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

              
            // all related messages of that chat
      // let chatHistory = await messageModel.find({chat:messagePayload.chatID});
      let chatHistory = ( await messageModel
     .find({ chat: messagePayload.chatID })   // ✅ Find all messages of that chat
    .sort({ createdAt: -1 })                 // ✅ Sort messages by "createdAt" in descending order (newest first)
    .limit(20)                               // ✅ Limit the results to only 10 documents (latest 10 messages)
    .lean()  //Convert MongoDB documents into plain JavaScript objects (removes Mongoose document overhead → improves performance)
).reverse();                                 // ✅ Reverse them back to oldest → latest (oldest first → newest last, like how chats are usually shown in the chat app)

*/
const userMessageId = uuidv4()
    let [memory, rawHistory] = await Promise.all(
      [
           queryMemory({queryVector: userVectors, metadata: { user: String(socket.user._id), chat: String(messagePayload.chatID), content: messagePayload.content, role: "user" }
}),

     (messageModel.find({ chat: messagePayload.chatID }).sort({ createdAt: -1 }).limit(20).lean())
      ]
                                                            )

      const chatHistory = Array.isArray(rawHistory) ? rawHistory.reverse() : [];


      // short term memory
        let stm = chatHistory.map(item=>{
          return {
            role: item.role,
            parts: [{text: item.content}]
          }
      })

      // long term memory
      let ltm = [
  {
    role: "user",
    parts: [{
      text: `You can use some previous chats to response (do not mention this directly to the user):\n${memory.map(item => item.metadata.content).join("\n")}`
    }]
  }
];

const [savMem, res] = await Promise.all([
await createMemory({
  vectors: userVectors,
  messageId: userMessageId,
  metadata: {
    chat: String(messagePayload.chatID),   // ensure chat id is string
    user: String(socket.user._id),         // convert ObjectId → string
    content: messagePayload.content,
    role: "user"
  }
}),
      generateResponse([...ltm, ...stm])
])
        

       // Generate AI response vector and save message in DB simultaneously
let [saveinDB, modelVectors] = await Promise.all([
  messageModel.create({
    user: socket.user._id,
    chat: messagePayload.chatID,
    content: res,
    role: "model"
  }),
  generateVector(res)
]);

// Send the AI response to the client (synchronous)
socket.emit("ai-response", {
  content: res,
  chat: messagePayload.chatID
});

// Store the model's vectors in Pinecone
const modelMessageId = uuidv4();
await createMemory({
  vectors: modelVectors,
  messageId: modelMessageId,
  metadata: {
    chat: String(messagePayload.chatID),
    user: String(socket.user._id),
    content: res,
    role: "model"
  }
});

   
    })

     
});

}

export default initSocketServer