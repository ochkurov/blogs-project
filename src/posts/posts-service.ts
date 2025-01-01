import {postsRepository} from "./postsRepository";
import {PostInputModel, PostViewModel} from "../types/posts-types";
import {ObjectId} from "mongodb";
import {BlogViewModel} from "../types/blog-types";
import {blogsRepository} from "../blogs/blogsRepository";

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
        const blog: BlogViewModel | null = await blogsRepository.getBlogById(body.blogId)

        if (!blog) {
            return null
        }


        let newPost: PostViewModel = {
            id: Date.now().toString(),
            title: body.title,
            shortDescription: body.shortDescription,
            content: body.content,
            blogId: body.blogId,
            blogName: blog.name || " new Name " ,
            createdAt: new Date().toISOString(),
        }

        return await postsRepository.createPost(newPost)

    },
    async updatePost (id: string, body: PostInputModel ) {

        return await postsRepository.updatePost( id, body )
    },
    async deletePost (id: string) {
        return await postsRepository.deletePost(id)
    }

}
