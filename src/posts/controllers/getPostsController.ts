import {Request, Response} from "express";
import {ResponsePostsType} from "../../types/posts-types";
import {postsService} from "../posts-service";
import {paginationQueries} from "../../helpers/paginations_values";
import {sortType} from "../../types/sort-types";

export const getPostsController = async (
    req:Request,
    res:Response<ResponsePostsType>) => {
    const { pageNumber , pageSize , sortBy , sortDirection } = paginationQueries(req)

    const sortData:sortType = {
        pageNumber ,
        pageSize,
        sortBy,
        sortDirection,
    }
    const posts = await postsService.getAllPosts(sortData)
    res.status(200).json(posts)

}
