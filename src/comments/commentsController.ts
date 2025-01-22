import {Request, Response} from "express";
import {CommentResponseType} from "../types/comment-types";

export const commentsController = {
    async getCommentsById (req: Request<{ id: string }>, res: Response<CommentResponseType>) {
        const id = req.params.id;

    }
}
