import {NextFunction, Request, Response} from "express";
import {BlogViewModel} from "../../types/blog-types";
import {paginationQueries} from "../../helpers/paginations_values";
import {blogsService} from "../blogs-service";


export const getBlogController = async (
    req: Request,
    res: Response<BlogViewModel[]> ,
    next:NextFunction) => {

    const { pageNumber, pageSize, sortBy, sortDirection, searchNameTerm } = paginationQueries(req)

    const blogs = await blogsService.getBlogs(
       /* pageNumber,
        pageSize,
        sortBy,
        sortDirection,
        searchNameTerm,*/
    )
    res.status(200).json(blogs)

}
