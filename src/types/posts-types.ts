import {ObjectId} from "mongodb";
import {LikeStatusEnum} from "../likes /domain/like.entity";

export type PostViewModel = {
    id: string;
    title: string
    shortDescription: string
    content: string
    blogId: string
    blogName: string
    createdAt: string,
}
export type ResponsePostType = {
    _id: ObjectId;
    title: string
    shortDescription: string
    content: string
    blogId: string
    blogName: string
    createdAt: string,
}
export type CreatePostType = {
    title: string
    shortDescription: string
    content: string
    blogId: string
    blogName: string
    createdAt: string,
    extendedLikesInfo: {
        likesCount: number,
        dislikesCount: number,
        myStatus: LikeStatusEnum,
        newestLikes: [
            {
                addedAt: string,
                userId: string,
                login: string
            }]
    }
}
export type PostInputModel = {
    title: string,
    shortDescription: string,
    content: string,
    blogId: string,
    blogName?: string,
}


export type ResponsePostsType = {
    pagesCount: number,
    page: number ,
    pageSize: number,
    totalCount: number,
    items: PostViewModel[]
}

export type QueryInputType = {
    sortBy: string | 'createdAt',
    sortDirection: "asc" | "desc",
    pageNumber: number,
    pageSize: number,

}

