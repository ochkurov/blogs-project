import {Request, Response} from 'express';

export const paginationQueries = (req: Request) => {
    const pageNumber: number = req.query.pageNumber ? +req.query.pageNumber : 1;
    const pageSize: number = req.query.pageSize ? +req.query.pageSize : 10;
    const sortBy: string = req.query.sortBy ? req.query.sortBy.toString() : 'createdAt';

    let sortDirection: 'asc' | 'desc' =
        req.query.sortDirection && req.query.sortDirection.toString() === 'asc'
            ? 'asc'
            : 'desc'


    const searchNameTerm: string | null = req.query.searchName ? String(req.query.searchNameTerm) : null

    return {pageNumber, pageSize, sortBy, sortDirection, searchNameTerm};

}

