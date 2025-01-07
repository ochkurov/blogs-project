import { Request, Response} from "express";
import {ResponseUserType, UsersQueryInputType} from "../types/users-types";
import {usersQueriesDto} from "../helpers/users_paginations_values";
import {usersQwRepository} from "./usersQwRepository";


export const userController = {

    async getUsers  (
        req: Request<{} , {} , {} , UsersQueryInputType>,
        res: Response<ResponseUserType>){

        const query  = req.query
        const usersQuery = usersQueriesDto(query)
        let users = await usersQwRepository.getUsers(usersQuery)

        res.status(201).json(users)


    },

    async createUser () {

    },

    async deleteUser () {

    }

}



