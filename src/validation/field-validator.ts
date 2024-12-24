import {body} from "express-validator";

export const BlogsBodyValidation = [
    body('name').isString().trim().notEmpty().isLength({min:1 , max:15}).withMessage('should be string'),
    body('websiteUrl').isString().trim().notEmpty().matches(new RegExp('^https://([a-zA-Z0-9_-]+\.)+[a-zA-Z0-9_-]+(\/[a-zA-Z0-9_-]+)*\/?$')).isLength({min:1 , max:500}).withMessage('should be string'),
    body('description').isString().trim().notEmpty().isLength({min:1 , max:100}).withMessage('should be string'),
]

export const PostBodyValidation = [
    body('title').isString().trim().trim().notEmpty().isLength({min:1 , max:30}).withMessage('should be string'),
    body('shortDescription').isString().trim().notEmpty().isLength({min:1 , max:100}).withMessage('should be string'),
    body('content').isString().trim().notEmpty().isLength({min:1 , max:1000}).withMessage('should be string'),
    body('blogId').isString().trim().notEmpty().withMessage('should be string'),
]
export const descriptionValidator = (description: string, errorsArray: Array<{ field: string, message: string }>) => {

    if (!description) {
        errorsArray.push({field: 'description', message: 'add description'})
    }
    if (description && description.trim().length < 1) {
        errorsArray.push({field: 'description', message: 'add description '})
    }
    if (description && description.trim().length > 500) {
        errorsArray.push({field: 'description', message: 'name cannot be more than 500 symbols'})
    }
}

export const websiteURLValidator = (websiteUrl: string, errorsArray: Array<{ field: string, message: string }>) => {
    const RegExpDate = new RegExp('^https://([a-zA-Z0-9_-]+\.)+[a-zA-Z0-9_-]+(\/[a-zA-Z0-9_-]+)*\/?$');

    if (!websiteUrl || typeof websiteUrl !== 'string' || !RegExpDate.test(websiteUrl)) {
        errorsArray.push({field: 'websiteUrl', message: 'add websiteUrl'})
    }
    if (websiteUrl && websiteUrl.trim().length < 1) {
        errorsArray.push({field: 'websiteUrl', message: 'add websiteUrl '})
    }
    if (websiteUrl && websiteUrl.trim().length > 100) {
        errorsArray.push({field: 'websiteUrl', message: 'websiteUrl cannot be more than 500 symbols'})
    }

}

export const titleValidator = (title: string,
                               errorsArray: Array<{ field: string, message: string }>) => {
    if (!title) {
        errorsArray.push({field: 'title', message: 'no title'});
    }
    if (title && title.trim().length > 30) {
        errorsArray.push({
            field: 'title',
            message: 'more than 30 symbols'
        });
    }
    if (title && title.trim().length < 1) {
        errorsArray.push({
            field: 'title',
            message: 'add title'
        });
    }
}

export const shortDescriptionValidator = (shortDescription: string, errorsArray: Array<{
    field: string,
    message: string
}>) => {
    if (!shortDescription) {
        errorsArray.push({field: 'shortDescription', message: 'add description'});
    }
    if (shortDescription && shortDescription.trim().length < 1) {
        errorsArray.push({field: 'shortDescription', message: 'add description '})
    }
    if (shortDescription && shortDescription.trim().length > 100) {
        errorsArray.push({field: 'shortDescription', message: 'description cannot be more than 100 symbols'})
    }
}

export const contentValidator = (content: string, errorsArray: Array<{ field: string, message: string }>) => {
    if (!content) {
        errorsArray.push({field: 'content', message: 'add content'});
    }
    if (content && content.trim().length < 1) {
        errorsArray.push({field: 'content', message: 'add content '})
    }
    if (content && content.trim().length > 1000) {
        errorsArray.push({field: 'content', message: 'max legnth content cannot be more than 1000 symbols'});
    }
}

export const blogIdValidator = (blogId: string, errorsArray: Array<{ field: string, message: string }>) => {
    if (!blogId) {
        errorsArray.push({field: 'blogId', message: 'add BlogId'})
    }
}
