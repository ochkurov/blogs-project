import {UserInputModel} from "../types/users-types";
import {usersService} from "../users/users-service";
import {emailSender} from "../adapters/email-adapter";
import {usersRepository} from "../users/usersRepository";

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
                errors: [{message: 'Email nor confirmed , make registration aganin', field: 'confirmationCode'}]
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
                errors: [{field: "confirmationCode" , message: 'Confirmation code is incorrect'}]
            }
        }
        if (new Date () > user.emailConfirmation.expirationDate || user.emailConfirmation.isConfirmed) {
            return {
                status: 400,
                data: { isConfirmed: false },
                errors: [{field: "confirmationCode" , message: 'Confirmation code is incorrect'}]
            }
        }
        const confirmUser = await usersRepository.confirmationUserByCode(true , user.id)
        if (!confirmUser) {
            return {
                status: 400,
                data: { isConfirmed: false },
                errors: [{field: "confirmationCode" , message: 'Confirmation code is incorrect'}]
            }
        }
        return {
            status: 201,
            data: { isConfirmed: true },
            errors: []
        }
    },
}
