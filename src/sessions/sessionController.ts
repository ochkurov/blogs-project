import {Request, Response} from "express";
import {deviceCollection} from "../db/mongoDb";
import {sessionQwRepository} from "./sessionQwRepository";
import {sessionMapper} from "./dto/sessionMapper";
import {sessionRepository} from "./sessionRepository";

export const sessionController = {
    getAllDeviceSessions: async (req: Request, res: Response) => {
        const deviceId = req.deviceId

        const sessions = await sessionQwRepository.getAllSessions(deviceId!)

        if (!sessions) {
            res.sendStatus(401)
            return
        }

        res.status(200).json(sessions)


    },
    terminateAllOtherSessions: async (req: Request, res: Response) => {

        const userId = req.user?._id
        const deviceId = req.deviceId

        const result = await sessionRepository.deleteAllUserSessions(userId!, deviceId!)

        if (!result) {
            res.sendStatus(401)
            return
        }

        res.sendStatus(204)

    },
    terminateSessionByDeviceId: async (req: Request, res: Response) => {
        const userId = req.user?._id
        const deviceId = req.deviceId


        if (!userId) {
            res.sendStatus(404)
            return
        }


        const result = await sessionRepository.deleteSessionByDeviceId(userId!, deviceId!)
        if (!result) {
            res.sendStatus(403)
            return
        }
        res.sendStatus(204)

    }

}
