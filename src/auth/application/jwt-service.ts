import {UserSecureType} from "../../types/users-types";
import jwt from 'jsonwebtoken'

import {SETTINGS} from "../../settings";

export const jwtService = {
    async createJWT (user:UserSecureType) {
        const token = jwt.sign({userId: user._id}, SETTINGS.JWT_SECRET, {expiresIn: '24h'});
        return {
            resultCode: 0,
            data: {
                token
            }
        }
    },
    async getUserIdByToken (token:string) {
        try {
            const result:any = jwt.verify(token , SETTINGS.JWT_SECRET)
            const userId = result.id
            return userId
        }
        catch (error) {
            return null
        }

    }
}
