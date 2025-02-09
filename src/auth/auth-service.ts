import {UserInputModel} from "../types/users-types";
import {usersService} from "../users/users-service";
import {emailSender} from "../adapters/email-adapter";

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
        const confirmRegistration = emailSender.confirmRegistration(email , confiramtionCode)
        return {
            status: 201,
            errors: []
        }

    }
}
