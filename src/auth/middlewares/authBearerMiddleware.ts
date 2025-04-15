import {NextFunction, Request, Response} from "express";
import {jwtService} from "../application/jwt-service";
import {UserService} from "../../users/users-service";


export class AuthBearerGuard {

    constructor(private usersService: UserService) {

    }

    public execute = async (req: Request<any ,any , any , any>, res: Response, next: NextFunction) => {

        if (!req.headers.authorization) {
            res.sendStatus(401)
            return
        }
        const token = req.headers.authorization.split(' ')[1]

        const userId = await jwtService.getUserIdByToken(token)

        if (!userId) {
            res.sendStatus(401)
            return
        }

        req.user = await this.usersService.getUserById(userId.toString())
        next()
    }


}
