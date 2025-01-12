import {Request, Response} from "express";
import {ResponseUserType, UserInputModel, UserSecureType, UsersQueryInputType} from "../types/users-types";
import {usersQueriesDto} from "../helpers/users_paginations_values";
import {usersQwRepository} from "./usersQwRepository";
import {APIErrorResultType} from "../types/errors-types";
import {usersService} from "./users-service";


export const userController = {

    async getUsers(
        req: Request<{}, {}, {}, UsersQueryInputType>,
        res: Response<ResponseUserType>) {

        const query = req.query
        const usersQuery = usersQueriesDto(query)
        let users = await usersQwRepository.getUsers(usersQuery)

        res.status(200).json(users)


    },

    async createUser(
        req: Request<{}, {}, UserInputModel>,
        res: Response<UserSecureType | APIErrorResultType>
    ) {
        const body: UserInputModel = req.body

        const result = await usersService.createUser(body)

        if ( result.errors && result.errors.length > 0) {
            res.status(400).send({errorsMessages: result.errors})
        }

        const user: UserSecureType = await usersService.findUserById(result.userId)
        res.status(201).json(user)

    },

    async deleteUser() {

    }

}



