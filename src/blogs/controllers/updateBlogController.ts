import {Request, Response} from "express";
import {APIErrorResultType} from "../../types/errors-types";
import {BlogInputModel} from "../../types/blog-types";
import {blogsService} from "../blogs-service";

export const updateBlogController = async (
    req: Request<{ id: string }, {}, BlogInputModel>,
    res: Response<APIErrorResultType>) => {
    const id = req.params.id;

    if (!id) {
        res.sendStatus(404)
        return;
    }

    const updatedBlog = await blogsService.updateBlog(id, req.body)

    if (!updatedBlog) {
        res.sendStatus(404)
        return;
    } else res.sendStatus(204)

}
