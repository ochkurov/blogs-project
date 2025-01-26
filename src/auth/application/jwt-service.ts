import jwt from 'jsonwebtoken'
import {SETTINGS} from "../../settings";


export const jwtService = {
    async createJWT (userId:string) {
        return jwt.sign({userId}, SETTINGS.JWT_SECRET, {expiresIn: '24h'});

    },
    async getUserIdByToken (token:string) {
        try {
            const result:any = jwt.verify(token , SETTINGS.JWT_SECRET)
            const userId = result.userId
            return userId
        }
        catch (error) {
            return null
        }

    }
}
