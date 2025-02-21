import {Router} from "express";
import {authController} from "./authController";
import {authValidate} from "./middlewares/authValidate";
import {errorsResultMiddleware} from "../middlewares/errorsResultMiddleware";
import {confirmationCodeValidate, userCredentialsValidate} from "../users/middlewares/UserCredentialsValidate";
import {refreshTokenMiddleware} from "./middlewares/RefreshTokenMiddleware";
import {authBearerMiddleware} from "./middlewares/authBearerMiddleware";

export const authRouter = Router()

authRouter.post('/login' , authValidate , errorsResultMiddleware ,  authController.Login)
authRouter.get('/me' ,authBearerMiddleware ,authController.Me)

authRouter.post('/registration-confirmation' , confirmationCodeValidate , errorsResultMiddleware , authController.ConfirmationByCode)
authRouter.post('/registration' , ...userCredentialsValidate , errorsResultMiddleware , authController.Registration)
authRouter.post('/registration-email-resending' , userCredentialsValidate[1], errorsResultMiddleware  ,authController.RegistrationCodeResending)
authRouter.post('/refresh-token' ,refreshTokenMiddleware ,authController.Refresh_Token)
authRouter.post('/logout' , refreshTokenMiddleware , authController.logout)
