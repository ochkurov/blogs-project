import {Request, Response, NextFunction} from "express";
import {jwtService} from "../application/jwt-service";

export const getUserIdMiddleware = async (req: Request<any ,any , any , any>, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization || '';

    if (authHeader && authHeader.startsWith("Bearer ")) {
        const token = authHeader.split(" ")[1];
        try {
            const userId: any = await jwtService.getUserIdByToken(token); // Используем decode без проверки подписи
            console.log(userId, 'extractUserIdMiddleware');
            if (userId) {
                req.user = {...req.user! , _id: userId}// Добавляем userId в req
            }
        } catch (error) {
            console.error("Error decoding token:", error);
        }
    }

    next(); // Переходим дальше, даже если userId нет
};
