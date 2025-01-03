import {NextFunction, Request, Response} from "express";
import {BlogQueryInputType, BlogViewModel, ResponseBlogType} from "../../types/blog-types";
import {paginationQueries} from "../../helpers/blog_paginations_values";
import {blogsService} from "../blogs-service";


export const getBlogController = async (
    req: Request<{}, {}, {}, BlogQueryInputType>,
    res: Response<ResponseBlogType> ,
    next:NextFunction) => {


    const { pageNumber, pageSize, sortBy, sortDirection, searchNameTerm } = paginationQueries(req.query)

    const blogs = await blogsService.getBlogs(
        pageNumber,
        pageSize,
        sortBy,
        sortDirection,
        searchNameTerm,
    )
    res.status(200).json(blogs)

}
