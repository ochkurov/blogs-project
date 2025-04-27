import {Router} from "express";
import {authorizationMidleware} from "../middlewares/authorizationMidleware";
import {postBodyValidation} from "../middlewares/validation/field-validator";
import {errorsResultMiddleware} from "../middlewares/errorsResultMiddleware";
import {commentCredentialsValidate, likeStatusValidate} from "../comments/middlewares/CommentCredentionalsValidate";
import {authBearerMiddleware, postsController} from "../compositionRoot";
import {getUserIdMiddleware} from "../auth/middlewares/getUserIdMiddleware";

export const postsRouter = Router();

postsRouter.get('/', getUserIdMiddleware ,postsController.getPosts.bind(postsController))
postsRouter.get('/:id',getUserIdMiddleware, postsController.getPostById.bind(postsController))
postsRouter.get('/:id/comments' , getUserIdMiddleware , postsController.getCommentsByPostId.bind(postsController) )

// basic auth
postsRouter.post('/', authorizationMidleware, getUserIdMiddleware ,postBodyValidation , errorsResultMiddleware , postsController.createPost.bind(postsController))
postsRouter.put('/:id', authorizationMidleware,postBodyValidation , errorsResultMiddleware, postsController.updatePost.bind(postsController))
postsRouter.delete('/:id', authorizationMidleware , postsController.deletePost.bind(postsController))

// bearer auth
postsRouter.post('/:id/comments' , authBearerMiddleware.execute, ...commentCredentialsValidate , errorsResultMiddleware , postsController.createCommentByPostId.bind(postsController))
postsRouter.post('/:id/like-status' , authBearerMiddleware.execute , likeStatusValidate, errorsResultMiddleware , postsController.updateLikeStatus.bind(postsController))
