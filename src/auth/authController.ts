import {Request, Response} from "express";
import {usersService} from "../users/users-service";
import {jwtService} from "./application/jwt-service";
import {usersQwRepository} from "../users/usersQwRepository";
import {UserForAuthMe} from "../types/users-types";

type authType = {
    loginOrEmail: string,
    password: string
}
type CheckType = {
    status:number
}

export const authController = {
    async Login (req: Request<{} , {} , authType>, res: Response) {

        const check:CheckType = await usersService.checkCredentials(req.body.loginOrEmail , req.body.password)

        if (check.status === 401) {
            res.sendStatus(401)
            return
        }

        const findUser = await usersService.getUserByLoginOrEmail(req.body.loginOrEmail)

        const token = await jwtService.createJWT(findUser?._id.toString()!)

        res.status(200).json({accessToken:token.toString()})
    },
    async Me (req: Request, res: Response) {
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
        const userForResponse:UserForAuthMe = {
            email: user.email,
            login: user.login,
            userId: user._id.toString()
        }
        res.status(200).json(userForResponse)
    } ,
    async ConfirmationByCode (req: Request, res: Response) {

    },
    async Registration (req: Request, res: Response) {

    },
    async RegistrationCodeResending (req: Request, res: Response) {

    }

}
