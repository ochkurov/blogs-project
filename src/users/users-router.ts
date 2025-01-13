import {Router} from "express";
import {userController} from "./usersController";
import {userCredentialsValidate} from "./middlewares/UserCredentialsValidate";
import {authorizationMidleware} from "../middlewares/authorizationMidleware";
import {errorsResultMiddleware} from "../middlewares/errorsResultMiddleware";

export const usersRouter = Router();


usersRouter.get('/' , authorizationMidleware , userController.getUsers)
usersRouter.post('/' , authorizationMidleware , ...userCredentialsValidate , errorsResultMiddleware , userController.createUser)
usersRouter.delete('/:id' , authorizationMidleware  , userController.deleteUser)
