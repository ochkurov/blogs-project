import {Request, Response} from "express";
import {postsService} from "../../posts/posts-service";
import {postQueryPagingDef} from "../../helpers/post_paginations_values";
import {PostQueryInputType} from "../../types/posts-types";

export const getPostsFromBlogIdController = async(
    req: Request<{ blogId: string }, {}, {} , PostQueryInputType>,
    res: Response) => {



    const blogId = req.params.blogId;

    const currentPost = await postsService.getPostsFromBlogId(blogId , postQueryPagingDef(req.query))

    if (!currentPost) {
        res.sendStatus(404)
        return
    }

    res.status(200).json(currentPost)
}
