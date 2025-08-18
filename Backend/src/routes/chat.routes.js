const express = require("express");
const authMiddleware = require("../middlewares/auth.middleware");
const { createChat } = require("../controllers/chat.controller");

const chatRouter = express.Router();

chatRouter.post('/', authMiddleware, createChat);

module.exports = chatRouter
