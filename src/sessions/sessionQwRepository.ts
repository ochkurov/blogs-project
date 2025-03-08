import {deviceCollection} from "../db/mongoDb";
import {SessionType, SessionTypeForResponse} from "./types/session-types";
import {ObjectId} from "mongodb";
import {sessionMapper} from "./dto/sessionMapper";

export const sessionQwRepository = {
    async getAllSessions (userId : ObjectId) : Promise<SessionTypeForResponse[] | null> {
        const sessions =  await deviceCollection.find({userId}).toArray()
        if (!sessions) {
            return null
        }
        return sessions.map(sessionMapper)
    },
    async findSessionByDeviceId (deviceId:ObjectId): Promise<SessionType | null> {
        const session = deviceCollection.findOne({deviceId})
        if (!session) {
            return null
        }
        return session
    }
}
