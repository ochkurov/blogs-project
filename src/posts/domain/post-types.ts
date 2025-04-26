import {LikeStatusEnum} from "../../likes /domain/like.entity";
import {Schema} from "mongoose";

export type IPost = {
    title: string;
    shortDescription: string, //maxLength: 100
    content: string, //maxLength: 1000
    blogId: Schema.Types.ObjectId,
    blogName: string,
    createdAt: string,
    extendedLikesInfo: IPostExtendedLikesInfo
}
export type IPostExtendedLikesInfo = {
    likesCount: number;
    dislikesCount: number;
    myStatus: LikeStatusEnum;
    newestLikes: IPostNewestLikes[],
}
export type IPostNewestLikes = {
    addedAt: string,
    userId:  string,
    login: string,
}
