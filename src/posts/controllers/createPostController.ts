import {Request, Response} from "express";
import {APIErrorResultType, PostInputModel, PostViewModel} from "../../types/blog-types";
import {postsRepository} from "../postsRepository";

export const createPostController = async (
    req: Request<{}, {}, PostInputModel>,
    res: Response<PostViewModel | APIErrorResultType>
) => {

    const postId = await postsRepository.createPost(req.body)

    const newPost = await postsRepository.getPostByUUID(postId)

    res.status(201).json(newPost)

}
