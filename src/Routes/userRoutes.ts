// import AuthController from "../Controllers/userController";
import express from "express";
import {getUser, login, logout, signup} from "../Controllers/userController";


const userRouter = express.Router();


userRouter.use(express.json());

userRouter.post('/signup',signup);
userRouter.post('/login',login);
userRouter.get('/logout',logout);
userRouter.get('/user',getUser);
export default userRouter;

