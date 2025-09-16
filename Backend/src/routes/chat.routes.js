import { Router } from "express";
import { createChat, getAllUserChats } from "../controllers/chat.controller.js";
import isAuth from "../middlewares/auth.middleware.js";

const chatRouter = Router();

chatRouter.post("/", isAuth, createChat);
chatRouter.get("/getAllUserChats", isAuth, getAllUserChats)

export default chatRouter;
