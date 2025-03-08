import {ObjectId} from "mongodb";
import {deviceCollection} from "../db/mongoDb";
import {usersRepository} from "../users/usersRepository";

export const sessionRepository = {
    async deleteAllUserSessions (userId: ObjectId , deviceId: ObjectId) {
        const res = await deviceCollection.deleteMany({
            userId: userId,
            _id: {$ne: deviceId},
        })
        return !!res

    },
    async deleteSessionByDeviceId (userId: ObjectId, deviceId: string) {
       const result = await deviceCollection.deleteOne({ userId , deviceId })
        return !!result
    }
}
