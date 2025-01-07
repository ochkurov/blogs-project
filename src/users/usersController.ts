import { Request, Response} from "express";
import {ResponseUserType, UserInputModel, UsersQueryInputType, UserViewModel} from "../types/users-types";
import {usersQueriesDto} from "../helpers/users_paginations_values";
import {usersQwRepository} from "./usersQwRepository";
import {APIErrorResultType} from "../types/errors-types";
import {usersService} from "./users-service";


export const userController = {

    async getUsers  (
        req: Request<{} , {} , {} , UsersQueryInputType>,
        res: Response<ResponseUserType>){

        const query  = req.query
        const usersQuery = usersQueriesDto(query)
        let users = await usersQwRepository.getUsers(usersQuery)

        res.status(200).json(users)


    },

    async createUser (
        req: Request<{} , {} , UserInputModel>,
        res:Response<UserViewModel | APIErrorResultType>
    ) {
        const body:UserInputModel = req.body
        const userId = await usersService.createUser(body)


    },

    async deleteUser () {

    }

}



