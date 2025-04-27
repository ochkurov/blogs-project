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
import {CommentsQwRepository} from "./comments/commentsQwRepository";
import {CommentsRepository} from "./comments/commentsRepository";
import {PostsController} from "./posts/postsController";
import {PostsRepository} from "./posts/postsRepository";
import {SessionController} from "./sessions/sessionController";
import {SessionRepository} from "./sessions/sessionRepository";
import {SessionQwRepository} from "./sessions/sessionQwRepository";
import {TestingRepository} from "./testing/testingRepository";
import {UsersController} from "./users/usersController";
import {LikeService} from "./likes /application/like-service";
import {LikeRepository} from "./likes /dal/like-repository";
import {LikeQwRepository} from "./likes /dal/like-QwRepository";
import {PostsQwRepository} from "./posts/postsQwRepository";


const userRepository = new UsersRepository()
const userQueryRepository = new UsersQwRepository()
const postsRepository = new PostsRepository();
const postsQwRepository = new PostsQwRepository();
const blogsRepository = new BlogsRepository()
const commentsRepository = new CommentsRepository()
const commentsQwRepository = new CommentsQwRepository()
const sessionRepository = new SessionRepository()
const sessionQwRepository = new SessionQwRepository()
const likeRepository = new LikeRepository()
const likeQwRepository = new LikeQwRepository()

const usersService = new UserService(userRepository)
const authService = new AuthService(userRepository, usersService)
const likeService = new LikeService(userRepository , likeRepository, postsRepository)
const commentsService = new CommentsService(commentsRepository , userRepository , likeService)
const postsService = new PostsService(postsRepository , blogsRepository, likeService,likeQwRepository)
const blogsService = new BlogsService(blogsRepository)
const testingRepository = new TestingRepository()

const blogsController = new BlogsController(blogsService , postsService)
const commentsController = new CommentsController(commentsService, commentsRepository , commentsQwRepository)
const postsController = new PostsController(postsRepository ,postsService , commentsService , commentsQwRepository,postsQwRepository)
const sessionController = new SessionController(sessionQwRepository, sessionRepository)
const authController = new AuthController(authService, userQueryRepository);
const userController = new UsersController(userQueryRepository , usersService)

const authBearerMiddleware = new AuthBearerGuard(usersService)
const refreshTokenMiddleware = new RefreshTokenGuard(usersService)


export {
    blogsController,
    commentsController,
    postsController,
    userController,
    sessionController,
    authController,
    authBearerMiddleware,
    refreshTokenMiddleware,
}
