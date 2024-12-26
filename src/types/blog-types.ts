export type BlogType = {
    id: string,
    name: string,
    description: string
    websiteUrl: string
    createdAt: string,
    isMembership: boolean
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
    errorsMessages: ErrorType[]
}

export type PostViewModel = {
    id: string
    title: string
    shortDescription: string
    content: string
    blogId: string
    blogName: string
    createdAt: string,
}
export type PostInputModel = {
    title: string,
    shortDescription: string,
    content: string,
    blogId: string,
    blogName?: string,
}
