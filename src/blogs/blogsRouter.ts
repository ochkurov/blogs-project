import {Router, Request, Response} from "express";
import {APIErrorResultType, BlogInputType, BlogType, ErrorType} from "../types/blog-types";
import {db} from "../db/db";
import {descriptionValidator, nameValidator, websiteURLValidator} from "../validation/field-validator";
import {errorResponse} from "../validation/errorResponse";

export const blogsRouter = Router();

const blogsController = {
    getBlogs(req: Request, res: Response<BlogType[]>) {
        const blogs = db.blogs
        res.status(200).json(blogs)
    },
    getBlogsById(req: Request<{ id: string }, {}, {}>, res: Response<BlogType>) {
        const blogId = req.params.id
        const findedBlog = db.blogs.find((blog) => blog.id === blogId)
        if (!findedBlog) {
            res.sendStatus(404)
            return
        }
        res.status(200).json(findedBlog)
    },
    postBlog(
        req: Request<{}, {}, BlogInputType>,
        res: Response<BlogType | APIErrorResultType>) {

        const name = req.body.name
        const description = req.body.description
        const websiteUrl = req.body.websiteUrl
        const errorsArray: ErrorType[] = []

        nameValidator(name, errorsArray)
        descriptionValidator(description, errorsArray)
        websiteURLValidator(websiteUrl, errorsArray)

        if (errorsArray.length > 0) {
            //let errors = errorResponse(errorsArray)
            res.status(400).json({errorsMessages: errorsArray})
            return
        }
        let id: number = (Date.now() + Math.random());
        let newBlog: BlogType = {
            id: parseInt(String(id)).toString(),
            name,
            description,
            websiteUrl
        }
        db.blogs = [...db.blogs, newBlog]
        res.status(201).json(newBlog)

    },
    updateBlog(req: Request<{ id: string }, {}, BlogInputType>, res: Response<APIErrorResultType>) {
        const blogId = req.params.id
        const name = req.body.name
        const description = req.body.description
        const websiteUrl = req.body.websiteUrl
        const errorsArray: Array<{ field: string, message: string }> = []
        nameValidator(name, errorsArray)
        descriptionValidator(description, errorsArray)
        websiteURLValidator(websiteUrl, errorsArray)
        if (errorsArray.length > 0) {
            ///let errors = errorResponse(errorsArray)
            res.status(400).json({errorsMessages: errorsArray})
            return
        }
        let updatedBlog: BlogType = db.blogs.find((blog) => blog.id === blogId)
        if (updatedBlog) {
            updatedBlog.id = blogId
            updatedBlog.name = name
            updatedBlog.description = description
            updatedBlog.websiteUrl = websiteUrl
            res.sendStatus(204)
        }
        if (!updatedBlog) {
            res.sendStatus(404)
        }

    },
    deleteBlog(req: Request, res: Response) {

    },
}


blogsRouter.get('/', blogsController.getBlogs)
blogsRouter.get('/:id', blogsController.getBlogsById)
blogsRouter.post('/', blogsController.postBlog)
blogsRouter.put('/:id', blogsController.updateBlog)
blogsRouter.delete('/:id', blogsController.deleteBlog)
