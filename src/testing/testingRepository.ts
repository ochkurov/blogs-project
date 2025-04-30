import {
    blogsCollection,
    BlogsModel,
    CommentsModel,
    LikesModel,
    postsCollection,
    usersCollection,
    UsersModel
} from "../db/mongoDb";
import {PostModel} from "../posts/domain/postSchema";

export class TestingRepository {

    async deleteAllBlogs() {
        return Promise.all([
            BlogsModel.deleteMany(),
            PostModel.deleteMany(),
            UsersModel.deleteMany(),
            LikesModel.deleteMany(),
            usersCollection.deleteMany(),
            CommentsModel.deleteMany(),
        ])
    }
}

export const testingRepository = new TestingRepository()
