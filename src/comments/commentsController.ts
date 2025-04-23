import {Request, Response} from "express";
import {CommentsViewModel} from "../types/comment-types";
import {CommentsService} from "./comments-service";
import {CommentsRepository} from "./commentsRepository";
import {CommentsQwRepository} from "./commentsQwRepository";
import {ObjectId} from "mongodb";
import {LikeStatusEnum} from "../likes /domain/like.entity";


export class CommentsController {

    constructor(
        private commentsService: CommentsService,
        private commentsRepository: CommentsRepository,
        private commentsQwRepository: CommentsQwRepository) {

    }

    async getCommentsById(req: Request<{ id: string }>, res: Response<CommentsViewModel>) {
        const commentId = req.params.id;
        const userId = req.user?._id?.toString()

        if (!commentId) {
            res.sendStatus(404)
            return;
        }
        const result = await this.commentsQwRepository.getCommentById( commentId , userId );
        if (!result) {
            res.sendStatus(404)n
            return
        }
        res.status(200).json(result);

    }

    async updateComment(req: Request<{ id: string }, {}, { content: string }>, res: Response) {

        const userId = req.user?._id || ''
        const commentId = req.params.id;
        const content = req.body.content;

        if (!commentId || !ObjectId.isValid(commentId)) {
            res.sendStatus(404)
            return;
        }
        const foundComment = await this.commentsRepository.getCommentById(commentId)

        if (foundComment && foundComment.commentatorInfo.userId.toString() !== userId.toString()) {
            res.sendStatus(403)
            return
        }
        if (!foundComment) {
            res.sendStatus(404)
            return
        }
        const updateComment = await this.commentsService.updateComment(commentId, content)

        if (!updateComment) {
            res.sendStatus(404)
            return;
        } else res.sendStatus(204)

    }

    async deleteComment(req: Request<{ id: string }>, res: Response): Promise<void> {
        const commentId = req.params.id;
        const userId = req.user?._id || ''

        if (!commentId || !ObjectId.isValid(commentId)) {
            res.sendStatus(404)
            return
        }
        const foundComment = await this.commentsRepository.getCommentById(commentId)

        if (foundComment && foundComment.commentatorInfo.userId.toString() !== userId.toString()) {
            res.sendStatus(403)
            return
        }
        if (!foundComment) {
            res.sendStatus(404)
            return
        }
        const deletedComment = await this.commentsRepository.deleteComment(commentId)
        if (!deletedComment) {
            res.sendStatus(404)
            return
        }
        res.sendStatus(204)
    }

    async updateLikeStatus(req: Request<{ id: string }, any, { likeStatus: LikeStatusEnum }>, res: Response) {
        const commentId = req.params.id;
        const likeStatus = req.body.likeStatus;
        const userId = req.user!._id.toString();

        if (!commentId) {
            res.sendStatus(404)
            return;
        }

        if (!userId) {
            res.sendStatus(404)
            return
        }

        const result = await this.commentsService.updateLikeStatus(commentId , likeStatus , userId)
        console.log(result + ` vlad`)
        res.sendStatus(result.status)
        return
    }
}

