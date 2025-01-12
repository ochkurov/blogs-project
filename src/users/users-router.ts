import {Router} from "express";
import {userController} from "./usersController";
import {userCredentialsValidate} from "./middlewares/UserCredentialsValidate";
import {authorizationMidleware} from "../middlewares/authorizationMidleware";

export const usersRouter = Router();


usersRouter.get('/' , authorizationMidleware , userController.getUsers)
usersRouter.post('/' , ...userCredentialsValidate , userController.createUser)
usersRouter.delete('/:id' , authorizationMidleware ,userController.deleteUser)
