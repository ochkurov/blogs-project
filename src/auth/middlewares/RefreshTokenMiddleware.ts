import {NextFunction, Request, Response} from "express";
import {jwtService} from "../application/jwt-service";
import {usersService} from "../../users/users-service";
import {tokenCollection} from "../../db/mongoDb";

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
    const {userId, tokenId} = tokenPayload
    const userTokenEntry = await tokenCollection.findOne({userId, tokenId})
    if(!userTokenEntry) {
        res.sendStatus(401)
        return
    }
    req.user = await usersService.getUserById(userId.toString())
    next()
}
