import {postsRepository} from "./postsRepository";
import {PostInputModel, PostViewModel, ResponsePostsType} from "../types/posts-types";
import {ObjectId} from "mongodb";
import {BlogViewModel} from "../types/blog-types";
import {blogsRepository} from "../blogs/blogsRepository";
import {sortType} from "../types/sort-types";

export const postsService = {

    async getAllPosts (sortData:sortType): Promise<ResponsePostsType>
    {
        const { pageNumber , pageSize , sortBy , sortDirection } = sortData

        const posts = await postsRepository.getAllPosts(sortData)

        const postsCount = await postsRepository.getPostsCount()

        return {
            pagesCount: Math.ceil( postsCount / pageSize),
            page: pageNumber,
            pageSize,
            totalCount: postsCount,
            items : posts
        }
    },
    async getPostsFromBlogId ( blogId: string, sortData: sortType ) {

        const { pageNumber , pageSize , sortBy , sortDirection } = sortData

        const posts = await postsRepository.getPostsByBlogId(blogId , sortData)
        if (posts.length < 1) return null

        const postsCount = await postsRepository.getPostsCountById(blogId)

        return {
            pagesCount: Math.ceil( postsCount / pageSize),
            page: pageNumber,
            pageSize,
            totalCount: postsCount,
            items : posts
        }

    },
    async getPostById (id: string) {
        return await postsRepository.getPostById(id)
    },
    async getPostByMongoID (_id: ObjectId) {
        return await postsRepository.getPostByUUID(_id)
    },

    async createPost (body: PostInputModel) : Promise<ObjectId | null> {

        let blog = await blogsRepository.getBlogById(body.blogId)


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
