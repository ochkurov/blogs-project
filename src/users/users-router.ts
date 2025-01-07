import {Router} from "express";
import {userController} from "./usersController";

export const usersRouter = Router();


usersRouter.get('/' , userController.getUsers)
usersRouter.post('/' , userController.createUser)
usersRouter.delete('/:id' , userController.deleteUser)
