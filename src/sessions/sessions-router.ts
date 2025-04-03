import {Router} from "express";
import {refreshTokenMiddleware, sessionController} from "../compositionRoot";

export const sessionRouter = Router();

sessionRouter.get('/devices' , refreshTokenMiddleware.execute ,  sessionController.getAllDeviceSessions)
sessionRouter.delete('/devices'  , refreshTokenMiddleware.execute , sessionController.terminateAllOtherSessions)
sessionRouter.delete('/devices/:deviceId' , refreshTokenMiddleware.execute , sessionController.terminateSessionByDeviceId)
k
