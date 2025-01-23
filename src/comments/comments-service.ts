import {commentsRepository} from "./commentsRepository";
import {commentsCollection} from "../db/mongoDb";

export const commentsService = {
    async getCommentsById ( id: string ) {

    },
    async updateComment ( id:string , content : string) {
        return await commentsRepository.updateComment( id, content );
    },
    async deleteCommentById ( id: string ) {
    }
}
