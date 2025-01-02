import {Router} from "express";
import {getBlogController} from "./controllers/getBlogController";
import {getBlogByIdController} from "./controllers/getBlogByIdController";
import {createBlogController} from "./controllers/createBlogController";
import {updateBlogController} from "./controllers/updateBlogController";
import {deleteBlogController} from "./controllers/deleteBlogController";
import {authorizationMidleware} from "../middlewares/authorizationMidleware";
import {blogsBodyValidation, postBodyValidation} from "../middlewares/validation/field-validator";
import {errorsResultMiddleware} from "../middlewares/errorsResultMiddleware";
import {createPostFromBlogIdController} from "./controllers/createPostFromBlogIdController";

export const blogsRouter = Router()

blogsRouter.get('/',  getBlogController)
blogsRouter.get('/:id',  getBlogByIdController)
blogsRouter.post('/:id/posts', authorizationMidleware, postBodyValidation ,createPostFromBlogIdController)
blogsRouter.post('/', authorizationMidleware, blogsBodyValidation ,  errorsResultMiddleware , createBlogController)
blogsRouter.put('/:id', authorizationMidleware, blogsBodyValidation ,  errorsResultMiddleware , updateBlogController)
blogsRouter.delete('/:id', authorizationMidleware ,deleteBlogController)
