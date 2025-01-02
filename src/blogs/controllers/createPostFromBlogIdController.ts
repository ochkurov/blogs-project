import {Request, Response} from "express";
import {postsService} from "../../posts/posts-service";
import {PostInputModel} from "../../types/posts-types";


export const createPostFromBlogIdController = async (
    req: Request<
        { id: string }, {}, PostInputModel>,
    res: Response) => {
    const blogId = req.params.id;
    let body = {...req.body, blogId: blogId};
    let createdPost = await postsService.createPost(body);
    if (!createdPost) {
        res.sendStatus(404)
        return
    }
    res.status(204).json(createdPost);


}
