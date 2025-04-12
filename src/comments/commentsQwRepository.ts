import {QueryInputType} from "../types/posts-types";
import {commentsCollection} from "../db/mongoDb";
import {ObjectId} from "mongodb";
import {CommentsViewModel, DbResponseCommentType} from "../types/comment-types";

export class CommentsQwRepository {
    async getComments() {

    }

    async getCommentById(id: string): Promise<DbResponseCommentType> {
        return await commentsCollection.findOne({_id: new ObjectId(id)})
    }

    async getCommentsByPostId(postId: string, commentQuery: QueryInputType) {
        const {sortBy, sortDirection, pageSize, pageNumber} = commentQuery
        const filteredComments: any = {}
        if (postId) {
            filteredComments.postId = postId;
        }
        const comments = await commentsCollection
            .find(filteredComments)
            .sort({[sortBy]: sortDirection === 'asc' ? 1 : -1})
            .skip((pageNumber - 1) * pageSize)
            .limit(pageSize)
            .toArray()

        const commentsCount = await commentsCollection.countDocuments({postId})
        const likeStatus
        return {
            pagesCount: Math.ceil(commentsCount / pageSize),
            page: pageNumber,
            pageSize,
            totalCount: commentsCount,
            items: comments.map((c: DbResponseCommentType): CommentsViewModel => {
                    return {
                        id: c._id.toString(),
                        content: c.content,
                        commentatorInfo: {
                            userId: c.commentatorInfo.userId,
                            userLogin: c.commentatorInfo.userLogin
                        },
                        createdAt: c.createdAt,
                        likesInfo: {
                            likesCount: c.likesInfo.likesCount,
                            dislikesCount: c.likesInfo.likesCount,
                            myStatus:

                        }
                    }
                }
            )
        }
    }
}

