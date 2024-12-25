import {PostInputModel, PostViewModel} from "../types/blog-types";
import {db} from "../db/db";

export const postsRepository = {
    getAllPosts(): PostViewModel[] {
        return db.posts
    },
    getPostById(id: string) {
        return db.posts.find(post => post.id === id);
    },
    createPost(body: PostInputModel): PostViewModel {

        const blogId = body.blogId
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
        return newPost
    },
    updatePost(id: string, body: PostInputModel) : boolean | PostViewModel {

        const blogId = body.blogId
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
        }

    },
    deletePost(id: string) {

    }
}
