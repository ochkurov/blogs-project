import {Router} from "express";
import {userController} from "./usersController";

export const usersRouter = Router();


usersRouter.get('/users' , userController.getUsers)
usersRouter.post('/users' , userController.createUser)
usersRouter.delete('/users/:id' , userController.deleteUser)
