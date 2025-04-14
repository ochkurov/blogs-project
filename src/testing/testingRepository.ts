import {BlogsModel, PostsModel, usersCollection} from "../db/mongoDb";

export class TestingRepository {

    async deleteAllBlogs() {
        return await BlogsModel.deleteMany({}) ,

            await PostsModel.deleteMany({}) ,

            await usersCollection.deleteMany({})
    }
}

export const testingRepository = new TestingRepository()
