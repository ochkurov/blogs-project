import {CreatePostType, PostInputModel, PostViewModel, ResponsePostsType} from "../types/posts-types";
import {ObjectId} from "mongodb";
import {sortType} from "../types/sort-types";
import {PostsRepository} from "./postsRepository";
import {BlogsRepository} from "../blogs/blogsRepository";
import {getPostViewModel} from "./output/getPostViewModel";
import {LikeStatusEnum} from "../likes /domain/like.entity";


export class PostsService {

    constructor(private postsRepository: PostsRepository,
    private blogsRepository: BlogsRepository) {

    }
    async getAllPosts (sortData:sortType): Promise<ResponsePostsType>
    {
        const { pageNumber , pageSize , sortBy , sortDirection } = sortData

        const posts = await this.postsRepository.getAllPosts(sortData)

        const postsCount = await this.postsRepository.getPostsCount()
        const mappedPosts = posts.map(getPostViewModel)

        return {
            pagesCount: Math.ceil( postsCount / pageSize),
            page: pageNumber,
            pageSize,
            totalCount: postsCount,
            items : mappedPosts
        }
    }
    async getPostsFromBlogId ( blogId: string, sortData: sortType ) {

        const { pageNumber , pageSize , sortBy , sortDirection } = sortData

        const posts = await this.postsRepository.getPostsByBlogId(blogId , sortData)
        if (posts.length < 1) return null

        const postsCount = await this.postsRepository.getPostsCountById(blogId)
        const mappedPosts = posts.map(getPostViewModel)

        return {
            pagesCount: Math.ceil( postsCount / pageSize),
            page: pageNumber,
            pageSize,
            totalCount: postsCount,
            items : mappedPosts
        }

    }
    async getPostById ( id: string ):Promise<PostViewModel | null> {
        return this.postsRepository.getPostById( new ObjectId( id ) )
            .then(post => post ?  getPostViewModel(post): null)
    }
    async getPostByMongoID (_id: ObjectId) {
        return this.postsRepository.getPostById(_id)
            .then(post => post ? getPostViewModel(post) : null)
    }

    async createPost (body: PostInputModel) : Promise<ObjectId | null> {

        let blog = await this.blogsRepository.getBlogById( new ObjectId(body.blogId) )


        if (!blog) {
            return null
        }


        let newPost: CreatePostType = {
            title: body.title,
            shortDescription: body.shortDescription,
            content: body.content,
            blogId: body.blogId,
            blogName: blog.name || " new Name " ,
            createdAt: new Date().toISOString(),
            extendedLikesInfo: {
                likesCount: 0,
                dislikesCount: 0,
                myStatus: LikeStatusEnum.None,
                newestLikes: [
                    {
                        addedAt: new Date().toISOString(),
                        userId: string,
                        login: string
        }]
    }
        }

        return await this.postsRepository.createPost(newPost)

    }
    async updatePost (id: string, body: PostInputModel ) {

        return await this.postsRepository.updatePost( new ObjectId(id), body )
    }
    async deletePost (id: string) {
        return await this.postsRepository.deletePost( new ObjectId(id) )
    }
}
