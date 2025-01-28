import {blogsRepository} from "./blogsRepository";
import {BlogDbType, BlogInputModel, BlogQueryInputType, BlogViewModel, ResponseBlogType} from "../types/blog-types";
import {ObjectId} from "mongodb";
import {getBlogViewModel} from "./output/getBlogViewModel";

export const blogsService = {
    async getBlogs(
        query: BlogQueryInputType
    ): Promise<ResponseBlogType> {

        const { pageNumber, pageSize, sortBy, sortDirection, searchNameTerm } = query

        const blogs = await blogsRepository.getAllBlogs(
            pageNumber,
            pageSize,
            sortBy,
            sortDirection,
            searchNameTerm,
        )
        const mappedBlogs = blogs.map(getBlogViewModel)

        const blogsCount = await blogsRepository.getBlogCount(searchNameTerm)

        return {
            pagesCount: Math.ceil(blogsCount / pageSize),
            page: pageNumber,
            pageSize,
            totalCount: blogsCount,
            items: mappedBlogs
        }

    },
    async getBlogById(id: string) {
        return blogsRepository.getBlogById( new ObjectId( id ) )
            .then( foundBlog => {
                if( foundBlog ) {
                    return getBlogViewModel(foundBlog)
                }
                return null
            })
    },

    async getBlogByUUID(id: ObjectId): Promise<BlogViewModel> {
        return  blogsRepository.getVideoByUUID(id)
            .then(getBlogViewModel)
    },

    async createBlog(body: BlogInputModel): Promise<ObjectId> {
        const newBlog: BlogDbType = {
            name: body.name,
            description: body.description,
            websiteUrl: body.websiteUrl,
            createdAt: new Date().toISOString(),
            isMembership: false
        }

        return await blogsRepository.createBlog(newBlog) // данный запрос возвращается нам айдишку блога в виде insertedId

    },
    async updateBlog(id: string, body: BlogInputModel) {
        return await blogsRepository.updateBlog(new ObjectId( id ), body)
    },
    async deleteBlog(id: string) {
        return await blogsRepository.deleteBlog(new ObjectId( id ))
    }
}
