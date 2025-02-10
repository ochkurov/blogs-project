import {UserForResponseType, UserFullDBModel, UserFullViewModel, UserSchemaType} from "../../types/users-types";

export const userMapper = (user: UserFullDBModel): UserFullViewModel => {
    return {
        id: user._id.toString(),
        login: user.login,
        email: user.email,
        password: user.password,
        createdAt: user.createdAt,
        emailConfirmation: user.emailConfirmation
    }
}
