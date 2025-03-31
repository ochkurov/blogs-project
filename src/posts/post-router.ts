import {Router} from "express";
import {authorizationMidleware} from "../middlewares/authorizationMidleware";
import {postBodyValidation} from "../middlewares/validation/field-validator";
import {errorsResultMiddleware} from "../middlewares/errorsResultMiddleware";
import {commentCredentialsValidate} from "../comments/middlewares/CommentCredentionalsValidate";
import {authBearerMiddleware, postsController} from "../compositionRoot";
export const postsRouter = Router();


postsRouter.get('/', postsController.getPosts.bind(postsController))
postsRouter.get('/:id', postsController.getPostById.bind(postsController))
postsRouter.get('/:id/comments' , postsController.getCommentsByPostId.bind(postsController) )

// basic auth
postsRouter.post('/', authorizationMidleware, postBodyValidation , errorsResultMiddleware , postsController.createPost.bind(postsController))
postsRouter.put('/:id', authorizationMidleware,postBodyValidation , errorsResultMiddleware, postsController.updatePost.bind(postsController))
postsRouter.delete('/:id', authorizationMidleware , postsController.deletePost.bind(postsController))

// bearer auth
postsRouter.post('/:id/comments' , authBearerMiddleware.execute, ...commentCredentialsValidate , errorsResultMiddleware , postsController.createCommentByPostId.bind(postsController))
