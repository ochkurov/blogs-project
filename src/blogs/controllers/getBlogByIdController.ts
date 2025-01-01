import {Request, Response} from "express";
import {BlogViewModel} from "../../types/blog-types";
import {blogsService} from "../blogs-service";

export const getBlogByIdController = async (req: Request<{ id: string }, {}, {}>, res: Response<BlogViewModel>) => {

    const id = req.params.id;
    let currentBlog = await blogsService.getBlogById(id)

    if (!currentBlog) {
        res.sendStatus(404)
        return
    }

    res.status(200).json(currentBlog)

}
