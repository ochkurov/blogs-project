import {Request, Response} from "express";
import {APIErrorResultType, PostInputModel, PostViewModel} from "../../types/blog-types";
import {postsRepository} from "../postsRepository";

export const createPostController = async (
    req: Request<{}, {}, PostInputModel>,
    res: Response<PostViewModel | APIErrorResultType>
) => {

    const newPost = await postsRepository.createPost(req.body)
    res.status(201).json(newPost)

}
