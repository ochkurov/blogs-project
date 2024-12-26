import {Request, Response} from "express";
import {BlogType} from "../../types/blog-types";
import {blogsRepository} from "../blogsRepository";

export const getBlogByIdController = async (req: Request<{ id: string }, {}, {}>, res: Response<BlogType>) => {
    const id = req.params.id;
    let currentBlog = await blogsRepository.getBlogById(id)
    if (!currentBlog) {
        res.sendStatus(404)
        return
    }
    res.status(200).json(currentBlog)
}
