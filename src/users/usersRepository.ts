import {UserCreateType, UserSchemaType} from "../types/users-types";
import {usersCollection} from "../db/mongoDb";

export const usersRepository = {

    async findUserByLoginOrEmail (login:string , email:string): Promise<UserSchemaType | null> {
    let findUser =  await usersCollection.findOne({$or: [{login}, {email}]})

        if( !findUser ){
            return null
        }
        return findUser

    },

    async createUser (user:UserCreateType): Promise<string> {
        let res = await usersCollection.insertOne(user)
        return res.insertId.toString()
    }
}
