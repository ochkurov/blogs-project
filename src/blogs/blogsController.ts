import {NextFunction, Request, Response} from "express";
import {BlogInputModel, BlogQueryInputType, BlogViewModel, ResponseBlogType} from "../types/blog-types";
import {BlogPaginationQueries} from "../helpers/blog_paginations_values";
import {BlogsService} from "./blogs-service";
import {PostInputModel, PostViewModel, QueryInputType} from "../types/posts-types";
import {postQueryPagingDef} from "../helpers/post_paginations_values";
import {PostsService} from "../posts/posts-service";
import {APIErrorResultType} from "../types/errors-types";


export class BlogsController {
    blogsService: BlogsService
    postsService: PostsService

    constructor() {
        this.blogsService = new BlogsService();
        this.postsService = new PostsService();
    }

    async getBlogs(
        req: Request<{}, {}, {}, BlogQueryInputType>,
        res: Response<ResponseBlogType>,
        next: NextFunction) {


        const queryData = BlogPaginationQueries(req.query)

        const blogs = await this.blogsService.getBlogs(
            queryData
        )
        res.status(200).json(blogs)

    }

    async getBlogById(req: Request<{ id: string }, {}, {}>, res: Response<BlogViewModel>) {

        const id = req.params.id;

        let currentBlog = await this.blogsService.getBlogById(id)

        console.log(currentBlog)
        if (!currentBlog) {
            res.sendStatus(404)
            return
        }

        res.status(200).json(currentBlog)

    }

    async getPostsFromBlogId(
        req: Request<{ blogId: string }, {}, {}, QueryInputType>,
        res: Response) {


        const blogId = req.params.blogId;

        const currentPosts = await this.postsService.getPostsFromBlogId(blogId, postQueryPagingDef(req.query))

        if (!currentPosts) {
            res.sendStatus(404)
            return
        }

        res.status(200).json(currentPosts)
    }

    async createBlog(
        req: Request<{}, {}, BlogInputModel>,
        res: Response<BlogViewModel | APIErrorResultType>) {

        const blogId = await this.blogsService.createBlog(req.body)
        const blog = await this.blogsService.getBlogByUUID(blogId)

        res.status(201).json(blog)

    }

    async createPostFromBlogId(
        req: Request<
            { blogId: string }, {}, PostInputModel>,
        res: Response<PostViewModel>) {

        const blogId = req.params.blogId;
        let body = {...req.body, blogId: blogId};

        let postId = await this.postsService.createPost(body);


        if (!postId) {
            res.sendStatus(404)
            return
        }

        const newPost = await this.postsService.getPostByMongoID(postId)
        if (!newPost) {
            res.sendStatus(404)
            return
        }


        res.status(201).json(newPost);

    }

    async updateBlog(
        req: Request<{ id: string }, {}, BlogInputModel>,
        res: Response<APIErrorResultType>) {
        const id = req.params.id;

        if (!id) {
            res.sendStatus(404)
            return;
        }

        const updatedBlog = await this.blogsService.updateBlog(id, req.body)

        if (!updatedBlog) {
            res.sendStatus(404)
            return;
        } else res.sendStatus(204)

    }

    async deleteBlog(
        req: Request<{ id: string }, any, any>,
        res: Response) {

        const id = req.params.id;

        if (!id) {
            res.sendStatus(404)
            return
        }

        const deleteBlog = await this.blogsService.deleteBlog(id)

        if (!deleteBlog) {
            res.sendStatus(404)
            return
        } else res.sendStatus(204)
    }
}
