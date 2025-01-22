import {Router} from "express";
import {commentsController} from "./commentsController";

export const commentsRouter = Router();

commentsRouter.get("/:id", commentsController.getCommentsById)
commentsRouter.put("/:id")
commentsRouter.delete("/:id")
