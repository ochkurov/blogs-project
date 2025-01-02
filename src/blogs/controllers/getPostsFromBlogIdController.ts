import {Request, Response} from "express";
import {postsService} from "../../posts/posts-service";

export const getPostsFromBlogIdController = async(
    req: Request<{ id: string }, {}, {}>,
    res: Response) => {
    const blogId = req.params.id;
    const currentPost = await postsService.getPostById(blogId)

    if (!currentPost) {
        res.sendStatus(404)
        return
    }

    res.status(200).json(currentPost)
}
