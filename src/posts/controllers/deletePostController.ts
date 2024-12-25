import {Request, Response} from "express";
import {postsRepository} from "../postsRepository";

const deletePostController = (
    req: Request<{ id: string }, any, any>,
    res: Response) => {
    const id = req.params.id;

    if (!id) {
        res.sendStatus(404)
        return
    }
    const deletePost = postsRepository.deletePost(id)
    if (!deletePost) {
        res.sendStatus(404)
        return
    } else res.sendStatus(204)
}
