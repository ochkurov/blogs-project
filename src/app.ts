import express from 'express'
import cors from 'cors'
import {SETTINGS} from "./settings";
import {db} from "./db/db";
import {blogsRouter} from "./blogs/blogs-router";
import {postsRouter} from "./posts/post-router";

export const initApp = ()=>{
    const app = express() // создать приложение
    app.use(express.json()) // создание свойств-объектов body и query во всех реквестах
    app.use(cors()) // разрешить любым фронтам делать запросы на наш бэк

    app.use(SETTINGS.PATH.BLOGS, blogsRouter)
    app.use(SETTINGS.PATH.POSTS, postsRouter)

    return app
}





