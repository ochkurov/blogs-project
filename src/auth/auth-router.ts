import {Router} from "express";
import {authValidate, newPasswordValidate, recoveryCodeValidate} from "./middlewares/authValidate";
import {errorsResultMiddleware} from "../middlewares/errorsResultMiddleware";
import {confirmationCodeValidate, userCredentialsValidate} from "../users/middlewares/UserCredentialsValidate";


import {rateLimitMiddleware} from "./middlewares/rateLimitMiddleware";
import {authBearerMiddleware, authController, refreshTokenMiddleware} from "../compositionRoot";


export const authRouter = Router()




authRouter.post('/login' ,rateLimitMiddleware ,authValidate , errorsResultMiddleware ,  authController.Login.bind(authController))
authRouter.get('/me' ,authBearerMiddleware.execute.bind(authBearerMiddleware) ,authController.Me.bind(authController))

authRouter.post('/registration-confirmation' , rateLimitMiddleware ,confirmationCodeValidate , errorsResultMiddleware , authController.ConfirmationByCode.bind(authController))
authRouter.post('/registration' , rateLimitMiddleware , ...userCredentialsValidate , errorsResultMiddleware , authController.Registration.bind(authController))
authRouter.post('/registration-email-resending' , rateLimitMiddleware , userCredentialsValidate[1], errorsResultMiddleware  ,authController.RegistrationCodeResending.bind(authController))
authRouter.post('/refresh-token' ,refreshTokenMiddleware.execute ,authController.Refresh_Token.bind(authController))
authRouter.post('/logout' , refreshTokenMiddleware.execute , authController.logout.bind(authController))
authRouter.post('/password-recovery' , rateLimitMiddleware , userCredentialsValidate[1] , errorsResultMiddleware , authController.passwordRecovery.bind(authController))
authRouter.post('/new-password' , rateLimitMiddleware , newPasswordValidate , recoveryCodeValidate , errorsResultMiddleware , authController.newPassword.bind(authController))
