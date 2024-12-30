export type ErrorType = {
    message: string,
    field: string
}

export type APIErrorResultType = {
    errorsMessages: ErrorType[]
}
