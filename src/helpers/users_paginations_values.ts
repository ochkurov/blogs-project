import {UsersQueryInputType} from "../types/users-types";

export const usersQueriesDto = (query: UsersQueryInputType) => {

    const sortBy: string = query.sortBy ? query.sortBy.toString() : 'createdAt';
    let sortDirection: 'asc' | 'desc' =
        query.sortDirection && query.sortDirection.toString() === 'asc'
            ? 'asc'
            : 'desc'

    const pageNumber: number = query.pageNumber ? +query.pageNumber : 1;
    const pageSize: number = query.pageSize ? +query.pageSize : 10;
    const searchLoginTerm: string | null = query.searchLoginTerm ? query.searchLoginTerm.toString() : null;
    const searchEmailTerm: string | null = query.searchEmailTerm ? query.searchEmailTerm.toString() : null;

    return {
        sortBy,
        sortDirection,
        pageNumber,
        pageSize,
        searchLoginTerm,
        searchEmailTerm,
    }
}
