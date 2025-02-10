import {body} from "express-validator";


const loginValidate = body('login')
    .isString().withMessage('Must be string')
    .trim().notEmpty().withMessage('Login is required')
    .isLength({min: 3, max: 10}).withMessage('Login must be more than 3 symbols and less than 10')
    .matches(/^[a-zA-Z0-9_-]*$/).withMessage('Login must contain only letters, numbers, underscores, or dashes');

const emailValidate = body('email')
    .trim().notEmpty().withMessage('Email is required')
    .isEmail().withMessage("Invalid email format. Example: example@example.com")

const passwordValidate = body('password')
    .isString().withMessage('Password is required')
    .trim().notEmpty().withMessage('Password is required')
    .isLength({min: 6, max: 20}).withMessage('Password must be more than 6 symbols and less than 20')

export const userCredentialsValidate = [loginValidate, emailValidate, passwordValidate]
export const confirmationCodeValidate = body('code')
.isString().withMessage('Confirm Code Must be string')
    .trim().notEmpty().withMessage('Confirm Code is required')
    .matches(/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i)
