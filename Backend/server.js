import { createServer } from "http";
import { config } from "dotenv";

import app from "./src/app.js";
import connectDB from "./src/db/db.js";
import initSocketServer from "./src/sockets/socket.server.js";

config(); // load env variables

// Create HTTP server
const server = createServer(app);

// Connect DB
connectDB();

// Init socket server
initSocketServer(server);

const port = process.env.PORT || 3000;

server.listen(port, () => {
  console.log(`🚀 Server is running on port ${port}`);
});
