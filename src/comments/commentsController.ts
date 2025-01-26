import {Request, Response} from "express";
import {CommentResponseType, CommentsViewModel} from "../types/comment-types";
import {commentsService} from "./comments-service";
import {commentsRepository} from "./commentsRepository";
import {commentsQwRepository} from "./commentsQwRepository";
import {ObjectId} from "mongodb";

export const commentsController = {
    async getCommentsById(req: Request<{ id: string }>, res: Response<CommentsViewModel>) {
        const commentId = req.params.id;

        if (!commentId) {
            res.sendStatus(404)
            return;
        }
        const comment = await commentsQwRepository.getCommentById(commentId);
        if (!comment) {
            res.sendStatus(404)
            return
        }
        const commentForResponse: CommentsViewModel = {
            id:comment._id.toString(),
            content:comment.content,
            commentatorInfo:comment.commentatorInfo,
            createdAt: comment.createdAt,


        }
        res.status(200).json(commentForResponse);

    },

    async updateComment(req: Request<{ id: string }, {}, { content: string }>, res: Response) {

        const userId = req.user?._id || ''
        const commentId = req.params.id;
        const content = req.body.content;

        if (!commentId || !ObjectId.isValid(commentId)) {
            res.sendStatus(404)
            return;
        }
        const foundComment = await commentsRepository.getCommentById(commentId)

        if(foundComment.commentatorInfo.userId.toString() !== userId.toString()) {
             res.sendStatus(403)
            return
        }

        const updateComment = await commentsService.updateComment(commentId,  content)

        if (!updateComment) {
            res.sendStatus(404)
            return;
        } else  res.sendStatus(204)

    },
    async deleteComment(req: Request<{ id: string }>, res: Response): Promise<void> {
        const commentId = req.params.id;
        const userId = req.user?._id || ''

        if (!commentId || !ObjectId.isValid(commentId) ) {
            res.sendStatus(404)
            return
        }
        const foundComment = await commentsRepository.getCommentById(commentId)

        if (foundComment.commentatorInfo.userId.toString() !== userId.toString()) {
             res.sendStatus(403)
            return
        }
        const deletedComment = await commentsRepository.deleteComment(commentId)
        if (!deletedComment) {
            res.sendStatus(404)
            return
        }
         res.sendStatus(204)
    }

}
