import {ObjectId} from "mongodb";

export type SessionType = {
    _id: ObjectId,
    userId: string,
    userAgent: string,
    ip: string,
    iat: number,
    exp: number,

}
