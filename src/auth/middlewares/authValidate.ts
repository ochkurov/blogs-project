import {body} from "express-validator";

const loginOrEmailValidate = body('loginOrEmail')
    .isString().withMessage('Field must be string')
    .trim().notEmpty().withMessage('Field can not be empty')

const passwordValidate = body('password')
.isString().withMessage('Password must be string')
.trim().notEmpty().withMessage('Write password')

export const authValidate = [ loginOrEmailValidate , passwordValidate ]

const confirmationCodeValidate = body('code')
    .isString().withMessage("filed to be string")
    .trim().notEmpty().withMessage("field is empty")
    .matches(/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i)
