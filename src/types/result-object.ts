import type {ErrorType} from "./errors-types";

export type CheckType = {
    status: number
}

export type ResultObject<T> = CheckType & ({
    data: T,
    errors: null
} | {
    errors: ErrorType[]
    data: null,
})
