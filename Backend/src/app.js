import express, { json } from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import authRouter from './routes/auth.routes.js';
import { userRouter } from './routes/user.route.js';
import chatRouter from './routes/chat.routes.js';

const app = express();

app.use(cors({
    origin:"http://localhost:5173",
    credentials: true
}));

app.use(json());
app.use(cookieParser())

app.use('/api/auth', authRouter);
app.use('/api/user', userRouter)
app.use('/api/chat', chatRouter)


export default app;