import {Request, Response} from "express";
import {sessionQwRepository} from "./sessionQwRepository";
import {sessionRepository} from "./sessionRepository";
import {ObjectId} from "mongodb";

class SessionController {
    async getAllDeviceSessions(req: Request, res: Response) {

        const userId = req.user?._id

        const sessions = await sessionQwRepository.getAllSessions(userId!)

        if (!sessions) {

            res.sendStatus(401)
            return
        }

        res.status(200).json(sessions)


    }

    async terminateAllOtherSessions(req: Request, res: Response) {

        const userId = req.user?._id
        const deviceId = req.deviceId

        const result = await sessionRepository.deleteAllUserSessions(userId!, new ObjectId(deviceId!))

        if (!result) {
            res.sendStatus(401)
            return
        }

        res.sendStatus(204)

    }

    async terminateSessionByDeviceId(req: Request, res: Response) {

        const userId = req.user?._id
        const deviceId = req.params.deviceId

        if (!userId) {
            res.sendStatus(404)
            return
        }


        if (!deviceId) {
            res.sendStatus(404)
            return
        }
        const session = await sessionQwRepository.findSessionByDeviceId(new ObjectId(deviceId))

        if (!session) {
            res.sendStatus(404)
            return
        }

        console.log(session.userId, 's1111', userId)

        if (session.userId.toString() !== userId.toString()) {
            res.sendStatus(403)
            return
        }


        const result = await sessionRepository.deleteSessionByDeviceId(new ObjectId(deviceId)!)

        if (!result) {
            res.sendStatus(404)
            return
        }
        res.sendStatus(204)

    }

}

export const sessionController = new SessionController()
