import {blogsCollection, BlogsModel, postsCollection, usersCollection} from "../db/mongoDb";

export class TestingRepository {

    async deleteAllBlogs() {
        return await blogsCollection.deleteMany({}) ,

            await postsCollection.deleteMany({}) ,

            await usersCollection.deleteMany({})
    }
}

export const testingRepository = new TestingRepository()
