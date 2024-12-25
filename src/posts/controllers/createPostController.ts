import {Request, Response} from "express";
import {APIErrorResultType, PostInputModel, PostViewModel} from "../../types/blog-types";
import {postsRepository} from "../postsRepository";

const createPostController = (
    req: Request<{}, {}, PostInputModel>,
    res: Response<PostViewModel | APIErrorResultType>
) => {

    const newPost = postsRepository.createPost(req.body)
    res.status(201).json(newPost)

}
