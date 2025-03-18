import {UserInputModel} from "../types/users-types";
import {emailSender} from "../adapters/email-adapter";
import {UsersRepository} from "../users/usersRepository";
import {randomUUID} from "node:crypto";
import {CheckType, ResultObject} from "../types/result-object";
import {jwtService} from "./application/jwt-service";
import {deviceCollection} from "../db/mongoDb";
import {ObjectId} from "mongodb";
import {CreateSession} from "./dtos/createSession";
import {add} from "date-fns";
import bcrypt from "bcrypt";
import {UserService} from "../users/users-service";

export type LoginDTO = {
    loginOrEmail: string,
    password: string,
    ip: string,
    userAgent: string
}

export class AuthService {
    usersRepository:UsersRepository
    usersService:UserService
    constructor() {
        this.usersRepository = new UsersRepository();
        this.usersService = new UserService()
    }

    async login({loginOrEmail, ip, userAgent, password}: LoginDTO): Promise<ResultObject<{
        accessToken: string,
        refreshToken: string
    }>> {

        const check: CheckType = await this.usersService.checkCredentials(loginOrEmail, password)

        if (check.status === 401) {
            return {
                status: 401,
                errors: [],
                data: null
            }
        }

        const findUser = await this.usersService.getUserByLoginOrEmail(loginOrEmail)

        const deviceId = new ObjectId()

        const accessToken = await jwtService.createJWT(findUser?._id.toString()!)
        const refreshToken = await jwtService.createRefresh(findUser?._id.toString()!, deviceId.toString())

        const {iat, exp} = jwtService.jwtDecodeToken(refreshToken)

        const newSession = new CreateSession(deviceId, findUser?._id!, userAgent, ip, iat!, exp!)


        await deviceCollection.insertOne(newSession)
        return {
            status: 200,
            errors: null,
            data: {
                accessToken: accessToken,
                refreshToken: refreshToken
            }
        }
    }

    async registration(user: UserInputModel) {
        let result = await this.usersService.createUser(user, false);
        if (result.errors?.length || !result.data) {
            return {
                status: 400,
                errors: result.errors
            }
        }
        const email = user.email
        const confiramtionCode = result.data.confirmationCode
        try {
            await emailSender.confirmRegistration(email, confiramtionCode)
        } catch (err: any) {
            console.log(err)
            await this.usersRepository.deleteUser(result.data.userId)
            return {
                status: 400,
                errors: [{message: 'Email nor confirmed , make registration again', field: 'code'}]
            }
        }

        return {
            status: 201,
            errors: []
        }

    }

    async authByConfirmationCode(code: string) {

        const user = await this.usersRepository.findUserByConfirmationCode(code)

        if (!user) {
            return {
                status: 400,
                data: {isConfirmed: false},
                errors: [{field: "code", message: 'Confirmation code is incorrect'}]
            }
        }
        if (new Date() > user.emailConfirmation.expirationDate || user.emailConfirmation.isConfirmed) {
            return {
                status: 400,
                data: {isConfirmed: false},
                errors: [{field: "code", message: 'Confirmation code is incorrect'}]
            }
        }
        const confirmUser = await this.usersRepository.confirmationUserByCode(true, user.id)

        if (!confirmUser) {
            return {
                status: 400,
                data: {isConfirmed: false},
                errors: [{field: "code", message: 'Confirmation code is incorrect'}]
            }
        }
        return {
            status: 204,
            data: {isConfirmed: true},
            errors: []
        }
    }

    async resendingConfirmationCode(email: string) {
        const findUser = await this.usersRepository.getUserByLoginOrEmail(email)
        if (findUser && !findUser.emailConfirmation.isConfirmed) {
            const confirmationCode = randomUUID()
            await this.usersRepository.updateConfirmationCode(email, confirmationCode)
            try {
                await emailSender.confirmRegistration(email, confirmationCode)
            } catch (err: any) {
                console.log(err)
                await this.usersRepository.deleteUser(findUser._id.toString())
                return {
                    status: 400,
                    errors: [{message: 'Email nor confirmed , make registration again', field: 'code'}]
                }
            }

            return {
                status: 204,
                errors: []
            }
        }
        return {
            status: 400,
            data: [],
            errors: [{field: "email", message: 'User not found'}]
        }
    }

    async passwordRecovery(email: string) {
        const user = await await this.usersRepository.getUserByLoginOrEmail(email)
        if (!user) {
            return {
                status: 204,
                data: [],
                errors: []
            }
        }
        if (!user.emailConfirmation.isConfirmed) {
            return {
                status: 204,
                data: [],
                errors: []
            }
        }
        const recoveryCode = randomUUID()

        await this.usersRepository.updateUserRecoveryCode(email, {
            recoveryCode,
            expirationDate: add(
                new Date(), {
                    hours: 0,
                    minutes: 5
                }),
            isConfirmed: false
        })

        await emailSender.recoveryPassword(email, recoveryCode)

        return {
            status: 204,
            data: [],
            errors: []
        }
    }

    async changePassword( password: string, recoveryCode : string) {
        console.log(recoveryCode)
        const findUserByCode = await this.usersRepository.findUserByRecoveryCode(recoveryCode)
        console.log(findUserByCode)

        if (!findUserByCode) {
            return {
                status: 400,
                data: [],
                errors: [{field: "passwordRecovery", message: 'User not found'}]
            }
        }

        if (new Date() > findUserByCode.passwordRecovery.expirationDate!) {
            return {
                status: 400,
                data: [],
                errors: [{field: "passwordRecovery", message: ''}]
            }
        }
        const salt = await bcrypt.genSalt(10);
        const hushedPass = await bcrypt.hash(password, salt)

        await this.usersRepository.updateUserPassword(findUserByCode.id , hushedPass)

        return {
            status:204,
            data: [],
            errors: []
        }
    }
}

