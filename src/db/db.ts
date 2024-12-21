import {BlogType, PostViewModel} from "../types/blog-types";

export type DBType = {
    blogs: any[] ,
    posts: any[]
}

export const db: DBType = {
    blogs: [] ,
    posts: []
}
