import {Request, Response} from "express";
import {usersService} from "../users/users-service";
import {jwtService} from "./application/jwt-service";
import {usersQwRepository} from "../users/usersQwRepository";
import {UserForAuthMe, UserInputModel} from "../types/users-types";
import {authService} from "./auth-service";

type authType = {
    loginOrEmail: string,
    password: string
}
type CheckType = {
    status: number
}

export const authController = {
    async Login(req: Request<{}, {}, authType>, res: Response) {

        const check: CheckType = await usersService.checkCredentials(req.body.loginOrEmail, req.body.password)

        if (check.status === 401) {
            res.sendStatus(401)
            return
        }

        const findUser = await usersService.getUserByLoginOrEmail(req.body.loginOrEmail)

        const token = await jwtService.createJWT(findUser?._id.toString()!)

        res.status(200).json({accessToken: token.toString()})
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
            res.sendStatus(result.status).json({
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
            res.sendStatus(confirmUser.status).json({errorsMesages: confirmUser.errors})
            return
        }
        res.sendStatus(confirmUser.status)
    },

    async RegistrationCodeResending(req: Request<{}, {}, { email: string }>, res: Response) {
        const email = req.body.email

    }
}
