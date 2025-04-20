import {Router} from "express";
import {commentCredentialsValidate, likeStatusValidate} from "./middlewares/CommentCredentionalsValidate";
import {errorsResultMiddleware} from "../middlewares/errorsResultMiddleware";
import {authBearerMiddleware, commentsController} from "../compositionRoot";
import {getUserIdMiddleware} from "../auth/middlewares/getUserIdMiddleware";

export const commentsRouter = Router();

commentsRouter.get("/:id", getUserIdMiddleware, commentsController.getCommentsById.bind(commentsController))
commentsRouter.put("/:id" , authBearerMiddleware.execute , ...commentCredentialsValidate , errorsResultMiddleware , commentsController.updateComment.bind(commentsController))
commentsRouter.put("/:id/like-status" , authBearerMiddleware.execute , likeStatusValidate, errorsResultMiddleware ,commentsController.updateLikeStatus.bind(commentsController))
commentsRouter.delete("/:id" , authBearerMiddleware.execute , commentsController.deleteComment.bind(commentsController))

