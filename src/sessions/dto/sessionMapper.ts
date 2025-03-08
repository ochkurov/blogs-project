import {SessionType, SessionTypeForResponse} from "../types/session-types";

export const sessionMapper = (session: SessionType):SessionTypeForResponse => {
    return {
        ip: session.ip,
        title: session.title,
        lastActiveDate: new Date(session.iat*1000).toISOString(),
        deviceId: session._id.toString()
    }
}
