import {Router, Request, Response} from "express";
import {BlogType} from "../types/blog-types";

export const blogsRouter = Router();

const blogsController = {
    getBlogs ( req: Request , res: Response<BlogType[]> ) {

    },
    getBlogsById ( req:Request , res:Response ) {

    },
    postBlog (req:Request, res:Response) {

    },
    updateBlog (req:Request, res:Response) {

    },
    deleteBlog (req:Request, res:Response) {

    },
}


blogsRouter.get('/', blogsController.getBlogs)
blogsRouter.get('/:id', blogsController.getBlogsById)
blogsRouter.post('/' , blogsController.postBlog)
blogsRouter.put('/:id' , blogsController.updateBlog)
blogsRouter.delete('/:id' , blogsController.deleteBlog)
