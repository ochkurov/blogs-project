import {ObjectId} from "mongodb";

export type UserSchemaType = {
    _id: ObjectId
    login: string,
    email: string,
    createdAt: string,
    password: string
}

export type UserSecureType = {
    _id: ObjectId
    login: string,
    email: string,
    createdAt: string,
}
export type UserForAuthMe = {
    email: string,
    login: string,
    userId: string
}

export type UserForResponseType = {
    id: string,
    login: string,
    email: string,
    createdAt: string,
}

export type UserInputModel = {
    login: string,
    password: string,
    email: string,
}

export type UserCreateType = {
    login: string,
    email: string,
    password: string
    createdAt: string,
}

export type ResponseUserType = {
    pagesCount: number,
    page: number,
    pageSize: number,
    totalCount: number,
    items: UserForResponseType[]
}

export type UsersQueryPaginationType = {
    sortBy: string | 'createdAt',
    sortDirection: "asc" | "desc",
    pageNumber: number,
    pageSize: number,
    searchLoginTerm: string | null,
    searchEmailTerm: string | null,
}

export type UsersQueryInputType = {
    sortBy?: string,
    sortDirection?: string,
    pageNumber?: string,
    pageSize?: string,
    searchLoginTerm?: string,
    searchEmailTerm?: string,
}

export type UserFullViewModel = {
    id: string,
    login: string,
    email: string,
    password: string,
    createdAt: string,
    emailConfirmation: EmailConfirmationViewType
}
export type EmailConfirmationViewType = {
    confirmationCode: string;
    expirationDate: Date;
    isConfirmed: boolean;
}
export type PasswordRecoveryViewType = {
    recoveryCode: string | null,
    expirationDate: Date | null,
    isConfirmed: boolean
}
export type UserCreateTypeModel = {
    login: string,
    email: string,
    password: string,
    createdAt: string,
    emailConfirmation: EmailConfirmationViewType
    passwordRecovery: PasswordRecoveryViewType
}

export type UserFullDBModel = {
    _id: ObjectId
    login: string,
    email: string,
    password: string,
    createdAt: string,
    emailConfirmation: EmailConfirmationViewType
    passwordRecovery: PasswordRecoveryViewType
}
