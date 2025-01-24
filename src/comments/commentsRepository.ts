import {commentsCollection} from "../db/mongoDb";
import {DbCommentType} from "../types/comment-types";
import {ObjectId} from "mongodb";

export const commentsRepository = {

    async getCommentById(commentId: string) {
        return await commentsCollection.findOne({_id: new ObjectId(commentId)})
    },
    async updateComment ( id: string, content: string ): Promise<boolean> {
        const res = await commentsCollection.updateOne(
            {id},
            {$set: content},
        )
        return res.matchedCount === 1
    },
    async createComment (comment:DbCommentType) {
        let res = await commentsCollection.insertOne(comment)
        return res.insertedId.toString()
    },

}
