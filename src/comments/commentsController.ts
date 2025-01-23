import {Request, Response} from "express";
import {CommentResponseType} from "../types/comment-types";
import {commentsService} from "./comments-service";

export const commentsController = {
    async getCommentsById (req: Request<{ id: string }>, res: Response<CommentResponseType>) {
        const id = req.params.id;

        if (!id) {
            res.sendStatus(404)
            return;
        }

    },
    async updateComment ( req: Request<{ id: string } , {} , { content:string }>, res: Response ) {
        const id = req.params.id;
        const content = req.body.content;

        if (!id) {
            res.sendStatus(404)
            return;
        }

        const updateComment = await commentsService.updateComment(id, content)

        if (!updateComment) {
            res.sendStatus(404)
            return;
        } else res.sendStatus(204)

    },
    async deleteComment ( req: Request<{ id: string }>, res: Response ) {
        const id = req.params.id;
    }

}
