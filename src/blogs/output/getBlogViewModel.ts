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
