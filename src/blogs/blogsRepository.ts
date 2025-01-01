import {blogsCollection} from "../db/mongoDb";
import {ObjectId} from "mongodb";
import {BlogInputModel, BlogViewModel} from "../types/blog-types";

export const blogsRepository = {

    async getAllBlogs() {

        return await blogsCollection.find({},{projection:{_id:0}}).toArray()
        /*return db.blogs*/
    },

    async getBlogById(id: string)  {

        return await blogsCollection.findOne({id: id} , {projection:{_id:0}});
        /*return db.blogs.find(blog => blog.id === id)*/
    },

    async getVideoByUUID(_id: ObjectId) {

        return await blogsCollection.findOne({_id} , {projection:{_id:0}})
    },

    async createBlog(newBlog: BlogViewModel): Promise<ObjectId> {

        const res = await blogsCollection.insertOne(newBlog)
        return res.insertedId


        /*
                let id: number = (Date.now() + Math.random());

                let newBlog: BlogType = {
                    id: parseInt(String(id)).toString(),
                    ...body
                }
                db.blogs = [...db.blogs, newBlog]
                return newBlog*/
    },

    async updateBlog(id: string, body: BlogInputModel): Promise<boolean> {
        const res = await blogsCollection.updateOne(
            {id},
            {$set: {...body}},
        )
        return res.matchedCount === 1

        /*const findBlog = this.getBlogById(id)

        if (!findBlog) {
            return false
        } else {
            findBlog.id = id
            findBlog.name = body.name
            findBlog.description = body.description
            findBlog.websiteUrl = body.websiteUrl
            return findBlog
        }*/
    },

    async deleteBlog(id: string) {

        const blog = await blogsCollection.findOne({ id })

        if (blog) {
            const res = await blogsCollection.deleteOne({_id: blog._id})
            if (res.deletedCount > 0) return true
        }
        return false
        /*const findBlog = db.blogs.find(blog => blog.id === id)

        if (!findBlog) {
            return false
        } else {
            db.blogs = db.blogs.filter(blog => blog.id !== id)
            return true
        }*/
    }

}
