import {postsRepository} from "./postsRepository";
import {PostInputModel} from "../types/posts-types";
import {ObjectId} from "mongodb";

export const postsService = {
    async getAllPosts () {
        return await postsRepository.getAllPosts()
    },
    async getPostById (id: string) {
        return await postsRepository.getPostById(id)
    },
    async getPostByUUID (_id: ObjectId) {
        return await postsRepository.getPostByUUID(_id)
    },
    async createPost (body: PostInputModel) {

        return await postsRepository.createPost(body)

    },
    async updatePost (id: string, body: PostInputModel ) {

        return await postsRepository.updatePost( id, body )
    },
    async deletePost (id: string) {
        return await postsRepository.deletePost(id)
    }

}
