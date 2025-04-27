import {Request, Response} from "express";
import {PostInputModel, PostViewModel, QueryInputType, ResponsePostsType} from "../types/posts-types";
import {CommentResponseType, CommentsViewModel} from "../types/comment-types";
import {postQueryPagingDef} from "../helpers/post_paginations_values";
import {ObjectId} from "mongodb";
import {CommentsQwRepository} from "../comments/commentsQwRepository";
import {PostsRepository} from "./postsRepository";
import {sortType} from "../types/sort-types";
import {PostsService} from "./posts-service";
import {APIErrorResultType} from "../types/errors-types";
import {CommentsService} from "../comments/comments-service";
import {LikeStatusEnum} from "../likes /domain/like.entity";
import {PostsQwRepository} from "./postsQwRepository";


export class PostsController {
    constructor(private postsRepository: PostsRepository,
                private postsService: PostsService,
                private commentsService: CommentsService,
                private commentsQwRepository: CommentsQwRepository,
                private postsQwRepository: PostsQwRepository
    ) {
    }

    async getCommentsByPostId(req: Request<{ id: string }, {}, {}, QueryInputType>,
                              res: Response<CommentResponseType>) {

        const userId = req.user!._id.toString()
        const postId = req.params.id;
        const query = req.query

        const commentQuery: QueryInputType = postQueryPagingDef(query)

        if (!postId) {
            res.sendStatus(404)
            return
        }
        if (!ObjectId.isValid(postId)) {
            res.sendStatus(404)
            return
        }

        const foundPost = await this.postsRepository.getPostById(new ObjectId(postId));

        if (!foundPost) {
            res.sendStatus(404)
            return
        }

        const sortiredComments = await this.commentsQwRepository.getCommentsByPostId(postId, commentQuery, userId);

        if (!sortiredComments) {
            res.sendStatus(404)
            return
        }

        res.status(200).json(sortiredComments)
    }

    async getPosts(
        req: Request<{}, {}, {}, QueryInputType>,
        res: Response<ResponsePostsType>) {
        const {pageNumber, pageSize, sortBy, sortDirection} = postQueryPagingDef(req.query)
        const userId = req.user!._id.toString()

        const sortData: sortType = {
            pageNumber,
            pageSize,
            sortBy,
            sortDirection,
        }
        const posts = await this.postsQwRepository.getAllPosts(sortData , undefined ,userId)
        res.status(200).json(posts)
    }

    async getPostById(
        req: Request<{ id: string }, {}, {}>,
        res: Response<PostViewModel>) {

        const userId = req.user!._id.toString()
        const id = req.params.id;
        const currentPost = await this.postsQwRepository.getPostById(id , userId)

        if (!currentPost) {
            res.sendStatus(404)
            return
        }

        res.status(200).json(currentPost)

    }

    async createPost(
        req: Request<{}, {}, PostInputModel>,
        res: Response<PostViewModel | APIErrorResultType>
    ) {

        const userId = req.user!._id.toString()
        const postId = await this.postsService.createPost(req.body)

        if (!postId) {
            res.sendStatus(404)
            return
        }

        const newPost = await this.postsQwRepository.getPostById(postId.toString() , userId)

        if (!newPost) {
            res.sendStatus(404)
            return
        }


        res.status(201).json(newPost)

    }

    async createCommentByPostId(
        req: Request<{ id: string }, {}, { content: string }>,
        res: Response<CommentsViewModel>
    ) {

        const userId = req.user!._id.toString()
        const postId = req.params.id
        const content = req.body.content

        if (!postId || !ObjectId.isValid(postId)) {
            res.sendStatus(404)
            return;
        }

        const foundPost = await this.postsRepository.getPostById(new ObjectId(postId));

        if (!foundPost) {
            res.sendStatus(404)
            return
        }

        const commentId = await this.commentsService.createComment(userId, postId, content)

        if (!commentId) {
            res.sendStatus(500)
            return
        }

        const comment = await this.commentsQwRepository.getCommentById(commentId, userId)
        if (!comment) {
            res.sendStatus(500)
            return
        }

        const commentForResponse: CommentsViewModel = {
            id: comment.id.toString(),
            content: comment.content,
            commentatorInfo: {
                userId: comment.commentatorInfo.userId,
                userLogin: comment.commentatorInfo.userLogin
            },
            createdAt: comment.createdAt,
            likesInfo: {
                likesCount: 0,
                dislikesCount: 0,
                myStatus: LikeStatusEnum.None
            }

        }
        res.status(201).json(commentForResponse)

    }

    async updatePost(
        req: Request<{ id: string }, {}, PostInputModel>,
        res: Response<APIErrorResultType>) {
        const id = req.params.id

        if (!id.trim()) {
            res.sendStatus(404)
            return
        }

        const updatedPost = await this.postsService.updatePost(id, req.body)

        if (!updatedPost) {
            res.sendStatus(404)
            return
        } else res.sendStatus(204)
    }

    async deletePost(
        req: Request<{ id: string }, any, any>,
        res: Response) {
        const id = req.params.id;

        if (!id) {
            res.sendStatus(404)
            return
        }
        const deletePost = await this.postsService.deletePost(id)

        if (!deletePost) {
            res.sendStatus(404)
            return
        } else res.sendStatus(204)
    }

    async updateLikeStatus(req: Request<{ id: string }, any, { likeStatus: LikeStatusEnum }>, res: Response) {
        const postId = req.params.id
        const likeStatus = req.body.likeStatus
        const userId = req.user!._id.toString();
        if (!postId) {
            res.sendStatus(404)
            return
        }
        if (!userId) {
            res.sendStatus(404)
            return
        }
        const result = await this.postsService.updateLikeStatus(postId, likeStatus, userId)
        res.sendStatus(result.status)
        return
    }
}

