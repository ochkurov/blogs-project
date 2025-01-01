import {Request, Response} from "express";
import {PostInputModel} from "../../types/posts-types";
import {APIErrorResultType} from "../../types/errors-types";
import {postsService} from "../posts-service";

export const updatePostController = async (
    req: Request<{ id: string }, {}, PostInputModel>,
    res: Response<APIErrorResultType>) => {
    const id = req.params.id

    if (!id.trim()) {
        res.sendStatus(404)
        return
    }

    const updatedPost = await postsService.updatePost(id, req.body)

    if (!updatedPost) {
        res.sendStatus(404)
        return
    } else res.sendStatus(204)
}
