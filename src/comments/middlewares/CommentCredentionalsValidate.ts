import {body} from "express-validator";

const contentValidate = body('content')
    .isString().withMessage('Content is required')
    .trim().notEmpty().withMessage('Content is required')
    .isLength({min: 20, max: 300}).withMessage('Content must be more than 20 symbols and less than 300')

export const commentCredentialsValidate = [ contentValidate ]
