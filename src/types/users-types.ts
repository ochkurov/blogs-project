export type UserViewModel = {
    id:string
    login:string
    email:string
    createdAt:string
}

export type UserInputModel = {
    login:string,
    password:string,
    email:string,
}

export type ResponseUserType = {
    pagesCount: number,
    page: number ,
    pageSize: number,
    totalCount: number,
    items: UserViewModel[]
}

export type UsersQueryInputType = {
    sortBy: string | 'createdAt',
    sortDirection: "asc" | "desc",
    pageNumber: number,
    pageSize: number,
    searchLoginTerm: string | null,
    searchEmailTerm: string | null,
}
