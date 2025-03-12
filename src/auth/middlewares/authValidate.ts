import {body} from "express-validator";

const loginOrEmailValidate = body('loginOrEmail')
    .isString().withMessage('Field must be string')
    .trim().notEmpty().withMessage('Field can not be empty')

const passwordValidate = body('password')
.isString().withMessage('Password must be string')
.trim().notEmpty().withMessage('Write password')

export const authValidate = [ loginOrEmailValidate , passwordValidate ]

export const recoveryCodeValidate = body('recoveryCode')
    .isString().withMessage("filed to be string")
    .trim().notEmpty().withMessage("field is empty")
    .matches(/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i)

export const newPasswordValidate = body('newPassword')
    .isString().withMessage("filed to be string")
    .trim().notEmpty().withMessage("field is empty")
    .isLength({min: 6, max: 20}).withMessage("field to be contain min 6 and max 20 symbols")


