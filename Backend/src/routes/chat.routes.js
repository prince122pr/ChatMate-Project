import { Router } from "express";
import { createChat, getAllUserChats, getChatMessages } from "../controllers/chat.controller.js";
import isAuth from "../middlewares/auth.middleware.js";

const chatRouter = Router();

chatRouter.post("/create-chat", isAuth, createChat);
chatRouter.get("/getAllUserChats", isAuth, getAllUserChats)

chatRouter.get('/getChatMessages/:chatId',isAuth, getChatMessages)

export default chatRouter;
