import {Router} from "express";
import {commentsController} from "./commentsController";
import {commentCredentialsValidate} from "./middlewares/CommentCredentionalsValidate";

export const commentsRouter = Router();

commentsRouter.get("/:id", commentsController.getCommentsById)
commentsRouter.put("/:id" , ...commentCredentialsValidate ,commentsController.updateComment)
commentsRouter.delete("/:id" , commentsController.deleteComment)
