import {BlogViewModel} from "../types/blog-types";
import {PostViewModel} from "../types/posts-types";

export type DBType = {
    blogs: BlogViewModel[] ,
    posts: PostViewModel[]
}

export const db: DBType = {
    blogs: [] ,
    posts: []
}
