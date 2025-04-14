import {Router} from "express";
import {commentCredentialsValidate} from "./middlewares/CommentCredentionalsValidate";
import {errorsResultMiddleware} from "../middlewares/errorsResultMiddleware";
import {authBearerMiddleware, commentsController} from "../compositionRoot";
import {getUserIdMiddleware} from "../auth/middlewares/getUserIdMiddleware";

export const commentsRouter = Router();

commentsRouter.get("/:id", getUserIdMiddleware, commentsController.getCommentsById)
commentsRouter.put("/:id" , authBearerMiddleware.execute , ...commentCredentialsValidate , errorsResultMiddleware , commentsController.updateComment)
commentsRouter.put("/:id/like-status" , authBearerMiddleware.execute , commentsController.updateLikeStatus)
commentsRouter.delete("/:id" , authBearerMiddleware.execute , commentsController.deleteComment)

