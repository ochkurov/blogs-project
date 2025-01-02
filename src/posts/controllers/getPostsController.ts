import {Request, Response} from "express";
import {ResponsePostsType} from "../../types/posts-types";
import {postsService} from "../posts-service";
import {paginationQueries} from "../../helpers/paginations_values";

export const getPostsController = async (
    req:Request,
    res:Response<ResponsePostsType>) => {
    const { pageNumber , pageSize , sortBy , sortDirection } = paginationQueries(req)

    const posts = await postsService.getAllPosts(
        pageNumber,
        pageSize,
        sortBy,
        sortDirection,
    )
    res.status(200).json(posts)

}
