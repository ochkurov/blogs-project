import {body} from "express-validator";

const loginOrEmailValidate = body('loginOrEmail')
    .isString().withMessage('Field must be string')
    .trim().notEmpty().withMessage('Field can not be empty')

const passwordValidate = body('password')
.isString().withMessage('Password must be string')
.trim().notEmpty().withMessage('Write password')

export const authValidate = [ loginOrEmailValidate , passwordValidate ]
