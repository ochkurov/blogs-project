import {NextFunction, Request, Response} from "express";
import {jwtService} from "../application/jwt-service";
import {usersService} from "../../users/users-service";
import {deviceCollection} from "../../db/mongoDb";
import {SessionType} from "../../sessions/types/session-types";


export const refreshTokenMiddleware = async (req: Request, res: Response, next: NextFunction) => {

    let refreshToken = req.cookies.refreshToken

    if (!refreshToken) {
        res.sendStatus(401)
        return
    }
    const tokenPayload = jwtService.verifyRefreshToken(refreshToken)

    if(!tokenPayload || !tokenPayload?.userId) {
        res.sendStatus(401)
        return
    }
    const { userId, deviceId , iat , exp} = tokenPayload

    const userSession:SessionType = await deviceCollection.findOne({userId, deviceId})

    if(userSession.iat === iat && userSession.exp === exp) {
        res.sendStatus(401)
        return
    }
    if (!userSession ) {
        res.sendStatus(401)
        return
    }


    req.user = await usersService.getUserById(userId.toString())
    req.deviceId = deviceId
    next()
}
