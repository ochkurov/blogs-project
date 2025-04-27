import {LikesModel, postsCollection} from "../db/mongoDb";
import {ObjectId} from "mongodb";
import {sortType} from "../types/sort-types";
import {PostInputModel} from "../types/posts-types";
import {IPost} from "./domain/post-types";
import {PostDocument, PostModel} from "./domain/postSchema";
import {LikeStatusEnum} from "../likes /domain/like.entity";

export class PostsRepository {



    async getPostsByBlogId(blogId: string, sortData: sortType) {
        const {sortBy, sortDirection, pageSize, pageNumber} = sortData;

        const filteredPosts: any = {}

        if (blogId) {
            filteredPosts.blogId = blogId;
        }
        return await postsCollection
            .find(filteredPosts)
            .sort({[sortBy]: sortDirection === 'asc' ? 1 : -1})
            .skip((pageNumber - 1) * pageSize)
            .limit(pageSize)
            .toArray()

    }

    async getPostsCount() {

        return await postsCollection.countDocuments({})
    }

    async getPostsCountById(blogId: string) {
        return await postsCollection.countDocuments({blogId})
    }

    async getPostById(_id: ObjectId) {

        return await postsCollection.findOne({_id: _id})

    }

    async save(post: PostDocument): Promise<PostDocument> {
        return post.save()
    }

    async updatePost(_id: ObjectId, body: PostInputModel): Promise<boolean> {

        const res = await postsCollection.updateOne(
            {_id},
            {$set: {...body}}
        )
        return res.matchedCount === 1

    }

    async deletePost(_id: ObjectId) {

        const post = await postsCollection.findOne({_id})
        if (post) {
            const res = await postsCollection.deleteOne({_id: post._id})
            if (res.deletedCount > 0) return true
        }
        return false

    }
}


