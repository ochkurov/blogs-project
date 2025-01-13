import {Request, Response} from "express";
import {
    ResponseUserType, UserForResponseType,
    UserInputModel,
    UserSecureType,
    UsersQueryInputType
} from "../types/users-types";
import {usersQueriesDto} from "../helpers/users_paginations_values";
import {usersQwRepository} from "./usersQwRepository";
import {APIErrorResultType} from "../types/errors-types";
import {usersService} from "./users-service";


export const userController = {

    async getUsers(
        req: Request<{}, {}, {}, UsersQueryInputType>,
        res: Response) {

        const query = req.query
        const usersQuery = usersQueriesDto(query)
        let users = await usersQwRepository.getUsers(usersQuery)
        const usersForResponse = users.items.map( (m) => {
            return {
                id: m._id,
                login: m.login,
                email: m.email,
                createdAt: m.createdAt
            }
        }
        )

        res.status(200).json(usersForResponse)


    },

    async createUser(
        req: Request<{}, {}, UserInputModel>,
        res: Response<UserForResponseType | APIErrorResultType>
    ) {
        const body: UserInputModel = req.body

        const result = await usersService.createUser(body)

        if (result.errors && result.errors.length > 0) {
            res.status(400).send({errorsMessages: result.errors})
            return
        }

        const user: UserSecureType = await usersService.getUserById(result.userId!)
        const userForResponse:UserForResponseType = {
            id: user._id.toString(),
            login: user.login,
            email: user.email,
            createdAt: user.createdAt,
        }
        res.status(201).json(userForResponse)

    },

    async deleteUser(
        req: Request<{ id: string }>,
        res: Response
    ) {
        const userId = req.params.id
        if (!userId) {
            res.sendStatus(404)
            return
        }
        const deletedUser = await usersService.deleteUser(userId)

        if (!deletedUser) {
            res.sendStatus(404)
            return
        }
        res.sendStatus(204)
    }

}



