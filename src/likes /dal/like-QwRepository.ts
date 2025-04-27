import {injectable} from "inversify";
import {IPostNewestLikes} from "../../posts/domain/post-types";
import {LikesModel} from "../../db/mongoDb";
import {LikeStatusEnum} from "../domain/like.entity";

@injectable()
export class LikeQwRepository {
    async getNewestLikesByParentId(parentId: string, limit: number): Promise<IPostNewestLikes[]> {
        const likes = await LikesModel.find({parentId, status: LikeStatusEnum.Like})
            .sort({createdAt: -1})
            .limit(limit ?? 3)
            .lean()
        //@ts-expect-error
        return likes.map((like) => {
                return {
                    addedAt: like.createdAt.toISOString(),
                    userId: like.userId,
                    login: like.authorName
                }
            })
        }
}
