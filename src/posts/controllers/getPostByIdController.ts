import {Request, Response} from "express";
import {PostViewModel, ResponsePostsType} from "../../types/posts-types";
import {postsService} from "../posts-service";
import {paginationQueries} from "../../helpers/blog_paginations_values";
import {sortType} from "../../types/sort-types";

export const getPostByIdController = async (
    req: Request<{ id: string }, {}, {}>,
    res: Response<ResponsePostsType>) => {


    const id = req.params.id;
    const currentPost = await postsService.getPostById(id)

    if (!currentPost) {
        res.sendStatus(404)
        return
    }

    res.status(200).json(currentPost)

}
