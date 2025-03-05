import {Request, Response, NextFunction} from "express";

export const rateLimitMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const ip = req.headers['x-forwarded-for']
        ? (req.headers['x-forwarded-for'] as string).split(',')[0].trim()
        : req.socket.remoteAddress;
    const baseUrl = req.originalUrl;
    
}
