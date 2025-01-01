import {Request, Response} from "express";


export const getPostsFromBlogIdController = (
    req: Request<{ id: string }, {}, {}>,
    res: Response) => {
    const blogId = req.params.id;


}
