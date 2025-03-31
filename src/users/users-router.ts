import {Router} from "express";
import {userCredentialsValidate} from "./middlewares/UserCredentialsValidate";
import {authorizationMidleware} from "../middlewares/authorizationMidleware";
import {errorsResultMiddleware} from "../middlewares/errorsResultMiddleware";
import {userController} from "../compositionRoot";

export const usersRouter = Router();


usersRouter.get('/' , authorizationMidleware , userController.getUsers.bind(userController))
usersRouter.post('/' , authorizationMidleware , ...userCredentialsValidate , errorsResultMiddleware , userController.createUser.bind(userController))
usersRouter.delete('/:id' , authorizationMidleware  , userController.deleteUser.bind(userController))
