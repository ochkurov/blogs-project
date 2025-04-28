import {QueryInputType} from "../types/posts-types";
import {CommentsModel, LikesModel} from "../db/mongoDb";
import {ObjectId} from "mongodb";
import {CommentsViewModel, DbResponseCommentType} from "../types/comment-types";
import {LikeStatusEnum} from "../likes /domain/like.entity";
import {mappedCommentToView} from "./mapper/mappedCommentToView";

export class CommentsQwRepository {

    async getCommentById(commentId: string, userId: string | undefined  ): Promise<CommentsViewModel | null> {

        const comment = await CommentsModel.findOne({_id: new ObjectId(commentId)})

        if (!comment) {
            return null;
        }

        let status = LikeStatusEnum.None;
        if (userId) {
            const like = await LikesModel.findOne({userId: new ObjectId(userId), parentId: new ObjectId(commentId)}).lean();
            if (like) {
                status = like.status;
            }
        }
        return mappedCommentToView(status, comment)
    }

    async getCommentsByPostId(postId: string, commentQuery: QueryInputType, userId: string|undefined) {
        const {sortBy, sortDirection, pageSize, pageNumber} = commentQuery
        const filteredComments: any = {}
        if (postId) {
            filteredComments.postId = postId;
        }
        const comments = await CommentsModel
            .find(filteredComments)
            .sort({[sortBy]: sortDirection === 'asc' ? 1 : -1})
            .skip((pageNumber - 1) * pageSize)
            .limit(pageSize)
            .lean()

        const commentsCount = await CommentsModel.countDocuments({postId})

        let userLikesMap = new Map<string, LikeStatusEnum>();
        if (userId) {
            const commentIds = comments.map((comment) => comment._id.toString());

            // Найти все лайки, которые поставил пользователь для данных комментариев
            const userLikes = await LikesModel
                .find({
                    userId: new ObjectId(userId) ,
                    parentId: {$in: commentIds}})
                .lean();

            // Создаем Map для быстрого поиска лайков по commentId
            userLikes.forEach((like) => {
                userLikesMap.set(like.parentId.toString(), like.status);
            });
        }

        return {
            pagesCount: Math.ceil(commentsCount / pageSize),
            page: pageNumber,
            pageSize,
            totalCount: commentsCount,
            items: comments.map((c: DbResponseCommentType): CommentsViewModel => {
                    const likeStatus = userLikesMap.get(c._id.toString()) ?? LikeStatusEnum.None;
                    return mappedCommentToView(likeStatus, c)
                }
            )
        }
    }
}
