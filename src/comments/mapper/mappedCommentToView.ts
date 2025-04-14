import {LikeStatusEnum} from "../../likes /domain/like.entity";
import {CommentsViewModel, DbResponseCommentType} from "../../types/comment-types";

export const mappedCommentToView = (likeStatus : LikeStatusEnum , comment: DbResponseCommentType): CommentsViewModel => {
    return {
        id: comment._id.toString(),
        content: comment.content,
        commentatorInfo: comment.commentatorInfo,
        createdAt: comment.createdAt,
        likesInfo: {
            likesCount: comment.likesInfo.likesCount,
            dislikesCount: comment.likesInfo.dislikesCount,
            myStatus: likeStatus
        }
    }
}
