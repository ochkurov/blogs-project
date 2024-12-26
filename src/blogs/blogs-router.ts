import {Router} from "express";
import {getBlogController} from "./controllers/getBlogController";
import {getBlogByIdController} from "./controllers/getBlogByIdController";
import {createBlogController} from "./controllers/createBlogController";
import {updateBlogController} from "./controllers/updateBlogController";
import {deleteBlogController} from "./controllers/deleteBlogController";
import {authorizationMidleware} from "../middlewares/authorizationMidleware";
import {blogsBodyValidation} from "../validation/field-validator";
import {errorsResultMiddleware} from "../middlewares/errorsResultMiddleware";

export const blogsRouter = Router()

blogsRouter.post('/', authorizationMidleware, blogsBodyValidation ,  errorsResultMiddleware , createBlogController)
blogsRouter.get('/',  getBlogController)
blogsRouter.get('/:id',  getBlogByIdController)
blogsRouter.delete('/:id', deleteBlogController)
blogsRouter.put('/:id', authorizationMidleware, blogsBodyValidation ,  errorsResultMiddleware , updateBlogController)
