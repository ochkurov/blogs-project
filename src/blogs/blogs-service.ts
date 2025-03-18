import {BlogDbType, BlogInputModel, BlogQueryInputType, BlogViewModel, ResponseBlogType} from "../types/blog-types";
import {ObjectId} from "mongodb";
import {getBlogViewModel} from "./output/getBlogViewModel";
import {CreateBlog} from "./dtos/createBlog";
import {BlogsRepository} from "./blogsRepository";


class BlogsService {
    blogsRepository: BlogsRepository
    constructor() {
        this.blogsRepository = new BlogsRepository();
    }

    async getBlogs(
        query: BlogQueryInputType
    ): Promise<ResponseBlogType> {

        const { pageNumber, pageSize, sortBy, sortDirection, searchNameTerm } = query

        const blogs = await this.blogsRepository.getAllBlogs(
            pageNumber,
            pageSize,
            sortBy,
            sortDirection,
            searchNameTerm,
        )
        const mappedBlogs  = blogs.map(getBlogViewModel)

        const blogsCount = await this.blogsRepository.getBlogCount(searchNameTerm)

        return {
            pagesCount: Math.ceil(blogsCount / pageSize),
            page: pageNumber,
            pageSize,
            totalCount: blogsCount,
            items: mappedBlogs
        }

    }
    async getBlogById(id: string) {
        return this.blogsRepository.getBlogById( new ObjectId( id ) )
            .then( foundBlog => {
                if( foundBlog ) {
                    return getBlogViewModel(foundBlog)
                }
                return null
            })
    }

    async getBlogByUUID(id: ObjectId): Promise<BlogViewModel> {
        return  this.blogsRepository.getVideoByUUID(id)
            .then(getBlogViewModel)
    }

    async createBlog(body: BlogInputModel): Promise<ObjectId> {
        const newBlog: BlogDbType = new CreateBlog(body.name , body.description , body.websiteUrl)

        return await this.blogsRepository.createBlog(newBlog) // данный запрос возвращается нам айдишку блога в виде insertedId

    }
    async updateBlog(id: string, body: BlogInputModel) {
        return await this.blogsRepository.updateBlog(new ObjectId( id ), body)
    }
    async deleteBlog(id: string) {
        return await this.blogsRepository.deleteBlog(new ObjectId( id ))
    }
}

export const blogsService = new BlogsService()
