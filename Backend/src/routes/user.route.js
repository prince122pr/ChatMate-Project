import express from "express"
import isAuth from "../middlewares/auth.middleware.js";
import { getCurrentUser } from "../controllers/user.controller.js";

export const userRouter = express.Router();

userRouter.get('/get-current-user',isAuth, getCurrentUser);