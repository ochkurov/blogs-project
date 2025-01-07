import {NextFunction, Request, Response} from "express";
import {BlogQueryInputType, ResponseBlogType} from "../../types/blog-types";
import {blogsService} from "../blogs-service";
import {BlogPaginationQueries} from "../../helpers/blog_paginations_values";


export const getBlogController = async (
    req: Request<{}, {}, {}, BlogQueryInputType>,
    res: Response<ResponseBlogType> ,
    next:NextFunction) => {


    const queryData = BlogPaginationQueries(req.query)

    const blogs = await blogsService.getBlogs(
        queryData
    )
    res.status(200).json(blogs)

}
