import express from 'express'
import cors from 'cors'
import {SETTINGS} from "./settings";
import {db} from "./db/db";
import {blogsRouter} from "./blogs";
import {postsRouter} from "./posts";

export const app = express() // создать приложение
app.use(express.json()) // создание свойств-объектов body и query во всех реквестах
app.use(cors()) // разрешить любым фронтам делать запросы на наш бэк

app.get('/', (req, res) => {
    // эндпоинт, который будет показывать на верселе какая версия бэкэнда сейчас залита
    res.status(200).json({version: '1.0'})
})
app.delete('/testing/all-data', (req, res) => {
    db.posts = []
    db.blogs
    res.sendStatus(204)
})

app.use(SETTINGS.PATH.BLOGS, blogsRouter)
app.use(SETTINGS.PATH.POSTS, postsRouter)
