import {ILike, LikeDocument} from "../domain/like.entity";
import {LikesModel} from "../../db/mongoDb";

export class LikeRepository {
    async save(like: LikeDocument) {
        return await like.save();
    }
}
