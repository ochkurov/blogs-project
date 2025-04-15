import {body} from "express-validator";
import {LikeStatusEnum} from "../../likes /domain/like.entity";

const contentValidate = body('content')
    .isString().withMessage('Content is required')
    .trim().notEmpty().withMessage('Content is required')
    .isLength({min: 20, max: 300}).withMessage('Content must be more than 20 symbols and less than 300')
const likeStatus = body('likeStatus').isString()
    .isIn(Object.values(LikeStatusEnum))
    .withMessage(`Status must be one of: ${Object.values(LikeStatusEnum).join(", ")}`)


export const commentCredentialsValidate = [ contentValidate , likeStatus ]
