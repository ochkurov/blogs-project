import {ObjectId} from "mongodb";

export class CreateSession {
    _id: ObjectId;
    userId: ObjectId;
    title: string;
    ip: string;
    iat: number;
    exp: number;
    constructor(_id: ObjectId, userId: ObjectId, title: string, ip: string, iat: number, exp: number) {
        this._id = _id
        this.userId = userId
        this.title = title
        this.ip = ip
        this.iat = iat
        this.exp = exp
    }
}
