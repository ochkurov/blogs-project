import {Router} from "express";
import {commentsController} from "./commentsController";
import {commentCredentialsValidate} from "./middlewares/CommentCredentionalsValidate";
import {authBearerMiddleware} from "../auth/middlewares/authBearerMiddleware";
import {errorsResultMiddleware} from "../middlewares/errorsResultMiddleware";

export const commentsRouter = Router();

commentsRouter.get("/:id", commentsController.getCommentsById)
commentsRouter.put("/:id" , authBearerMiddleware , ...commentCredentialsValidate , errorsResultMiddleware , commentsController.updateComment)
commentsRouter.delete("/:id" , authBearerMiddleware , commentsController.deleteComment)
