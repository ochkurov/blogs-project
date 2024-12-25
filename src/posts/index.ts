import {Router} from "express";
import {authorizationMidleware} from "../middlewares/authorizationMidleware";
import {postBodyValidation} from "../validation/field-validator";
import {errorsResultMiddleware} from "../middlewares/errorsResultMiddleware";

export const postsRouter = Router();

postsRouter.get('/', )
postsRouter.get('/:id', )
postsRouter.post('/', authorizationMidleware, postBodyValidation,errorsResultMiddleware , )
postsRouter.put('/:id', authorizationMidleware,postBodyValidation,errorsResultMiddleware, )
postsRouter.delete('/:id', authorizationMidleware, postBodyValidation,)
