import {postsCollection} from "../db/mongoDb";
import {ObjectId} from "mongodb";
import {blogsRepository} from "../blogs/blogsRepository";
import {BlogViewModel} from "../types/blog-types";
import {PostInputModel, PostViewModel} from "../types/posts-types";

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


        return await postsCollection.insertOne(newPost)


        /* const blogId = body.blogId
         const findedBlog = db.blogs.find(blog => blog.id === blogId);

         let id: number = (Date.now() + Math.random())

         let newPost: PostViewModel = {
             id: parseInt(String(id)).toString(),
             title: body.title,
             shortDescription: body.shortDescription,
             content: body.content,
             blogId,
             blogName: findedBlog!.name
         }
         db.posts = [...db.posts, newPost]
         return newPost*/
    },
    async updatePost(id: string, body: PostInputModel): Promise<boolean> {

        const res = await postsCollection.updateOne(
            { id },
            {$set: {...body}}
        )
        return res.matchedCount === 1

        /* const blogId = body.blogId
         const findedBlog = db.blogs.find(blog => blog.id === blogId);
         const updatedPost = db.posts.find(post => post.id === id)

         if (!updatedPost) {

             return false

         } else {

             updatedPost.id = id
             updatedPost.title = body.title
             updatedPost.shortDescription = body.shortDescription
             updatedPost.content = body.content
             updatedPost.blogId = blogId
             updatedPost.blogName = findedBlog!.name
             return updatedPost
         }*/

    },
    async deletePost(id: string) {

        const post = await postsCollection.findOne({ id })
        if (post) {
            const res = await postsCollection.deleteOne({_id: post._id})
            if ( res.deletedCount > 0) return true
        }
        return false

    }
        /*const findPost = this.getPostById(id)
        if (!findPost) {
            return false
        } else {
            db.posts = db.posts.filter(post => post.id !== id)
            return true
        }

    }*/
    }
