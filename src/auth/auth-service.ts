import {UserInputModel} from "../types/users-types";
import {usersService} from "../users/users-service";
import {emailSender} from "../adapters/email-adapter";
import {usersRepository} from "../users/usersRepository";
import {randomUUID} from "node:crypto";
import {CheckType, ResultObject} from "../types/result-object";
import {jwtService} from "./application/jwt-service";
import {deviceCollection} from "../db/mongoDb";
import {ObjectId} from "mongodb";

export type LoginDTO = {
    loginOrEmail: string ,
    password: string,
    ip: string,
    userAgent: string
}

export const authService = {

    async login ({loginOrEmail , ip , userAgent , password}: LoginDTO): Promise<ResultObject<{ accessToken: string, refreshToken: string }>> {

        const check: CheckType = await usersService.checkCredentials(loginOrEmail, password)

        if (check.status === 401) {
           return {
               status: 401,
               errors: [],
               data: null
           }
        }

        const findUser = await usersService.getUserByLoginOrEmail(loginOrEmail)

        const deviceId = new ObjectId()

        const accessToken = await jwtService.createJWT(findUser?._id.toString()!)
        const refreshToken = await jwtService.createRefresh(findUser?._id.toString()!, deviceId.toString())

        const { iat , exp } = jwtService.jwtDecodeToken(refreshToken)

        const newSession = {
            _id: deviceId,
            userId: findUser?._id,
            title: userAgent,
            ip: ip,
            iat: iat,
            exp: exp,
        }


        await deviceCollection.insertOne(newSession)
        return {
            status: 200,
            errors: null,
            data: {
                accessToken: accessToken,
                refreshToken: refreshToken
            }
        }
    },
    async registration (user: UserInputModel) {
        let result = await usersService.createUser(user , false);
        if (result.errors?.length || !result.data) {
            return {
                status: 400,
                errors: result.errors
            }
        }
        const email = user.email
        const confiramtionCode = result.data.confirmationCode
        try {
            await emailSender.confirmRegistration(email , confiramtionCode)
        } catch (err:any) {
            console.log(err)
            await usersRepository.deleteUser(result.data.userId)
            return {
                status: 400,
                errors: [{message: 'Email nor confirmed , make registration aganin', field: 'code'}]
            }
        }

        return {
            status: 201,
            errors: []
        }

    },
    async authByConfirmationCode (code: string ) {

        const user = await usersRepository.findUserByConfirmationCode(code)

        if (!user) {
            return {
                status: 400,
                data: { isConfirmed: false },
                errors: [{field: "code" , message: 'Confirmation code is incorrect'}]
            }
        }
        if (new Date () > user.emailConfirmation.expirationDate || user.emailConfirmation.isConfirmed) {
            return {
                status: 400,
                data: { isConfirmed: false },
                errors: [{field: "code" , message: 'Confirmation code is incorrect'}]
            }
        }
        const confirmUser = await usersRepository.confirmationUserByCode(true , user.id )

        if (!confirmUser) {
            return {
                status: 400,
                data: { isConfirmed: false },
                errors: [{field: "code" , message: 'Confirmation code is incorrect'}]
            }
        }
        return {
            status: 204,
            data: { isConfirmed: true },
            errors: []
        }
    },
    async resendingConfirmationCode ( email: string ) {
        const findUser = await usersRepository.getUserByLoginOrEmail(email)
        if (findUser && !findUser.emailConfirmation.isConfirmed) {
            const confirmationCode =  randomUUID()
            await usersRepository.updateConfirmationCode(email , confirmationCode)
            try {
                await emailSender.confirmRegistration(email , confirmationCode)
            } catch (err:any) {
                console.log(err)
                await usersRepository.deleteUser(findUser._id.toString())
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
            errors: [{field: "email" , message: 'User not found'}]
        }
     }
}
