import {QueryInputType} from "../types/posts-types";
import {commentsCollection} from "../db/mongoDb";

export const commentsQwRepository = {
    async getComments() {

    },
    async getCommentById(id: string) {

    },
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
        if (comments.length < 1) return null
        const commentsCount = await commentsCollection.countDocuments({postId})
        return {
            pagesCount: Math.ceil(commentsCount / pageSize),
            page: pageNumber,
            pageSize,
            totalCount: commentsCount,
            items: comments

        }

    }
}
