import {Request, Response} from "express";
import {PostViewModel} from "../../types/posts-types";
import {postsService} from "../posts-service";

export const getPostsController = async (
    req:Request,
    res:Response<PostViewModel[]>) => {

    const posts = await postsService.getAllPosts()
    res.status(200).json(posts)

}
