import {Request, Response} from "express";
import {usersService} from "../users/users-service";

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
        res.sendStatus(204)
    }
}
