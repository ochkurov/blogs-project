import {NextFunction, Request, Response} from "express";
import {SETTINGS} from "../settings";

export const authorizationMidleware = (
    req: Request,
    res: Response,
    next: NextFunction
) => {

    let data = `${SETTINGS.CREDENTIAL.LOGIN}:${SETTINGS.CREDENTIAL.PASSWORD}`
    let base64data = Buffer.from(data).toString("base64")
    const validAuthData = `Basic ${base64data}`
    let authHeader = req.headers.authorization;

    if (authHeader && authHeader === validAuthData) {
        next()
    } else res.sendStatus(401)
}

