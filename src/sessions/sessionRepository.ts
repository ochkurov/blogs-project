import {ObjectId} from "mongodb";
import {deviceCollection} from "../db/mongoDb";

export class SessionRepository {
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

