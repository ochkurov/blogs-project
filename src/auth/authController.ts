import {Request, Response} from "express";
import {jwtService} from "./application/jwt-service";
import {UsersQwRepository} from "../users/usersQwRepository";
import {UserForAuthMe, UserInputModel, UserSecureType} from "../types/users-types";
import {deviceCollection} from "../db/mongoDb";
import {ObjectId} from "mongodb";
import {AuthService} from "./auth-service";

type authType = {
    loginOrEmail: string,
    password: string
}

export class AuthController {
    //authService: AuthService
    // usersQwRepository: UsersQwRepository
    constructor(
        private authService: AuthService,
        private usersQwRepository: UsersQwRepository
    ) {
        //this.authService = new AuthService();

    }
    async Login(req: Request<{}, {}, authType>, res: Response) {

        const ip = req.ip

        if (!ip) {
            res.sendStatus(500)
            return
        }

        const {loginOrEmail, password} = req.body

        const {status, errors, data} = await this.authService.login({
            loginOrEmail,
            password,
            ip,
            userAgent: req.headers['user-agent'] ?? ''
        });

        if (status === 401) {
            res.sendStatus(status)
            return
        }

        const {refreshToken, accessToken} = data!
        res.cookie('refreshToken', refreshToken.toString(), {httpOnly: true, secure: true,})
        res.status(status).json({accessToken: accessToken.toString()})
    }

    async Refresh_Token(req: Request, res: Response) {

        const user = req.user as UserSecureType | null

        const deviceId = req.deviceId


        if (!user) {
            res.sendStatus(401)
            return
        }

        const accessToken = await jwtService.createJWT(user?._id.toString()!)
        const refreshToken = await jwtService.createRefresh(user?._id.toString()!, deviceId!)
        const {iat, exp} = jwtService.jwtDecodeToken(refreshToken)

        const sessionUpdateResult = await deviceCollection.updateOne({_id: new ObjectId(deviceId!)}, {$set: {iat, exp}})

        if (sessionUpdateResult.modifiedCount === 0) {
            res.sendStatus(500)
            return
        }


        res.cookie('refreshToken', refreshToken.toString(), {httpOnly: true, secure: true,})
        res.status(200).json({accessToken: accessToken.toString()})
    }

    async Me(req: Request, res: Response) {

        const userId = req.user?._id

        if (!userId) {
            res.sendStatus(401)
            return
        }
        let user = await this.usersQwRepository.getUserForAuthMe(userId)

        if (!user) {
            res.sendStatus(401);
            return;
        }
        const userForResponse: UserForAuthMe = {
            email: user.email,
            login: user.login,
            userId: user._id.toString()
        }
        res.status(200).json(userForResponse)
    }

    async Registration(req: Request<{}, {}, UserInputModel>, res: Response) {

        const userData = req.body

        const result = await this.authService.registration(userData)
        if (result.errors && result.errors.length > 0) {
            res.status(result.status).json({
                errorsMessages: result.errors,
            })
            return
        }
        res.sendStatus(204)
        return
    }

    async ConfirmationByCode(req: Request<{}, {}, { code: string }>, res: Response) {
        const code = req.body.code
        const confirmUser = await this.authService.authByConfirmationCode(code)
        if (confirmUser.errors.length || !confirmUser.data.isConfirmed) {
            res.status(confirmUser.status).json({errorsMessages: confirmUser.errors})
            return
        }
        res.sendStatus(confirmUser.status)
    }

    async RegistrationCodeResending(req: Request<{}, {}, { email: string }>, res: Response) {
        const email = req.body.email
        const result = await this.authService.resendingConfirmationCode(email)
        if (result.errors && result.errors.length > 0) {
            res.status(result.status).json({
                errorsMessages: result.errors,
            })
            return
        }
        res.sendStatus(result.status)
        return
    }

    async logout(req: Request, res: Response) {

        const userId = req.user?._id.toString()
        const deviceId = req.deviceId

        if (!userId) {
            res.sendStatus(401)
            return
        }

        const result = await deviceCollection.deleteOne({_id: new ObjectId(deviceId!)})

        if (result.deletedCount === 0) {
            res.sendStatus(500)
            return
        }

        res.clearCookie('refreshToken');
        res.sendStatus(204)
        return
    }

    async passwordRecovery(req: Request, res: Response) {
        const email = req.body.email
        const result = await this.authService.passwordRecovery(email)
        res.sendStatus(result.status)
    }

    async newPassword(req: Request, res: Response) {
        const newPassword = req.body.newPassword
        const recoveryCode = req.body.recoveryCode

        const changePass = await this.authService.changePassword(newPassword , recoveryCode)
        res.sendStatus(changePass.status)
    }
}


