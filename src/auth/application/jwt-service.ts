import jwt, {JwtPayload} from 'jsonwebtoken'
import {SETTINGS} from "../../settings";

export interface RefreshJWTPayload extends JwtPayload{
    userId: string;
    tokenId: string;
}
export const jwtService = {
    async createJWT(userId: string): Promise<string> {
        return jwt.sign({userId}, SETTINGS.JWT_SECRET, {expiresIn: '10s'});

    },
    async createRefresh(userId: string, tokenId: string): Promise<string> {
        return jwt.sign({userId, tokenId}, SETTINGS.REFRESH_SECRET, {expiresIn: '20s'});
    },
    async getUserIdByToken(token: string) {
        try {
            const result: any = jwt.verify(token, SETTINGS.JWT_SECRET)
            const userId = result.userId
            return userId
        } catch (error) {
            return null
        }

    },
     verifyRefreshToken (token:string): RefreshJWTPayload | null {
        try {
            return jwt.verify(token, SETTINGS.REFRESH_SECRET) as (RefreshJWTPayload | null)
        } catch (error) {
            return null
        }
    }
}
