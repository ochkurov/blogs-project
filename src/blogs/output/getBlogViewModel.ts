import {ObjectId} from "mongodb";
import {BlogResponseType, BlogViewModel} from "../../types/blog-types";

export const getBlogViewModel = (blog: BlogResponseType ): BlogViewModel => {
    return {
        id: blog._id!.toString(),
        name: blog.name,
        description: blog.description,
        websiteUrl: blog.websiteUrl,
        createdAt: blog.createdAt,
        isMembership: blog.isMembership
    }
}
/*
export class GetBlogViewModel {
    id: string
    name: string
    description: string
    websiteUrl: string
    createdAt: string
    isMembership: boolean

    constructor(_id: ObjectId,
                name: string,
                description: string,
                websiteUrl: string,
                createdAt: string,
                isMembership: boolean) {

        this.id = _id.toString()
        this.name = name
        this.description = description
        this.websiteUrl = websiteUrl
        this.createdAt = createdAt
        this.isMembership = isMembership
    }
}
*/
