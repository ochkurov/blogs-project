import {Request, Response} from "express";
import {ObjectId} from "mongodb";
import {SessionQwRepository} from "./sessionQwRepository";
import {SessionRepository} from "./sessionRepository";

class SessionController {
    sessionQwRepository: SessionQwRepository
    sessionRepository: SessionRepository;
    constructor() {
        this.sessionQwRepository = new SessionQwRepository();
        this.sessionRepository = new SessionRepository();
    }
    async getAllDeviceSessions(req: Request, res: Response) {

        const userId = req.user?._id

        const sessions = await this.sessionQwRepository.getAllSessions(userId!)

        if (!sessions) {

            res.sendStatus(401)
            return
        }

        res.status(200).json(sessions)


    }

    async terminateAllOtherSessions(req: Request, res: Response) {

        const userId = req.user?._id
        const deviceId = req.deviceId

        const result = await this.sessionRepository.deleteAllUserSessions(userId!, new ObjectId(deviceId!))

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
        const session = await this.sessionQwRepository.findSessionByDeviceId(new ObjectId(deviceId))

        if (!session) {
            res.sendStatus(404)
            return
        }

        console.log(session.userId, 's1111', userId)

        if (session.userId.toString() !== userId.toString()) {
            res.sendStatus(403)
            return
        }


        const result = await this.sessionRepository.deleteSessionByDeviceId(new ObjectId(deviceId)!)

        if (!result) {
            res.sendStatus(404)
            return
        }
        res.sendStatus(204)

    }

}

export const sessionController = new SessionController()
