import express from 'express'
import cors from 'cors'
import {SETTINGS} from "./settings";
import {blogsRouter} from "./blogs/blogs-router";
import {postsRouter} from "./posts/post-router";
import {testingRouter} from "./testing/testing-router";
import {usersRouter} from "./users/users-router";
import {authRouter} from "./auth/auth-router";
import {commentsRouter} from "./comments/comments-router";
import cookieParser from "cookie-parser";
import {sessionRouter} from "./sessions/sessions-router";

export const initApp = ()=>{

    const app = express() // создать приложение

    app.use(express.json()) // создание свойств-объектов body и query во всех реквестах
    app.use(cors())// разрешить любым фронтам делать запросы на наш бэк
    app.use(cookieParser())


    app.use(SETTINGS.PATH.BLOGS, blogsRouter)
    app.use(SETTINGS.PATH.POSTS, postsRouter)
    app.use(SETTINGS.PATH.USERS , usersRouter)
    app.use(SETTINGS.PATH.AUTH , authRouter)
    app.use(SETTINGS.PATH.TESTING, testingRouter)
    app.use(SETTINGS.PATH.COMMENTS , commentsRouter)
    app.use(SETTINGS.PATH.SESSIONS , sessionRouter)


    return appddasdas
}





