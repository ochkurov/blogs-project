import {PostViewModel, ResponsePostType} from "../../types/posts-types";
import {ObjectId} from "mongodb";

class GetPostViewModel {
    id: string;
    title: string
    shortDescription: string
    content: string
    blogId: string
    blogName: string
    createdAt: string
    constructor(_id: ObjectId,
    title: string,
    shortDescription: string,
    content: string,
    blogId: string,
    blogName: string,
    createdAt: string) {
        this.id = _id.toString(),
            this.title = title,
            this.shortDescription = shortDescription,
            this.content = content,
            this.blogId = blogId,
            this.blogName = blogName,
            this.createdAt = createdAt
    }
}

/*
export const getPostViewModel = ( post : ResponsePostType): PostViewModel=> {
    return {
        id: post._id.toString(),
        title: post.title,
        shortDescription: post.shortDescription,
        content: post.content,
        blogId: post.blogId,
        blogName: post.blogName,
        createdAt: post.createdAt
    }
}
*/
