import {Router, Request, Response} from "express";
import {BlogType} from "../types/blog-types";
import {db} from "../db/db";

export const blogsRouter = Router();

const blogsController = {
    getBlogs(req: Request, res: Response<BlogType[]>) {
        const blogs = db.blogs
        res.status(200).json(blogs)
    },
    getBlogsById(req: Request, res: Response<BlogType>) {
        const blogId = req.params.id
        const findedBlog = db.blogs.find((blog) => blog.id === blogId)
        if (!findedBlog) {
            res.sendStatus(404)
            return
        }
        res.status(200).json(findedBlog)
    },
    postBlog(req: Request, res: Response) {

    },
    updateBlog(req: Request, res: Response) {

    },
    deleteBlog(req: Request, res: Response) {

    },
}


blogsRouter.get('/', blogsController.getBlogs)
blogsRouter.get('/:id', blogsController.getBlogsById)
blogsRouter.post('/', blogsController.postBlog)
blogsRouter.put('/:id', blogsController.updateBlog)
blogsRouter.delete('/:id', blogsController.deleteBlog)
