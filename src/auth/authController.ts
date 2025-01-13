import {Request, Response} from "express";
import {usersService} from "../users/users-service";

type authType = {
    loginOrEmail: string,
    password: string
}
type ChekType = {
    status:number
}

export const authController = {
    async Login (req: Request<{} , {} , authType>, res: Response) {

        const check:ChekType = await usersService.checkCredentials(req.body.loginOrEmail , req.body.password)
        if (check.status === 401) {
            res.sendStatus(401)
        }
        res.sendStatus(204)
    }
}
