import {Request, Response} from "express";
import {usersService} from "../users/users-service";
import {jwtService} from "./application/jwt-service";
import {usersQwRepository} from "../users/usersQwRepository";
import {UserForAuthMe, UserInputModel, UserSecureType} from "../types/users-types";
import {authService} from "./auth-service";
import {deviceCollection} from "../db/mongoDb";

type authType = {
    loginOrEmail: string,
    password: string
}


export const authController = {
    async Login(req: Request<{}, {}, authType>, res: Response) {

        const {loginOrEmail, password} = req.body

        const {status, errors, data} = await authService.login({
            loginOrEmail,
            password,
            ip: req.ip ?? 'default',
            userAgent: req.headers['user-agent'] ?? ''
        });

        if ( status === 401 ) {
            res.sendStatus(status)
            return
        }

        const {refreshToken, accessToken} = data!
        res.cookie('refreshToken', refreshToken.toString(), {httpOnly: true, secure: true,})
        res.status(status).json({accessToken: accessToken.toString()})
    },

    async Refresh_Token(req: Request, res: Response) {

        const user = req.user as UserSecureType | null

        const deviceId = req.deviceId
        

        if (!user) {
            res.sendStatus(401)
            return
        }


        const tokenUpdateResponse = await deviceCollection.updateOne({ tokenId: oldTokenId }, {$set: {deviceId}})

        if (tokenUpdateResponse.modifiedCount === 0) {
            res.sendStatus(500)
            return
        }


        const accessToken = await jwtService.createJWT(user?._id.toString()!)
        const refreshToken = await jwtService.createRefresh(user?._id.toString()!, tokenId)


        res.cookie('refreshToken', refreshToken.toString(), {httpOnly: true, secure: true,})
        res.status(200).json({accessToken: accessToken.toString()})
    },
    async Me(req: Request, res: Response) {

        const userId = req.user?._id

        if (!userId) {
            res.sendStatus(401)
            return
        }
        let user = await usersQwRepository.getUserForAuthMe(userId)

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
    },
    async Registration(req: Request<{}, {}, UserInputModel>, res: Response) {

        const userData = req.body

        const result = await authService.registration(userData)
        if (result.errors && result.errors.length > 0) {
            res.status(result.status).json({
                errorsMessages: result.errors,
            })
            return
        }
        res.sendStatus(204)
        return
    },
    async ConfirmationByCode(req: Request<{}, {}, { code: string }>, res: Response) {
        const code = req.body.code
        const confirmUser = await authService.authByConfirmationCode(code)
        if (confirmUser.errors.length || !confirmUser.data.isConfirmed) {
            res.status(confirmUser.status).json({errorsMessages: confirmUser.errors})
            return
        }
        res.sendStatus(confirmUser.status)
    },

    async RegistrationCodeResending(req: Request<{}, {}, { email: string }>, res: Response) {
        const email = req.body.email
        const result = await authService.resendingConfirmationCode(email)
        if (result.errors && result.errors.length > 0) {
            res.status(result.status).json({
                errorsMessages: result.errors,
            })
            return
        }
        res.sendStatus(result.status)
        return
    },

    async logout(req: Request, res: Response) {
        const userId = req.user?._id.toString()
        const oldTokenId = req.tokenId

        if (!userId) {
            res.sendStatus(401)
            return
        }

        const result = await tokenCollection.deleteOne({tokenId: oldTokenId})

        if (result.deletedCount === 0) {
            res.sendStatus(500)
            return
        }

        res.clearCookie('refreshToken');
        res.sendStatus(204)
        return
    }
}
