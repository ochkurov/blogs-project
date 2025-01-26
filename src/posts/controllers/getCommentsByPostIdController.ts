import {Request, Response} from "express";
import {QueryInputType} from "../../types/posts-types";
import {CommentResponseType} from "../../types/comment-types";
import {postQueryPagingDef} from "../../helpers/post_paginations_values";
import {commentsQwRepository} from "../../comments/commentsQwRepository";

export const getCommentsByPostIdController = async (req: Request<{ id: string }, {}, {}, QueryInputType>,
                                                    res: Response<CommentResponseType>) => {
    const postId = req.params.id;
    const query = req.query
    const commentQuery:QueryInputType = postQueryPagingDef(query)

    if (!postId) {
        res.sendStatus(404)
        return;
    }
const sortiredComments =  await commentsQwRepository.getCommentsByPostId(postId , commentQuery);
    if (!sortiredComments) {
        res.sendStatus(404)
        return
    }
    res.status(200).json(sortiredComments)
}
