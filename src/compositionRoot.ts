import {AuthController} from "./auth/authController";
import {AuthService} from "./auth/auth-service";
import {UsersQwRepository} from "./users/usersQwRepository";
import {UserService} from "./users/users-service";
import {UsersRepository} from "./users/usersRepository";
import {AuthBearerGuard} from "./auth/middlewares/authBearerMiddleware";
import {RefreshTokenGuard} from "./auth/middlewares/RefreshTokenMiddleware";
import {BlogsRepository} from "./blogs/blogsRepository";


const userRepository = new UsersRepository()
const usersService = new UserService(userRepository)
const blogsRepository = new BlogsRepository()

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
