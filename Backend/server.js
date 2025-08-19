const app = require('./src/app');
const connectDB = require('./src/db/db');

const httpServer = require("http").createServer(app);
const initSocketServer = require('./src/sockets/socket.server');

require('dotenv').config();

connectDB();

initSocketServer(httpServer);

let port = process.env.PORT || 3000;

httpServer.listen(port, ()=>{
    console.log(`Server is running on the port ${port}`);
})