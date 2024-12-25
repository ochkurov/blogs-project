import {Request, Response} from "express";
import {PostViewModel} from "../../types/blog-types";
import {postsRepository} from "../postsRepository";

export const getPostByIdController = (
    req: Request<{ id: string }, {}, {}>,
    res: Response<PostViewModel>) => {

    const id = req.params.id;
    const currentPost = postsRepository.getPostById(id)

    if (!currentPost) {
        res.sendStatus(404)
        return
    }

    res.status(200).json(currentPost)

}
