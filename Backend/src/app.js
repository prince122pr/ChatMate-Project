const express = require('express');
const cookieParser = require('cookie-parser');
const authRouter = require('./routes/auth.routes');
const chatRouter = require('./routes/chat.routes');

const app = express();

app.use(express.json());
app.use(cookieParser())

app.use('/api/auth', authRouter);
app.use('/api/chat', chatRouter)


module.exports = app;