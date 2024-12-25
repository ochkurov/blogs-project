import {BlogType, PostViewModel} from "../types/blog-types";

export type DBType = {
    blogs: BlogType[] ,
    posts: PostViewModel[]
}

export const db: DBType = {
    blogs: [] ,
    posts: []
}
