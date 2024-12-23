import {Request, Response, Router} from "express";
import {db} from "../db/db";
import {APIErrorResultType, BlogType, ErrorType, PostInputModel, PostViewModel} from "../types/blog-types";
import {
    blogIdValidator,
    contentValidator,
    shortDescriptionValidator,
    titleValidator
} from "../validation/field-validator";
import {authorizationMidleware} from "../middlewares/authorizationMidleware";
import {errorsResultMiddleware} from "../middlewares/errorsResultMiddleware";

export const postsRouter = Router();

const postsController = {
    getPosts(req:Request, res:Response<PostViewModel[]>) {
        const posts = db.posts
        res.status(200).json(posts)
    },
    getPostsById(req: Request<{ id: string }, {}, {}>, res: Response<PostViewModel>) {
        const postId = req.params.id
        const findedPost = db.posts.find((post) => post.id === postId)
        if (!findedPost) {
            res.sendStatus(404)
            return
        }
        res.status(200).json(findedPost)
    },
    addPost(req:Request<{} , {} , PostInputModel>,
            res:Response<PostViewModel | APIErrorResultType>) {

        const title = req.body.title
        const shortDescription = req.body.shortDescription
        const content = req.body.content
        const blogId = req.body.blogId

        const errorsArray: ErrorType[] = []

        titleValidator(title, errorsArray)
        shortDescriptionValidator(shortDescription, errorsArray)
        contentValidator(content, errorsArray)
        blogIdValidator(blogId, errorsArray)

        if (errorsArray.length > 0) {
            res.sendStatus(400).json({errorsMessages: errorsArray})
            return
        }
        let id: number = (Date.now() + Math.random());
        const findedBlog:BlogType = db.blogs.find((blog) => blog.id === blogId)
        let newPost: PostViewModel = {
            id: parseInt(String(id)).toString(),
            title,
            shortDescription,
            content,
            blogId,
            blogName: findedBlog.name
        }
        db.posts = [...db.posts , newPost]
        //db.posts = db.posts.push(newPost) почему так нельзя?
        res.status(201).json(newPost)


    },
    updatePost(req:Request<{ id: string }, {}, PostInputModel>,
               res:Response<APIErrorResultType>) {
        const title = req.body.title
        const shortDescription = req.body.shortDescription
        const content = req.body.content
        const blogId = req.body.blogId
        const id = req.params.id

        const errorsArray: ErrorType[] = []

        titleValidator(title, errorsArray)
        shortDescriptionValidator(shortDescription, errorsArray)
        contentValidator(content, errorsArray)
        blogIdValidator(blogId, errorsArray)

        if (errorsArray.length > 0) {
            res.sendStatus(400).json({errorsMessages: errorsArray})
            return;
        }

        if (!blogId)  {
            res.sendStatus(404)
        }
        const updatedPost = db.posts.find((post) => post.id === id)
        const findedBlog:BlogType = db.blogs.find((blog) => blog.id === blogId)
        if (!findedBlog) {
            res.sendStatus(404)
            return
        }
        if (updatedPost) {
            updatedPost.id = id
            updatedPost.title = title
            updatedPost.shortDescription = shortDescription
            updatedPost.content = content
            updatedPost.blogId = blogId
            updatedPost.blogName = findedBlog.name

            res.sendStatus(204)
            return;
        }

        if (!updatedPost) {
            res.sendStatus(404)
            return
        }

    },
    deletePost(req: Request<{ id: string }, any, any>,
               res: Response) {
        const id = req.params.id
        if (!id) {
            res.sendStatus(404)
            return
        }
        let findPost = db.posts.find((post) => post.id === id)
        if (!findPost) {
            res.sendStatus(404)
            return;
        }
        db.posts = db.posts.filter((post) => post.id !== id)

        res.sendStatus(204)
        return
    }
}

postsRouter.get('/', postsController.getPosts)
postsRouter.get('/:id', postsController.getPostsById)
postsRouter.post('/', authorizationMidleware, errorsResultMiddleware , postsController.addPost)
postsRouter.put('/:id', authorizationMidleware,errorsResultMiddleware, postsController.updatePost)
postsRouter.delete('/:id', authorizationMidleware, postsController.deletePost)
