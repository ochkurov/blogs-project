import {UserCreateType, UserSchemaType, UserSecureType} from "../types/users-types";
import {usersCollection} from "../db/mongoDb";
import {ObjectId} from "mongodb";

export const usersRepository = {

    async findUserByLoginOrEmail(login: string, email: string): Promise<UserSchemaType | null> {
        let findUser = await usersCollection.findOne({
            $or: [{login}, {email}]
        })

        if (!findUser) {
            return null
        }
        return findUser

    },
    async getUserById(id: string){
        const user = await usersCollection.findOne({_id: new ObjectId(id)}, {projection: {password: 0}})
        if (!user) {
            return null
        }
        return user
    },
    async getUserByLoginOrEmail (loginOrEmail: string) : Promise<UserSecureType | null>{
        const user = await usersCollection.findOne({$or: [{login:loginOrEmail}, {email:loginOrEmail}]},{projection: {password: 0}})
        if (!user) {
            return null
        }
        return user
    },
    async createUser(user: UserCreateType): Promise<string> {
        let res = await usersCollection.insertOne(user)
        return res.insertedId.toString()
    },

    async deleteUser(id: string): Promise<boolean> {
        const deletedRes = await usersCollection.deleteOne({_id: new ObjectId(id)})
        return deletedRes.deletedCount === 1
    },
    async checkUserByLoginOrEmail (loginOrEmail:string):Promise<UserSchemaType | null> {
        let findUser = await usersCollection.findOne({$or: [{login:loginOrEmail}, {email:loginOrEmail}]})

        if (!findUser) {
            return null
        }
        return findUser
    }
}
