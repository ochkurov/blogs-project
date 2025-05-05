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
        AUTH: '/auth',
        TESTING: '/testing',
        COMMENTS: '/comments',
        SESSIONS: '/security',
    },
    DB_COLLECTION_NAME: {
        BLOGS: 'blogs',
        POSTS: 'posts',
        USERS: 'users',
        COMMENTS: 'comments',
        TOKEN: 'token',
        RATE: 'rate',
        LIKES: 'likes',
    },

    MONGO_URL: process.env.MONGO_URL || 'mongodb://0.0.0.0:27017',
    DB_NAME: process.env.DB_NAME || 'test',
    JWT_SECRET: process.env.JWT_SECRET||"123",
    REFRESH_SECRET: process.env.REFRESH_SECRET || "321",
    EMAIL_PASSWORD: process.env.EMAIL_PASSWORD,
}
