import {db} from "../db/db";
import {BlogInputType, BlogType} from "../types/blog-types";

export const blogsRepository = {
    getAllBlogs(): BlogType[] {
        return db.blogs
    },
    getBlogById(id: string): BlogType | undefined {
        return db.blogs.find(blog => blog.id === id)
    },
    createBlog(body: BlogInputType): BlogType {

        let id: number = (Date.now() + Math.random());

        let newBlog: BlogType = {
            id: parseInt(String(id)).toString(),
            ...body
        }
        db.blogs = [...db.blogs, newBlog]
        return newBlog
    },

    updateBlog (id: string, body: BlogInputType): BlogType | boolean  {
        const findBlog = this.getBlogById(id)

        if (!findBlog) {
            return false
        } else {
            findBlog.id = id
            findBlog.name = body.name
            findBlog.description = body.description
            findBlog.websiteUrl = body.websiteUrl
            return findBlog
        }
    },
    deleteBlog (id: string): boolean {
        const findBlog = db.blogs.find(blog => blog.id === id)

        if (!findBlog) {
            return false
        } else {
            db.blogs = db.blogs.filter(blog => blog.id !== id)
            return true
        }
    }

}
