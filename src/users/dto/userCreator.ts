import {UserCreateTypeModel, UserFullViewModel} from "../../types/users-types";
import {add} from "date-fns";
import {randomUUID} from "node:crypto";

export const userCreator = (login: string, email: string, passwordHash: string, isConfirmed: boolean): UserCreateTypeModel => {
    return {
        login,
        email,
        password: passwordHash,
        createdAt: new Date().toISOString(),
        emailConfirmation: {
            expirationDate: add(
                new Date(), {
                    hours: 0,
                    minutes: 5
                }
            ),
            confirmationCode: randomUUID(),
            isConfirmed
        }
    }
}
