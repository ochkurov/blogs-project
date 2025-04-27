import {PostInputModel, PostViewModel, ResponsePostsType} from "../types/posts-types";
import {ObjectId} from "mongodb";
import {sortType} from "../types/sort-types";
import {PostsRepository} from "./postsRepository";
import {BlogsRepository} from "../blogs/blogsRepository";
import {getPostViewModel} from "./output/getPostViewModel";
import {LikeStatusEnum} from "../likes /domain/like.entity";
import {PostMapper} from "./mapper /PostMapper";
import {PostModel} from "./domain/postSchema";
import {LikeService} from "../likes /application/like-service";
import {LikeQwRepository} from "../likes /dal/like-QwRepository";
import {IPostNewestLikes} from "./domain/post-types";


export class PostsService {

    constructor(private postsRepository: PostsRepository,
                private blogsRepository: BlogsRepository,
                private likeService: LikeService,
            private likeQwRepository: LikeQwRepository
    ) {

    }

/*
    async getAllPosts(sortData: sortType , userId:string): Promise<ResponsePostsType> {
        const {pageNumber, pageSize, sortBy, sortDirection} = sortData

        const posts = await this.postsRepository.getAllPosts(sortData , userId)

        const postsCount = await this.postsRepository.getPostsCount()
        const mappedPosts = posts.map(getPostViewModel)

        return {
            pagesCount: Math.ceil(postsCount / pageSize),
            page: pageNumber,
            pageSize,
            totalCount: postsCount,
            items: mappedPosts
        }
    }
*/

    async getPostsFromBlogId(blogId: string, sortData: sortType) {

        const {pageNumber, pageSize, sortBy, sortDirection} = sortData

        const posts = await this.postsRepository.getPostsByBlogId(blogId, sortData)
        if (posts.length < 1) return null

        const postsCount = await this.postsRepository.getPostsCountById(blogId)
        const mappedPosts = posts.map(getPostViewModel)

        return {
            pagesCount: Math.ceil(postsCount / pageSize),
            page: pageNumber,
            pageSize,
            totalCount: postsCount,
            items: mappedPosts
        }

    }

    async getPostById(id: string): Promise<PostViewModel | null> {
        return this.postsRepository.getPostById(new ObjectId(id))
            .then(post => post ? getPostViewModel(post) : null)
    }

    async getPostByMongoID(_id: ObjectId) {
        return this.postsRepository.getPostById(_id)
            .then(post => post ? getPostViewModel(post) : null)
    }

    async createPost(body: PostInputModel): Promise<ObjectId | null> {

        let blog = await this.blogsRepository.getBlogById(new ObjectId(body.blogId))


        if (!blog) {
            return null
        }
        const newPost = PostMapper.makePostDTO(body, blog.name)
        const post = PostModel.makeInstanse(newPost)
        const result = await this.postsRepository.save(post)
        return result._id
    }

    async updateLikeStatus(parentId: string, likeStatus: LikeStatusEnum, userId: string) {
        const post = await PostModel.findById({_id: new ObjectId(parentId)})
        if (!post) {
            return {
                status: 404,
                errors: [],
                data: null
            }
        }
        const updateLike = await this.likeService.setLikeStatusByPost(post , likeStatus , userId)
        if (updateLike.status === 401 || updateLike.status === 404) {
            return {
                status: updateLike.status,
                errors: [],
                data: null
            }
        }
        const newestLikes:IPostNewestLikes[] = await this.likeQwRepository.getNewestLikesByParentId(post._id.toString() , 3)
        post.setLikesInfo(newestLikes) //тут может быть ошибка
        await this.postsRepository.save(post)
        return {
            status: updateLike.status,
            errors: updateLike.errors,
            data: updateLike.data
        }
    }

    async updatePost(id: string, body: PostInputModel) {

        return await this.postsRepository.updatePost(new ObjectId(id), body)
    }

    async deletePost(id: string) {
        return await this.postsRepository.deletePost(new ObjectId(id))
    }
}
