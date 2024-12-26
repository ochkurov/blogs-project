import {Request, Response} from "express";
import {PostViewModel} from "../../types/blog-types";
import {postsRepository} from "../postsRepository";

export const getPostsController = async (
    req:Request,
    res:Response<PostViewModel[]>) => {
    const posts = await postsRepository.getAllPosts()
    res.status(200).json(posts)
}
