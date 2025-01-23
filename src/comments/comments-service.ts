import {commentsRepository} from "./commentsRepository";
import {ObjectId} from "mongodb";

export const commentsService = {
    async getCommentsById ( id: string ) {

    },
    async updateComment ( id:string , content : string) {
        return await commentsRepository.updateComment( id, content );
    },
    async deleteCommentById ( id: string ) {
    },
    async createComment (userId: string , postId: string, content: string ) {
        const post = await
    }
}
