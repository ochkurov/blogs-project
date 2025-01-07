import {UsersQueryInputType} from "../types/users-types";
import {usersCollection} from "../db/mongoDb";

export const usersQwRepository = {
    async getUsers(query: UsersQueryInputType) {

        const {sortBy, sortDirection, pageNumber, pageSize, searchLoginTerm, searchEmailTerm} = query

        let filter:any = {}

        if (searchLoginTerm) {
            filter = {login: {$regex: searchLoginTerm, $options: "i"}}
        }
        if (searchEmailTerm) {
            filter = {email: {$regex: searchEmailTerm, $options: "i"}}
        }

        return await usersCollection
            .find(filter, {projection:{_id:0}})
            .sort({[sortBy]: sortDirection})
            .skip((pageNumber - 1) * pageSize)
            .limit(pageSize)
            .toArray()

    }
}
