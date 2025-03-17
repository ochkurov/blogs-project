import {Router} from "express";
import {authValidate, newPasswordValidate, recoveryCodeValidate} from "./middlewares/authValidate";
import {errorsResultMiddleware} from "../middlewares/errorsResultMiddleware";
import {confirmationCodeValidate, userCredentialsValidate} from "../users/middlewares/UserCredentialsValidate";
import {refreshTokenMiddleware} from "./middlewares/RefreshTokenMiddleware";
import {authBearerMiddleware} from "./middlewares/authBearerMiddleware";
import {rateLimitMiddleware} from "./middlewares/rateLimitMiddleware";
import {AuthController} from "./authController";

export const authRouter = Router()

export const authController = new AuthController()


authRouter.post('/login' ,rateLimitMiddleware ,authValidate , errorsResultMiddleware ,  authController.Login.bind(authController))
authRouter.get('/me' ,authBearerMiddleware ,authController.Me.bind(authController))

authRouter.post('/registration-confirmation' , rateLimitMiddleware ,confirmationCodeValidate , errorsResultMiddleware , authController.ConfirmationByCode.bind(authController))
authRouter.post('/registration' , rateLimitMiddleware , ...userCredentialsValidate , errorsResultMiddleware , authController.Registration.bind(authController))
authRouter.post('/registration-email-resending' , rateLimitMiddleware , userCredentialsValidate[1], errorsResultMiddleware  ,authController.RegistrationCodeResending.bind(authController))
authRouter.post('/refresh-token' ,refreshTokenMiddleware ,authController.Refresh_Token.bind(authController))
authRouter.post('/logout' , refreshTokenMiddleware , authController.logout.bind(authController))
authRouter.post('/password-recovery' , rateLimitMiddleware , userCredentialsValidate[1] , errorsResultMiddleware , authController.passwordRecovery.bind(authController))
authRouter.post('/new-password' , rateLimitMiddleware , newPasswordValidate , recoveryCodeValidate , errorsResultMiddleware , authController.newPassword.bind(authController))
