import {Router} from "express";
import {authController} from "./authController";
import {authValidate} from "./middlewares/authValidate";
import {errorsResultMiddleware} from "../middlewares/errorsResultMiddleware";

export const authRouter = Router()

authRouter.post('/login' , authValidate , errorsResultMiddleware ,  authController.Login)
authRouter.get('/me' , authController.Me)

authRouter.post('/registration-confirmation' , authController.ConfirmationByCode)
authRouter.post('/registration' , authController.Registration)
authRouter.post('/registration-email-resending' , authController.RegistrationCodeResending)
