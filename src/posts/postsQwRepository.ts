import {ObjectId, WithId} from "mongodb";
import {IPost, PostResponseModel} from "./domain/post-types";
import {LikeStatusEnum} from "../likes /domain/like.entity";
import {sortType} from "../types/sort-types";
import {PostModel} from "./domain/postSchema";
import {LikesModel} from "../db/mongoDb";
import {PaginationType} from "../types/pagination-types";
import {PostViewModel} from "../types/posts-types";

export class PostsQwRepository {
    _mappedPostsToResponse(post: WithId<IPost>, likeStatus: LikeStatusEnum): PostResponseModel {
        return {
            id: post._id.toString(),
            title: post.title,
            shortDescription: post.shortDescription,
            content: post.content,
            blogId: post.blogId.toString(),
            blogName: post.blogName,
            createdAt: post.createdAt,
            extendedLikesInfo: {
                likesCount: post.extendedLikesInfo.likesCount,
                dislikesCount: post.extendedLikesInfo.dislikesCount,
                myStatus: likeStatus,
                newestLikes: post.extendedLikesInfo.newestLikes,
            }
        }
    }

    async getAllPosts(sortData: sortType, blogId?: string | undefined, userId?: string | undefined): Promise<PaginationType<PostResponseModel>> {

        const {pageNumber, pageSize, sortBy, sortDirection} = sortData

        const filter: any = blogId ? {blogId} : {}

        const posts = await PostModel
            .find(filter)
            .sort({[sortBy]: sortDirection === 'asc' ? 1 : -1})
            .skip((pageNumber - 1) * pageSize)
            .limit(pageSize)
            .lean()v
        let postMap = new Map<string, LikeStatusEnum>()

        if (userId) {
            const postIds = posts.map(post => post._id);
            const userLikes = await LikesModel.find({
                userId: new ObjectId(userId),
                parentId: {$in: postIds}
            })
                .lean()
            userLikes.forEach((like) => {
                postMap.set(like.parentId.toString(), like.status);
            })
        }

        const postsCount = await PostModel.countDocuments(filter);
        return {
            pagesCount: Math.ceil(postsCount / pageSize),
            page: pageNumber,
            pageSize,
            totalCount: postsCount,
            items: posts.map((post: WithId<IPost>) => {
                return this._mappedPostsToResponse(post, postMap.get(post._id.toString()) ?? LikeStatusEnum.None)
            })
        }

    }

    async getPostById(id: string, userId?: string | null): Promise<PostViewModel | null> {
        const post = await PostModel.findById({_id: new ObjectId(id)}).lean()
        if (!post) {
            return null;
        }
        const likeStatus = await LikesModel.findOne({userId, parentId: id})
        return this._mappedPostsToResponse(post, likeStatus?.status ?? LikeStatusEnum.None)
    }
}
