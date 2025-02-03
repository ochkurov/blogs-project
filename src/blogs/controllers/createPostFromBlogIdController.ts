import {Request, Response} from "express";
import {postsService} from "../../posts/posts-service";
import {PostInputModel, PostViewModel} from "../../types/posts-types";


export const createPostFromBlogIdController = async (
    req: Request<
        { blogId: string }, {}, PostInputModel>,
    res: Response<PostViewModel>) => {

    const blogId = req.params.blogId;
    let body = {...req.body, blogId: blogId};

    let postId = await postsService.createPost(body);


    if (!postId) {
        res.sendStatus(404)
        return
    }

    const newPost = await postsService.getPostByMongoID(postId)
    if (!newPost) {
        res.sendStatus(404)
        return
    }


    res.status(201).json(newPost);

}
