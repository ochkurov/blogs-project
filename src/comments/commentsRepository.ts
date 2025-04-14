import {CommentsModel} from "../db/mongoDb";
import {CommentsDocument, DbCommentType, DbResponseCommentType} from "../types/comment-types";
import {ObjectId} from "mongodb";

export class CommentsRepository {
    async getCommentById(id: string): Promise<DbResponseCommentType | null> {
        return CommentsModel.findOne({_id: new ObjectId(id)}); //??
    }
    async updateComment(id: string, content: string): Promise<boolean> {
        const res = await CommentsModel.updateOne(
            {_id: new ObjectId(id)},
            {$set: {content}},
        )
        return res.matchedCount === 1
    }
    async createComment(comment: DbCommentType) {
        let res = await CommentsModel.insertOne(comment)
        return res._id.toString();
    }
    async deleteComment(id: string): Promise<boolean> {
        const deletedRes = await CommentsModel.deleteOne({_id: new ObjectId(id)})
        return deletedRes.deletedCount === 1
    }
    async save(comment: CommentsDocument) {
        return await comment.save()
    }
}

