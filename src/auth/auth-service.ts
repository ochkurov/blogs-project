import {UserInputModel} from "../types/users-types";
import {usersService} from "../users/users-service";
import {emailSender} from "../adapters/email-adapter";
import {usersRepository} from "../users/usersRepository";
import {randomUUID} from "node:crypto";

export const authService = {
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
