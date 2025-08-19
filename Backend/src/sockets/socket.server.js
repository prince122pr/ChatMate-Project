const { Server } = require("socket.io");

function initSocketServer(httpServer){
    const io = new Server(httpServer, { /* options */ });

    
io.on("connection", (socket) => {
  console.log('Connected!');
  
});

}

module.exports = initSocketServer