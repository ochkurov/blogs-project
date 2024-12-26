import {Request, Response} from "express";
import {APIErrorResultType, BlogInputType, BlogType} from "../../types/blog-types";
import {blogsRepository} from "../blogsRepository";

export const createBlogController = async (
    req: Request<{}, {}, BlogInputType>,
    res: Response<BlogType | APIErrorResultType>) => {

    const blogId = await blogsRepository.createBlog(req.body)
    const blog = await blogsRepository.gerVideoByUUID(blogId)

    res.status(201).json(blog)

}
