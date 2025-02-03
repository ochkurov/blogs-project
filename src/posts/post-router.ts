import {Router} from "express";
import {authorizationMidleware} from "../middlewares/authorizationMidleware";
import {postBodyValidation} from "../middlewares/validation/field-validator";
import {errorsResultMiddleware} from "../middlewares/errorsResultMiddleware";
import {getPostsController} from "./controllers/getPostsController";
import {getPostByIdController} from "./controllers/getPostByIdController";
import {createPostController} from "./controllers/createPostController";
import {updatePostController} from "./controllers/updatePostController";
import {deletePostController} from "./controllers/deletePostController";
import {authBearerMiddleware} from "../auth/middlewares/authBearerMiddleware";
import {commentCredentialsValidate} from "../comments/middlewares/CommentCredentionalsValidate";
import {createCommentByPostIdController} from "./controllers/createCommentByPostIdController";
import {getCommentsByPostIdController} from "./controllers/getCommentsByPostIdController";

export const postsRouter = Router();

postsRouter.get('/', getPostsController)
postsRouter.get('/:id', getPostByIdController)
postsRouter.get('/:id/comments' , getCommentsByPostIdController )

// basic auth
postsRouter.post('/', authorizationMidleware, postBodyValidation , errorsResultMiddleware , createPostController)
postsRouter.put('/:id', authorizationMidleware,postBodyValidation , errorsResultMiddleware, updatePostController)
postsRouter.delete('/:id', authorizationMidleware , deletePostController)

// bearer auth
postsRouter.post('/:id/comments' , authBearerMiddleware, ...commentCredentialsValidate , errorsResultMiddleware , createCommentByPostIdController)
