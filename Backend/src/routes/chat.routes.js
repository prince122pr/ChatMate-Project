import { Router } from "express";
import { createChat } from "../controllers/chat.controller.js";
import isAuth from "../middlewares/auth.middleware.js";

const chatRouter = Router();

chatRouter.post("/", isAuth, createChat);

export default chatRouter;
