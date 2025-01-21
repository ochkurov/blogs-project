import {Router} from "express";
import {authController} from "./authController";
import {authValidate} from "./middlewares/authValidate";
import {errorsResultMiddleware} from "../middlewares/errorsResultMiddleware";

export const authRouter = Router()

authRouter.post('/login' , authValidate , errorsResultMiddleware ,  authController.Login)
authRouter.get('/me' , )
