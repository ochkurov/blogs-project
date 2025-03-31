import {Router} from "express";
import {commentCredentialsValidate} from "./middlewares/CommentCredentionalsValidate";
import {errorsResultMiddleware} from "../middlewares/errorsResultMiddleware";
import {authBearerMiddleware, commentsController} from "../compositionRoot";

export const commentsRouter = Router();

commentsRouter.get("/:id", commentsController.getCommentsById)
commentsRouter.put("/:id" , authBearerMiddleware.execute , ...commentCredentialsValidate , errorsResultMiddleware , commentsController.updateComment)
commentsRouter.delete("/:id" , authBearerMiddleware.execute , commentsController.deleteComment)
