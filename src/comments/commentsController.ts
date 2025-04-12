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
        const userId = req.user!._id.toString()

        if (!commentId) {
            res.sendStatus(404)
            return;
        }
        const comment = await this.commentsQwRepository.getCommentById(commentId);
        if (!comment) {
            res.sendStatus(404)
            return
        }
        const commentForResponse: CommentsViewModel = {
            id: comment._id.toString(),
            content: comment.content,
            commentatorInfo: comment.commentatorInfo,
            createdAt: comment.createdAt,
            likesInfo:{
                likesCount:comment.likesInfo.likesCount,
                dislikesCount:comment.likesInfo.dislikesCount,
                myStatus: comment.likesInfo.myStatus
            }

        }
        res.status(200).json(commentForResponse);

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

    async updateLikeStatus(req: Request<{ id: string }, {}, { likeStatus: LikeStatusEnum }>, res: Response) {
        const commentId = req.params.id;
        const likeStatus = req.body.likeStatus;
        const userId = req.user!._id.toString();
        const result = await this.commentsService.updateLikeStatus(commentId , likeStatus , userId)
        return res.sendStatus(result.status)
    }
}

