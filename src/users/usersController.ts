import {Request, Response} from "express";
import {
    ResponseUserType, UserForResponseType,
    UserInputModel,
    UserSecureType,
    UsersQueryInputType
} from "../types/users-types";
import {usersQueriesDto} from "../helpers/users_paginations_values";
import {APIErrorResultType} from "../types/errors-types";
import {ObjectId} from "mongodb";
import {UsersQwRepository} from "./usersQwRepository";
import {UserService} from "./users-service";

class UsersController {
    usersQwRepository: UsersQwRepository
    usersService: UserService
    constructor() {
        this.usersQwRepository = new UsersQwRepository();
        this.usersService = new UserService();
    }
    async getUsers(
        req: Request<{}, {}, {}, UsersQueryInputType>,
        res: Response<ResponseUserType>) {

        const query = req.query
        const usersQuery = usersQueriesDto(query)
        let users = await this.usersQwRepository.getUsers(usersQuery)

        res.status(200).json(users)


    }

    async createUser(
        req: Request<{}, {}, UserInputModel>,
        res: Response<UserForResponseType | APIErrorResultType>
    ) {
        const body: UserInputModel = req.body

        const result = await this.usersService.createUser(body , true)

        if (result.errors && result.errors.length > 0) {
            res.status(400).send({errorsMessages: result.errors})
            return
        }

        const user: UserSecureType = await this.usersService.getUserById(result.data!.userId)

        const userForResponse:UserForResponseType = {
            id: user._id.toString(),
            login: user.login,
            email: user.email,
            createdAt: user.createdAt,
        }
ы
        res.status(201).json(userForResponse)

    }

    async deleteUser(
        req: Request<{ id: string }>,
        res: Response
    ) {
        const userId = req.params.id

        if (!userId || !ObjectId.isValid(userId)) {
            console.log('error')
            res.sendStatus(404)
            return
        }
        const deletedUser = await this.usersService.deleteUser(userId)

        if (!deletedUser) {
            res.sendStatus(404)
            return
        }
        res.sendStatus(204)
    }
}

export const userController = new UsersController();


