import {Router} from "express";
import {refreshTokenMiddleware} from "../auth/middlewares/RefreshTokenMiddleware";
import {sessionController} from "./sessionController";

export const sessionRouter = Router();

sessionRouter.get('/devices' , refreshTokenMiddleware ,  sessionController.getAllDeviceSessions)
sessionRouter.delete('/devices'  , refreshTokenMiddleware , sessionController.terminateAllOtherSessions)
sessionRouter.delete('/devices/:deviceId' , refreshTokenMiddleware , sessionController.terminateSessionByDeviceId)
