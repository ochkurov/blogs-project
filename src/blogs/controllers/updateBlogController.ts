import {Request, Response} from "express";
import {APIErrorResultType, BlogInputType} from "../../types/blog-types";
import {blogsRepository} from "../blogsRepository";

export const updateBlogController = (
    req: Request<{ id: string }, {}, BlogInputType>,
    res: Response<APIErrorResultType>) => {
    const id = req.params.id;

    if (!id) {
        res.sendStatus(404)
        return;
    }

    const updatedBlog = blogsRepository.updateBlog(id, req.body)

    if (!updatedBlog) {
        res.sendStatus(404)
        return;
    } else res.sendStatus(204)

}
