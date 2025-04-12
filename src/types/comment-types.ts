import {ObjectId} from "mongodb";
import {HydratedDocument} from "mongoose";
import {LikeStatusEnum} from "../likes /domain/like.entity";

export type CommentsViewModel = {
    id: string
    content: string
    commentatorInfo: CommentatorInfo
    createdAt: string
    likesInfo: {
        likesCount: number,
        dislikesCount: number,
        myStatus: LikeStatusEnum
    }
}
export type DbResponseCommentType = {
    _id: ObjectId
    content: string
    commentatorInfo: CommentatorInfo
    createdAt: string
    postId: string
    likesInfo: {
        likesCount: number,
        dislikesCount: number,
    }
}

export type CommentatorInfo = {
    userId: string,
    userLogin: string
}

export type CommentResponseType = {
    pagesCount: number,
    page: number ,
    pageSize: number,
    totalCount: number,
    items: CommentsViewModel[]
}

export type DbCommentType = {
    content: string
    commentatorInfo: CommentatorInfo
    createdAt: string
    postId: string
}
type LikesInfoType = {
    likesCount: number,
    dislikesCount: number,
}

export type IComment = {
    content: string
    createdAt: string
    postId: string
    commentatorInfo: CommentatorInfo
    likesInfo: LikesInfoType
}
export type CommentsDocument = HydratedDocument<IComment>;
