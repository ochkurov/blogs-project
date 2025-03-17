import {UserInputModel} from "../types/users-types";
import {usersRepository} from "./usersRepository";
import {ErrorType} from "../types/errors-types";
import bcrypt from 'bcrypt'
import {userCreator} from "./dto/userCreator";

type UserServiceType = {
    errors: ErrorType[] | null,
    data: { userId: string , confirmationCode:string } | null,
    status: number

}

export class UserService {
    async createUser(body: UserInputModel, isConfirmed: boolean): Promise<UserServiceType> {
        const errors: ErrorType[] = []

        let findUser = await usersRepository.findUserByLoginOrEmail(body.login, body.email)

        if (findUser) {
            if (findUser.login === body.login) {
                errors.push({message: 'the login is already in use', field: 'login'})
            }
            if (findUser.email === body.email) {
                errors.push({message: 'the email is already in use', field: 'email'})
            }
            return {
                errors: errors ,
                data: null,
                status: 400
            }

        }

        const salt = await bcrypt.genSalt(10);
        const hushedPass = await bcrypt.hash(body.password, salt)


        let newUser = userCreator(
            body.login,
            body.email,
            hushedPass,
            isConfirmed
        )


        const userId = await usersRepository.createUser(newUser)
        return {
            errors: null ,
            data: { userId, confirmationCode: newUser.emailConfirmation.confirmationCode } ,
            status: 201
        }
    }

    async getUserById(id: string) {
        return await usersRepository.getUserById(id)
    }
    async getUserByLoginOrEmail(loginOrEmail: string) {
        return await usersRepository.getUserByLoginOrEmail(loginOrEmail)
    }
    async checkCredentials(loginOrEmail: string, password: string) {
        let findUser = await usersRepository.checkUserByLoginOrEmail(loginOrEmail)
        if (!findUser) {
            return {
                status: 401
            }
        }
        let comparePassword = await bcrypt.compare(password, findUser.password)

        if (comparePassword) {
            return {status: 204}
        }
        return {
            status: 401
        }


    }

    async deleteUser(id: string) {
        return await usersRepository.deleteUser(id)
    }
}

