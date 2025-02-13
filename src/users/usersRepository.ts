import {
    UserCreateType,
    UserForResponseType,
    UserFullDBModel, UserFullViewModel,
    UserSchemaType,
    UserSecureType
} from "../types/users-types";
import {usersCollection} from "../db/mongoDb";
import {ObjectId} from "mongodb";
import {userMapper} from "./dto/userMapper";
import {id} from "date-fns/locale";

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
    async getUserByLoginOrEmail (loginOrEmail: string) : Promise<UserFullDBModel | null>{
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
    },
    async findUserByConfirmationCode ( code: string ):Promise<UserFullViewModel | null> {
        let findUser = await usersCollection.findOne({"emailConfirmation.confirmationCode": code});
        return findUser ? userMapper(findUser) : null
    },

    async confirmationUserByCode (isConfirmed: boolean  , userId: string) {
        let result = await usersCollection.updateOne(
            { _id: new ObjectId(userId)},
            {
                $set: {"emailConfirmation.isConfirmed": isConfirmed}
            }
        )
        return result.matchedCount === 1;
    },
    async updateConfirmationCode (email:string , confirmationCode:string) {
        let result = await usersCollection.updateOne(
            { email:  email},
            {
                $set: {"emailConfirmation.confirmationCode": confirmationCode}
            }
        )
        return result.matchedCount === 1;
    }
}
x
