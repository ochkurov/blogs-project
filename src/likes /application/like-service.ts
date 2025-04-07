import {LikeStatusEnum} from "../domain/like.entity";
import {LikesModel} from "../../db/mongoDb";
import {UsersRepository} from "../../users/usersRepository";
import {LikeRepository} from "../dal/like-repository";

export class LikeService {
    constructor(
        private userRepository: UsersRepository,
        private likeRepository: LikeRepository
    ) {
    }

    async setLikeStatus(commentId: string, likeStatus: LikeStatusEnum, userId: string) {
        try {
            const findUser = await this.userRepository.getUserById(userId)
            if (!findUser) {
                return {
                    status: 401,
                    errors: [],
                    data: null
                }
            }
            const findLike = await LikesModel.findOne({parentId: commentId, userId})
            if (findLike) {
                if (findLike.status === likeStatus) {
                    return {
                        status: 204,
                        errors: [],
                        data: null
                    }
                }
                findLike.status = likeStatus
                await findLike.validate()
                await findLike.save()
                return {
                    status: 204,
                    errors: [],
                    data: null
                }
            }
            const newLike = new LikesModel({
                status: likeStatus,
                userId: userId,
                authorName: findUser.login,
                parentId: commentId,
            })
            await this.likeRepository.save(newLike)
            return {
                status: 204,
                errors: [],
                data: null
            }
        } catch (error:unknown) {
            return {
                status: 400,
                errors: [],
                data: null
            }
        }
    }
    async calculateLikesByParentId (parentId: string) {
        const likesCount = await LikesModel.countDocuments({parentId: parentId, status: LikeStatusEnum.Like})
        const dislikesCount = await LikesModel.countDocuments({parentId: parentId, status: LikeStatusEnum.Dislike})

        return {
            likesCount: likesCount,
            dislikesCount: dislikesCount
        }
    }

}
