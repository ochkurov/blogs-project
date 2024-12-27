import {body} from "express-validator";
import {blogsRepository} from "../../blogs/blogsRepository";

export const blogsBodyValidation = [
    body('name').isString().trim().notEmpty().isLength({min: 1, max: 15}),
    body('websiteUrl').isString().trim().notEmpty().matches(new RegExp('^https://([a-zA-Z0-9_-]+\.)+[a-zA-Z0-9_-]+(\/[a-zA-Z0-9_-]+)*\/?$')).isLength({
        min: 1,
        max: 100
    }).withMessage('should be string'),
    body('description').isString().trim().notEmpty().isLength({min: 1, max: 500}).withMessage('should be string'),
]

export const postBodyValidation = [
    body('title').isString().trim().trim().notEmpty().isLength({min: 1, max: 30}).withMessage('should be string'),
    body('content').isString().trim().notEmpty().isLength({min: 1, max: 1000}).withMessage('should be string'),
    body('shortDescription').isString().trim().notEmpty().isLength({min: 1, max: 100}).withMessage('should be string'),
    body('blogId').isString().withMessage('not string')
        .trim().custom(async blogId => {

        const blog = await blogsRepository.getBlogById(blogId)

        return !!blog
    }).withMessage('invalid blog Id'),
]
