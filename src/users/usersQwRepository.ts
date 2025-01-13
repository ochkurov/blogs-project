import {ResponseUserType, UsersQueryInputType, UsersQueryPaginationType} from "../types/users-types";
import {usersCollection} from "../db/mongoDb";

export const usersQwRepository = {

    async getUsers(query: UsersQueryPaginationType): Promise<ResponseUserType> {

        const {sortBy, sortDirection, pageNumber, pageSize, searchLoginTerm, searchEmailTerm} = query

        let filter:any = {}

        if (searchLoginTerm) {
            filter = {login: {$regex: searchLoginTerm, $options: "i"}}
        }
        if (searchEmailTerm) {
            filter = {email: {$regex: searchEmailTerm, $options: "i"}}
        }

        const users = await usersCollection
            .find(filter, {projection:{password: 0}})
            .sort({[sortBy]: sortDirection})
            .skip((pageNumber - 1) * pageSize)
            .limit(pageSize)
            .toArray()
        const usersCount = await usersCollection.countDocuments(filter);

        return {
            pagesCount: Math.ceil(usersCount / pageSize),
            page: pageNumber,
            pageSize,
            totalCount:usersCount,
            items: users

        }

    }
}
