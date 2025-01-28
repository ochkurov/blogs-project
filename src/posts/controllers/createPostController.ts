import {Request, Response} from "express";
import {PostInputModel, PostViewModel} from "../../types/posts-types";
import {APIErrorResultType} from "../../types/errors-types";
import {postsService} from "../posts-service";

export const createPostController = async (
    req: Request<{}, {}, PostInputModel>,
    res: Response<PostViewModel | APIErrorResultType>
) => {

    const postId = await postsService.createPost(req.body)

    if (!postId) {
         res.sendStatus(404)
        return
    }

    const newPost = await postsService.getPostByMongoID(postId)


    res.status(201).json(newPost)

}
