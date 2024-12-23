import {config} from "dotenv";


config()

export const SETTINGS = {
    // все хардкодные значения должны быть здесь, для удобства их изменения
    PORT: process.env.PORT || 3003,
    logger: process.env.NODE_ENV !== 'production'
    CREDENTIAL: {
      LOGIN: 'admin',
      PASSWORD: 'qwerty',
    },
    PATH: {
        BLOGS: '/blogs',
        POSTS: '/posts',
    },
}
