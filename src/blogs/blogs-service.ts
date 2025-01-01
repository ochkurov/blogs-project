import {blogsRepository} from "./blogsRepository";
import {BlogInputModel, BlogViewModel} from "../types/blog-types";
import {ObjectId} from "mongodb";

export const blogsService = {
    async getBlogs() {
        return await blogsRepository.getAllBlogs()
    },
    async getBlogById(id: string) {
        return await blogsRepository.getBlogById(id)
    },

    async getBlogByUUID(id: ObjectId) {
        return await blogsRepository.getVideoByUUID(id)
    },

    async createBlog(body: BlogInputModel) {

        const newBlog: BlogViewModel = {
            id: Date.now().toString(),
            name: body.name,
            description: body.description,
            websiteUrl: body.websiteUrl,
            createdAt: new Date().toISOString(),
            isMembership: false
        }

        return await blogsRepository.createBlog(newBlog) // данный запрос возвращается нам айдишку блога в виде insertedId

    },
    async updateBlog(id: string, body: BlogInputModel) {
        return await blogsRepository.updateBlog(id, body)
    },
    async deleteBlog(id: string) {
        return await blogsRepository.deleteBlog(id)
    }
}
