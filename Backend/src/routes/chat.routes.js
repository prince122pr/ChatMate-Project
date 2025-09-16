import { Router } from "express";
import { createChat, getAllUserChats, getChatMessages, sendMessage } from "../controllers/chat.controller.js";
import isAuth from "../middlewares/auth.middleware.js";

const chatRouter = Router();

chatRouter.post("/create-chat", isAuth, createChat);
chatRouter.get("/getAllUserChats", isAuth, getAllUserChats)

chatRouter.get('/getChatMessages/:chatId',isAuth, getChatMessages)
chatRouter.post('/sendMessage',isAuth, sendMessage)

export default chatRouter;
