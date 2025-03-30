import {AuthController} from "./auth/authController";
import {AuthService} from "./auth/auth-service";
import {UsersQwRepository} from "./users/usersQwRepository";
import {UserService} from "./users/users-service";
import {UsersRepository} from "./users/usersRepository";
import {AuthBearerGuard} from "./auth/middlewares/authBearerMiddleware";
import {RefreshTokenGuard} from "./auth/middlewares/RefreshTokenMiddleware";
import {BlogsRepository} from "./blogs/blogsRepository";
import {BlogsController} from "./blogs/blogsController";
import {PostsService} from "./posts/posts-service";
import {BlogsService} from "./blogs/blogs-service";
import {CommentsController} from "./comments/commentsController";
import {CommentsService} from "./comments/comments-service";
import {CommentsRepository} from "./comments/commentsRepository";
import {CommentsQwRepository} from "./comments/commentsQwRepository";


const userRepository = new UsersRepository()
const usersService = new UserService(userRepository)
const blogsRepository = new BlogsRepository()
const postsService = new PostsService()
const commentsRepository = new CommentsRepository()
const commentsQwRepository = new CommentsQwRepository()
const commentsService = new CommentsService(commentsRepository , userRepository)

const blogsService = new BlogsService(blogsRepository)
const blogsController = new BlogsController(blogsService , postsService)
const commentsController = new CommentsController(commentsService, commentsRepository , commentsQwRepository)
const userQueryRepository = new UsersQwRepository()
const authService = new AuthService(userRepository, usersService)
const authController = new AuthController(authService, userQueryRepository);
const authBearerMiddleware = new AuthBearerGuard(usersService)
const refreshTokenMiddleware = new RefreshTokenGuard(usersService)


export {
    authController,
    authBearerMiddleware,
    refreshTokenMiddleware,
}
