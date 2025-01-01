import {Request, Response} from "express";
import {blogsService} from "../blogs-service";

export const deleteBlogController = async (
    req: Request<{ id: string }, any, any>,
    res: Response) => {

    const id = req.params.id;

    if (!id) {
        res.sendStatus(404)
        return
    }

    const deleteBlog = await blogsService.deleteBlog(id)

    if (!deleteBlog) {
        res.sendStatus(404)
        return
    } else res.sendStatus(204)
}
