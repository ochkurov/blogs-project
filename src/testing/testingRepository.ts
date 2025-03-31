import {blogsCollection, postsCollection, usersCollection} from "../db/mongoDb";

export class TestingRepository {

    async deleteAllBlogs() {
        return await blogsCollection.deleteMany({}) ,

            postsCollection.deleteMany({}) ,

            usersCollection.deleteMany({})
    }
}

export const testingRepository = new TestingRepository()
