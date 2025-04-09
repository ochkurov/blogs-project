import {LikeStatusEnum} from "../domain/like.entity";
import {CommentDocument, CommentsModel, LikesModel} from "../../db/mongoDb";
import {UsersRepository} from "../../users/usersRepository";
import {LikeRepository} from "../dal/like-repository";
import {IComment} from "../../types/comment-types";
import {WithId} from "mongodb";

interface CalculateLikeStatusesDTO {
    likesCount: number,
    dislikesCount: number,
    currentLikeStatus?: LikeStatusEnum,
    updatedLikeStatus: LikeStatusEnum
}
interface LikeStatuses {
    likesCount: number;
    dislikesCount: number;
}

export class LikeService {
    constructor(
        private userRepository: UsersRepository,
        private likeRepository: LikeRepository
    ) {
    }
private calcuteLikesCount ({
    likesCount,
    dislikesCount,
    currentLikeStatus = LikeStatusEnum.None,
    updatedLikeStatus
                           }: CalculateLikeStatusesDTO): LikeStatuses {

        let newLikesCount = likesCount
        let newDislikesCount = dislikesCount
    if( currentLikeStatus === LikeStatusEnum.Like) {
        if (updatedLikeStatus === LikeStatusEnum.Dislike) {
            newLikesCount -=1
            newDislikesCount +=1
        }
        else if (updatedLikeStatus === LikeStatusEnum.None) {
            newLikesCount -=1
        }
    } else if ( currentLikeStatus === LikeStatusEnum.Dislike) {
        if (updatedLikeStatus === LikeStatusEnum.Like) {
            newLikesCount +=1
            newDislikesCount -=1
        }
        else if ( updatedLikeStatus === LikeStatusEnum.None) {
            newDislikesCount -=1
        }
    } else {
        if ( updatedLikeStatus === LikeStatusEnum.Dislike) {
            newDislikesCount +=1
        }
        else if ( updatedLikeStatus === LikeStatusEnum.Like) {
            newLikesCount +=1
        }
    }

    return {
        likesCount: newLikesCount,
        dislikesCount: newDislikesCount
    }
}
    async setLikeStatus(comment: CommentDocument, likeStatus: LikeStatusEnum, userId: string) {
        try {
            const findUser = await this.userRepository.getUserById(userId)
            if (!findUser) {
                return {
                    status: 401,
                    errors: [],
                    data: null
                }
            }
            const findLike = await LikesModel.findOne({parentId: comment._id.toString(), userId})
            if (findLike) {
                if (findLike.status === likeStatus) {
                    return {
                        status: 204,
                        errors: [],
                        data: null
                    }
                }
                const presentLikeStatus: LikeStatusEnum = findLike.status
                findLike.status = likeStatus
                await findLike.validate()
                await findLike.save()

                const {likesCount , dislikesCount} = this.calcuteLikesCount({
                    likesCount: comment.likesInfo.likesCount,
                    dislikesCount: comment.likesInfo.dislikesCount,
                    currentLikeStatus: presentLikeStatus,
                    updatedLikeStatus: likeStatus
                })
                comment.likesInfo.likesCount = likesCount
                comment.likesInfo.dislikesCount = dislikesCount

                await comment.save()

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
                parentId: comment._id.toString(),
            })

            await this.likeRepository.save(newLike)

            if (newLike.status === LikeStatusEnum.Like) {
                comment.likesInfo.likesCount +=1
            } else if (newLike.status === LikeStatusEnum.Dislike) {
                comment.likesInfo.dislikesCount +=1
            }

            await comment.save()
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


}
