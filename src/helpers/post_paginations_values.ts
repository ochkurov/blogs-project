import {PostQueryInputType} from "../types/posts-types";


export const postQueryPagingDef = (query: PostQueryInputType): PostQueryInputType => {
    let page = query?.pageNumber ? +query.pageNumber : 1;
    // let pageSize =
    return {
        pageNumber: page >= 1 ? page : 1,
        pageSize: query?.pageSize ? +query.pageSize : 10,
        sortBy: query?.sortBy ?? 'createdAt',
        sortDirection: query?.sortDirection === 'asc' ? 'asc' : 'desc',
    }
}
