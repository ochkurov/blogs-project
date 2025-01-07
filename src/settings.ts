import {config} from "dotenv";
import dotenv from 'dotenv'

dotenv.config()
config()




export const SETTINGS = {

    PORT: process.env.PORT || 3003,

    CREDENTIAL: {
      LOGIN: 'admin',
      PASSWORD: 'qwerty',
    },
    PATH: {
        BLOGS: '/blogs',
        POSTS: '/posts',
        USERS: '/users',
        TESTING: '/testing',
    },
    MONGO_URL: process.env.MONGO_URL || 'mongodb://0.0.0.0:27017',
    DB_NAME: process.env.DB_NAME || 'test'
}
