import {Request, Response} from "express";
import {PostQueryInputType, ResponsePostsType} from "../../types/posts-types";
import {postsService} from "../posts-service";
import {sortType} from "../../types/sort-types";
import {postQueryPagingDef} from "../../helpers/post_paginations_values";

export const getPostsController = async (
    req:Request<{},{},{},PostQueryInputType>,
    res:Response<ResponsePostsType>) => {
    const { pageNumber , pageSize , sortBy , sortDirection } = postQueryPagingDef(req.query)

    const sortData:sortType = {
        pageNumber ,
        pageSize,
        sortBy,
        sortDirection,
    }
    const posts = await postsService.getAllPosts(sortData)
    res.status(200).json(posts)

}
