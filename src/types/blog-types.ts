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

export type ResponseBlogType = {
    pagesCount: number,
    page: number ,
    pageSize: number,
    totalCount: number,
    items: BlogType[]
}


