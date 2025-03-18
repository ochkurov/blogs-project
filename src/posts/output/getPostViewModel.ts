import {PostViewModel, ResponsePostType} from "../../types/posts-types";



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
