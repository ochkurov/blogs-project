import {Router} from "express";
import {authController} from "./authController";
import {authValidate, newPasswordValidate, recoveryCodeValidate} from "./middlewares/authValidate";
import {errorsResultMiddleware} from "../middlewares/errorsResultMiddleware";
import {confirmationCodeValidate, userCredentialsValidate} from "../users/middlewares/UserCredentialsValidate";
import {refreshTokenMiddleware} from "./middlewares/RefreshTokenMiddleware";
import {authBearerMiddleware} from "./middlewares/authBearerMiddleware";
import {rateLimitMiddleware} from "./middlewares/rateLimitMiddleware";

export const authRouter = Router()

authRouter.post('/login' ,rateLimitMiddleware ,authValidate , errorsResultMiddleware ,  authController.Login)
authRouter.get('/me' ,authBearerMiddleware ,authController.Me)

authRouter.post('/registration-confirmation' , rateLimitMiddleware ,confirmationCodeValidate , errorsResultMiddleware , authController.ConfirmationByCode)
authRouter.post('/registration' , rateLimitMiddleware , ...userCredentialsValidate , errorsResultMiddleware , authController.Registration)
authRouter.post('/registration-email-resending' , rateLimitMiddleware , userCredentialsValidate[1], errorsResultMiddleware  ,authController.RegistrationCodeResending)
authRouter.post('/refresh-token' ,refreshTokenMiddleware ,authController.Refresh_Token)
authRouter.post('/logout' , refreshTokenMiddleware , authController.logout)
authRouter.post('password-recovery' ,rateLimitMiddleware , userCredentialsValidate[1] , errorsResultMiddleware ,authController.passwordRecovery)
authRouter.post('new-password' , rateLimitMiddleware , newPasswordValidate , recoveryCodeValidate , errorsResultMiddleware ,authController.newPassword)
