import {IPostNewestLikes} from "../../posts/domain/post-types";
import {LikesModel} from "../../db/mongoDb";
import {LikeStatusEnum} from "../domain/like.entity";
import {ObjectId} from "mongodb";


export class LikeQwRepository {
    async getNewestLikesByParentId(parentId: string, limit: number): Promise<IPostNewestLikes[]> {
        const likes = await LikesModel
            .find({parentId: new ObjectId(parentId), status: LikeStatusEnum.Like})
            .sort({createdAt: -1})
            .limit(limit ?? 3)
            .exec()

        return likes.map((like) => {
                return {
                    addedAt: like.createdAt.toISOString(),
                    userId: like.userId.toString(),
                    login: like.authorName.toString(),
                }
            })
        }
}
