import {NextFunction, Request, Response} from "express";
import {jwtService} from "../application/jwt-service";
import {deviceCollection} from "../../db/mongoDb";
import {ObjectId} from "mongodb";
import {UserService} from "../../users/users-service";


export class RefreshTokenGuard {
    constructor(private usersService: UserService) {

    }
    public execute = async (req: Request, res: Response, next: NextFunction) => {

        let refreshToken = req.cookies.refreshToken

        if (!refreshToken) {
            res.sendStatus(401)
            return
        }
        const tokenPayload = jwtService.verifyRefreshToken(refreshToken)

        if (!tokenPayload || !tokenPayload?.userId) {
            res.sendStatus(401)
            return
        }
        const {userId, deviceId, iat, exp} = tokenPayload

        const userSession = await deviceCollection.findOne({_id: new ObjectId(deviceId)})

        if (!userSession) {
            res.sendStatus(401)
            return
        }


        if (userSession.iat !== iat || userSession.exp !== exp) {
            res.sendStatus(401)
            return
        }


        req.user = await this.usersService.getUserById(userId.toString())
        req.deviceId = deviceId
        next()
    }
}
