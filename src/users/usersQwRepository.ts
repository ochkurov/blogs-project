import {ResponseUserType, UserSecureType, UsersQueryInputType, UsersQueryPaginationType} from "../types/users-types";
import {usersCollection} from "../db/mongoDb";

export const usersQwRepository = {

    async getUsers(query: UsersQueryPaginationType): Promise<ResponseUserType> {

        const {sortBy, sortDirection, pageNumber, pageSize, searchLoginTerm, searchEmailTerm} = query

        let filter:any = { $or: [] }

        if (searchLoginTerm) {
            filter.$or.push({login: {$regex: searchLoginTerm, $options: "i"}})
        }

        if (searchEmailTerm) {
            filter.$or.push({email: {$regex: searchEmailTerm, $options: "i"}})
        }

        const users:UserSecureType[] = await usersCollection
            .find(filter.$or.length ? filter : {}, {projection:{password: 0}})
            .sort({[sortBy]: sortDirection})
            .skip((pageNumber - 1) * pageSize)
            .limit(pageSize)
            .toArray();

        const usersCount = await usersCollection.countDocuments(filter.$or.length ? filter : {});

        return {
            pagesCount: Math.ceil(usersCount / pageSize),
            page: pageNumber,
            pageSize,
            totalCount:usersCount,
            items: users.map((u)=>{ return {
                id: u._id.toString(),
                login: u.login,
                email: u.email,
                createdAt: u.createdAt
            }})
        }

    }
}
