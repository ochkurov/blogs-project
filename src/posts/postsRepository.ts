import {postsCollection} from "../db/mongoDb";
import {ObjectId} from "mongodb";
import {PostInputModel} from "../types/posts-types";

export const postsRepository = {

    async getAllPosts() {

        return await postsCollection.find({}, {projection: {_id: 0}}).toArray()

    },

    async getPostById(id: string) {

        return await postsCollection.findOne({id: id}, {projection: {_id: 0}})

    },

    async getPostByUUID(_id: ObjectId) {

        return await postsCollection.findOne({_id: _id}, {projection: {_id: 0}})

    },

    async createPost(newPost: PostInputModel): Promise<ObjectId | null> {


        const res = await postsCollection.insertOne(newPost)
        return res.insertedId

    },
    async updatePost(id: string, body: PostInputModel): Promise<boolean> {

        const res = await postsCollection.updateOne(
            { id },
            {$set: {...body}}
        )
        return res.matchedCount === 1

    },
    async deletePost(id: string) {

        const post = await postsCollection.findOne({ id })
        if (post) {
            const res = await postsCollection.deleteOne({_id: post._id})
            if ( res.deletedCount > 0) return true
        }
        return false

    }
}

