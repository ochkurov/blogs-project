import {Request, Response} from "express";
import {APIErrorResultType, BlogInputType, BlogType} from "../../types/blog-types";
import {blogsRepository} from "../blogsRepository";

export const createBlogController = (
    req: Request<{}, {}, BlogInputType>,
    res: Response<BlogType | APIErrorResultType>) => {

    const newBlog = blogsRepository.createBlog(req.body)
    res.status(201).json(newBlog)

}
