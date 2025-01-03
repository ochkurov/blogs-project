import {blogsCollection} from "../db/mongoDb";
import {ObjectId} from "mongodb";
import {BlogInputModel, BlogViewModel} from "../types/blog-types";

export const blogsRepository = {

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
            .find(filter, {projection:{_id:0}})
            .sort({[sortBy]: sortDirection === 'asc' ? 1 : -1 })
            .skip((pageNumber - 1) * pageSize)
            .limit(pageSize)
            .toArray()


      /*  return await blogsCollection.find({},{projection:{_id:0}}).toArray()
*/
    },
    async getBlogCount (searchNameTerm: string | null):Promise<number> {
        let filter : any = {}

        if (searchNameTerm) {
            filter.name = {$regex: searchNameTerm , $options: "i" };
        }
        return await blogsCollection.countDocuments(filter)
    },

    async getBlogById(id: string): Promise<BlogViewModel | null>  {

        return await blogsCollection.findOne({id: id} , {projection:{_id:0}});

    },

    async getVideoByUUID(_id: ObjectId) {

        return await blogsCollection.findOne({_id} , {projection:{_id:0}})
    },

    async createBlog(newBlog: BlogViewModel): Promise<ObjectId> {

        const res = await blogsCollection.insertOne(newBlog)
        return res.insertedId

    },

    async updateBlog(id: string, body: BlogInputModel): Promise<boolean> {
        const res = await blogsCollection.updateOne(
            {id},
            {$set: {...body}},
        )
        return res.matchedCount === 1

    },

    async deleteBlog(id: string) {

        const blog = await blogsCollection.findOne({ id })

        if (blog) {
            const res = await blogsCollection.deleteOne({_id: blog._id})
            if (res.deletedCount > 0) return true
        }
        return false

    }

}
