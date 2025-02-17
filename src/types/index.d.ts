import {UserSecureType} from "./users-types";

declare global {
    declare namespace Express {
        export interface Request {
            user: UserSecureType | null;
            tokenId: string | null;
        }
    }
}
