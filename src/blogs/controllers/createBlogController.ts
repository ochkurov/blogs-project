import {Request, Response} from "express";
import {BlogInputModel, BlogViewModel} from "../../types/blog-types";
import {APIErrorResultType} from "../../types/errors-types";
import {blogsService} from "../blogs-service";

export const createBlogController = async (
    req: Request<{}, {}, BlogInputModel>,
    res: Response<BlogViewModel | APIErrorResultType>) => {

    const blogId = await blogsService.createBlog(req.body)
    const blog = await blogsService.getBlogByUUID(blogId)

    res.status(201).json(blog)

}
