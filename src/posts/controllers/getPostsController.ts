import {Request, Response} from "express";
import {PostViewModel} from "../../types/blog-types";
import {postsRepository} from "../postsRepository";

export const getPostsController = (
    req:Request,
    res:Response<PostViewModel[]>) => {
    const posts = postsRepository.getAllPosts()
    res.status(200).json(posts)
}
