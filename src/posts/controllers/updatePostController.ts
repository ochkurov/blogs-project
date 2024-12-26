import {Request, Response} from "express";
import {APIErrorResultType, PostInputModel} from "../../types/blog-types";
import {postsRepository} from "../postsRepository";

export const updatePostController = async (
    req: Request<{ id: string }, {}, PostInputModel>,
    res: Response<APIErrorResultType>) => {
    const id = req.params.id

    if (!id.trim()) {
        res.sendStatus(404)
        return
    }
    const updatedPost = await postsRepository.updatePost(id, req.body)

    if (!updatedPost) {
        res.sendStatus(404)
        return
    }
    res.sendStatus(204)
}
