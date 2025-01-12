import {UserInputModel} from "../types/users-types";
import {usersRepository} from "./usersRepository";
import {ErrorType} from "../types/errors-types";
import bcrypt from 'bcrypt'

 type UserServiceType = {
    userId: string | null;
     errors: ErrorType[] | null;
}

export const usersService = {
    async createUser(body: UserInputModel): Promise<UserServiceType> {
        const errors: ErrorType[] = []

        let findUser = await usersRepository.findUserByLoginOrEmail(body.login, body.email)
        if (findUser) {
            if (findUser.login === body.login) {
                errors.push({message: 'the login is already in use', field: 'email'})
            }
            if (findUser.email === body.email) {
                errors.push({message: 'the email is already in use', field: 'email'})
            }
            return {userId:null , errors: errors}

        }

        const salt = await bcrypt.genSalt(10);
        const hushedPass = await bcrypt.hash(body.password, salt)


        const newUser = {
            login: body.login,
            email: body.email,
            password: hushedPass,
            createdAt: new Date().toISOString()
        }
        const userId =  await usersRepository.createUser(newUser)
        return {userId, errors: null }
    }
}
