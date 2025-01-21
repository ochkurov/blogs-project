import {UserSecureType} from "../../types/users-types";
import jwt from 'jsonwebtoken'
import {ObjectId} from "mongodb";

export const jwtService = {
    async createJWT (user:UserSecureType) {
        const token = jwt.sign({userId: user._id}, settings.JWT_SECRET, {expiresIn: '1h'});
        return {
            resultCode: 0,
            data: {
                token
            }
        }
    },
    async getUserIdByToken (token:string) {
        try {
            const result = jwt.verify(token , settings.JWT_SECRET)
            return new ObjectId(result.userId)
        }
        catch (error) {
            return null
        }

    }
}
