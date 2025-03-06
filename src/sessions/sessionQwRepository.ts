import {deviceCollection} from "../db/mongoDb";
import {SessionType, SessionTypeForResponse} from "./types/session-types";
import {ObjectId} from "mongodb";
import {sessionMapper} from "./dto/sessionMapper";

export const sessionQwRepository = {
    async getAllSessions (deviceId : string) : Promise<SessionTypeForResponse[] | null> {
        const sessions =  await deviceCollection.find({_id: new ObjectId(deviceId)}).toArray()
        if (!sessions) {
            return null
        }
        return sessions.map(sessionMapper)
    }
}
