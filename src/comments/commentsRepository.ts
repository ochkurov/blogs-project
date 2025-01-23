import {commentsCollection} from "../db/mongoDb";

export const commentsRepository = {
    async updateComment ( id: string, content: string ): Promise<boolean> {
        const res = await commentsCollection.updateOne(
            {id},
            {$set: content},
        )
        return res.matchedCount === 1
    }

}
