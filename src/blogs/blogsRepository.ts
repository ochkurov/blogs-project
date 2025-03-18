import {blogsCollection} from "../db/mongoDb";
import {ObjectId} from "mongodb";
import {BlogDbType, BlogInputModel, BlogResponseType} from "../types/blog-types";

export class BlogsRepository {
    async getAllBlogs(pageNumber:number,
                      pageSize:number,
                      sortBy:string,
                      sortDirection: 'asc' | 'desc',
                      searchNameTerm: string | null
    ) {
        let filter : any = {}

        if (searchNameTerm) {
            filter = {name: {$regex: searchNameTerm, $options: "i"}};
        }

        return await blogsCollection
            .find(filter)
            .sort({[sortBy]: sortDirection})
            .skip((pageNumber - 1) * pageSize)
            .limit(pageSize)
            .toArray()


    }
    async getBlogCount (searchNameTerm: string | null):Promise<number> {
        let filter : any = {}

        if (searchNameTerm) {
            filter.name = {$regex: searchNameTerm , $options: "i" };
        }
        return await blogsCollection.countDocuments(filter)
    }

    async getBlogById(_id: ObjectId): Promise<BlogResponseType | null>  {

        return await blogsCollection.findOne({_id} );

    }

    async getVideoByUUID(_id: ObjectId) {

        return await blogsCollection.findOne({_id} )
    }

    async createBlog(newBlog: BlogDbType): Promise<ObjectId> {

        const res = await blogsCollection.insertOne(newBlog)
        return res.insertedId

    }

    async updateBlog(_id: ObjectId, body: BlogInputModel): Promise<boolean> {
        const res = await blogsCollection.updateOne(
            {_id},
            {$set: {...body}},
        )
        return res.matchedCount === 1

    }

    async deleteBlog(_id: ObjectId) {

        const blog = await blogsCollection.findOne({ _id })

        if (blog) {
            const res = await blogsCollection.deleteOne({_id: blog._id})
            if (res.deletedCount > 0) return true
        }
        return false

    }

}
