import {Request, Response, NextFunction} from "express";
import {rateLimitRepository} from "../../features/rateLimit/rateLimitRepository";

export const rateLimitMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const ip = req.headers['x-forwarded-for']
        ? (req.headers['x-forwarded-for'] as string).split(',')[0].trim()
        : req.socket.remoteAddress;
    const baseUrl = req.originalUrl;

    if (!ip) {
        res.sendStatus(400)
        return
    }
    try {
        await rateLimitRepository.addActivity(ip, baseUrl)
        const countActivity: number = await rateLimitRepository.countActivity(ip, baseUrl)

        if (countActivity > 5) {
            res.sendStatus(429)
            return;
        }
        next()
    } catch (e) {
        res.sendStatus(429)
        return;
    }

}
