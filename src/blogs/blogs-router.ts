import {Router} from "express";
import {authorizationMidleware} from "../middlewares/authorizationMidleware";
import {
    blogsBodyValidation,
    postsBodyWhithoutIdValidation
} from "../middlewares/validation/field-validator";
import {errorsResultMiddleware} from "../middlewares/errorsResultMiddleware";
import {blogsController} from "../compositionRoot";



export const blogsRouter = Router()

blogsRouter.get('/',  blogsController.getBlogs.bind(blogsController))
blogsRouter.get('/:id',  blogsController.getBlogById.bind(blogsController))
blogsRouter.get('/:blogId/posts' , blogsController.getPostsFromBlogId.bind(blogsController))
blogsRouter.post('/:blogId/posts', authorizationMidleware, postsBodyWhithoutIdValidation ,errorsResultMiddleware,blogsController.createPostFromBlogId.bind(blogsController))
blogsRouter.post('/', authorizationMidleware, blogsBodyValidation ,  errorsResultMiddleware , blogsController.createBlog.bind(blogsController))
blogsRouter.put('/:id', authorizationMidleware, blogsBodyValidation ,  errorsResultMiddleware , blogsController.updateBlog.bind(blogsController))
blogsRouter.delete('/:id', authorizationMidleware ,blogsController.deleteBlog.bind(blogsController))
