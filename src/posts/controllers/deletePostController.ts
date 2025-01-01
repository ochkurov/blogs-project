import {Request, Response} from "express";
import {postsService} from "../posts-service";

export const deletePostController = async (
    req: Request<{ id: string }, any, any>,
    res: Response) => {
    const id = req.params.id;

    if (!id) {
        res.sendStatus(404)
        return
    }
    const deletePost = await postsService.deletePost(id)

    if (!deletePost) {
        res.sendStatus(404)
        return
    } else res.sendStatus(204)
}
