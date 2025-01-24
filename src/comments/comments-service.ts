import {commentsRepository} from "./commentsRepository";
import {ObjectId} from "mongodb";
import {usersRepository} from "../users/usersRepository";
import {DbCommentType} from "../types/comment-types";

export const commentsService = {
    async getCommentsById(id: string) {
        return await commentsRepository.getCommentById(id)
    },
    async updateComment(id: string, content: string) {
        return await commentsRepository.updateComment(id, content);
    },
    async deleteCommentById(id: string) {
    },
    async createComment(userId: string, postId: string, content: string) {
        const user = await usersRepository.getUserById(userId)
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

        return await commentsRepository.createComment(comment);

    }
}
