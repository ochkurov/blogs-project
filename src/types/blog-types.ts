export type BlogType = {
    id: string,
    name: string,
    description: string
    websiteUrl: string
}
export type BlogInputType = {
    name: string,
    description: string,
    websiteUrl: string
}
export type ErrorType = {
    message: string,
    field: string
}

export type APIErrorResultType = {
    errorsMessages:ErrorType[]
}
