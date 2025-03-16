import {ObjectId} from "mongodb";
import {deviceCollection} from "../db/mongoDb";

class SessionRepository {
    async deleteAllUserSessions (userId: ObjectId , deviceId: ObjectId) {
        const res = await deviceCollection.deleteMany({
            userId: userId,
            _id: {$ne: deviceId},
        })
        return !!res

    }
    async deleteSessionByDeviceId (deviceId: ObjectId) {
        const result = await deviceCollection.deleteOne({ _id: deviceId })
        return !!result
    }
}

export const sessionRepository = new SessionRepository();
