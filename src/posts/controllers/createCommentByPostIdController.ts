import {Request, Response} from "express";
import {CommentsViewModel} from "../../types/comment-types";
import {commentsService} from "../../comments/comments-service";


export const createCommentByPostIdController = async (
    req: Request<{ id: string }, {}, { content: string }>,
    res: Response<CommentsViewModel>
) => {

    const userId = req.user!._id.toString()
    const postId = req.params.id
    const content = req.body.content

    if (!postId) {
        res.sendStatus(404)
        return;
    }

    const commentId = await commentsService.createComment(userId ,postId, content)




}
