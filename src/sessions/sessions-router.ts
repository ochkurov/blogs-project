import {Router} from "express";
import {sessionController} from "./sessionController";
import {refreshTokenMiddleware} from "../compositionRoot";

export const sessionRouter = Router();

sessionRouter.get('/devices' , refreshTokenMiddleware.execute ,  sessionController.getAllDeviceSessions)
sessionRouter.delete('/devices'  , refreshTokenMiddleware.execute , sessionController.terminateAllOtherSessions)
sessionRouter.delete('/devices/:deviceId' , refreshTokenMiddleware.execute , sessionController.terminateSessionByDeviceId)
