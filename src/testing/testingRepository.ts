import {blogsCollection, postsCollection, usersCollection} from "../db/mongoDb";

export const testingRepository = {
    async deleteAllBlogs() {
        return await blogsCollection.deleteMany({}) ,

            postsCollection.deleteMany({}) ,

            usersCollection.deleteMany({})
    }
}
