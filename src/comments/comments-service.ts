import {DbCommentType} from "../types/comment-types";
import {CommentsRepository} from "./commentsRepository";
import {UsersRepository} from "../users/usersRepository";
import {LikeStatusEnum} from "../likes /domain/like.entity";
import {CommentsModel} from "../db/mongoDb";
import {ObjectId} from "mongodb";
import {LikeService} from "../likes /application/like-service";

export class CommentsService {

    constructor(private commentsRepository: CommentsRepository,
                private usersRepository: UsersRepository,
                private likeService: LikeService
    ) {
    }

    async updateComment(id: string, content: string) {
        return await this.commentsRepository.updateComment(id, content);
    }

    async createComment(userId: string, postId: string, content: string) {
        const user = await this.usersRepository.getUserById(userId)
        if (!user) {
            return null
        }
        const comment: DbCommentType = {
            content: content,
            commentatorInfo: {
                userId: userId,
                userLogin: user.login
            },
            createdAt: new Date().toISOString(),
            postId: postId,

        }

        return await this.commentsRepository.createComment(comment);

    }

    async updateLikeStatus(parentId: string, likeStatus: LikeStatusEnum, userId: string) {
        const comment = await CommentsModel.findById({_id: new ObjectId(parentId)})
        if (!comment) {
            return {
                status: 404,
                errors: [],
                data: null
            }
        }
        const updateLike = await this.likeService.setLikeStatus(parentId, likeStatus, userId)
        if (updateLike.status === 401 || updateLike.status === 404) {
            return {
                status: updateLike.status,
                errors: [],
                data: null
            }
        }
        const likesCountInfo = await this.likeService.calculateLikesByParentId(parentId)

        comment.likesInfo = {
            likesCount: likesCountInfo.likesCount,
            dislikesCount: likesCountInfo.dislikesCount,
        }
        await this.commentsRepository.save(comment)
        return {
            status: 204,
            errors: [],
            data: null
        }
    }
}

