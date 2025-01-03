import {BlogQueryInputType} from "../types/blog-types";

export const paginationQueries = (query: BlogQueryInputType): BlogQueryInputType => {
    const pageNumber: number = query.pageNumber ? +query.pageNumber : 1;
    const pageSize: number = query.pageSize ? +query.pageSize : 10;
    const sortBy: string = query.sortBy ? query.sortBy.toString() : 'createdAt';

    let sortDirection: 'asc' | 'desc' =
        query.sortDirection && query.sortDirection.toString() === 'asc'
            ? 'asc'
            : 'desc'


    const searchNameTerm: string | null = query.searchNameTerm ? String(query.searchNameTerm) : null

    return {pageNumber, pageSize, sortBy, sortDirection, searchNameTerm};

}

