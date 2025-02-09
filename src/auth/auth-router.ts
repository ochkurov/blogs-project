import {Router} from "express";
import {authController} from "./authController";
import {authValidate} from "./middlewares/authValidate";
import {errorsResultMiddleware} from "../middlewares/errorsResultMiddleware";
import {userCredentialsValidate} from "../users/middlewares/UserCredentialsValidate";

export const authRouter = Router()

authRouter.post('/login' , authValidate , errorsResultMiddleware ,  authController.Login)
authRouter.get('/me' , authController.Me)

authRouter.post('/registration-confirmation' , authController.ConfirmationByCode)
authRouter.post('/registration' , ...userCredentialsValidate , errorsResultMiddleware , authController.Registration)
authRouter.post('/registration-email-resending' , authController.RegistrationCodeResending)
