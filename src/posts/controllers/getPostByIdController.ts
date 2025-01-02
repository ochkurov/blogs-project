import {Request, Response} from "express";
import {PostViewModel, ResponsePostsType} from "../../types/posts-types";
import {postsService} from "../posts-service";
import {paginationQueries} from "../../helpers/paginations_values";
import {sortType} from "../../types/sort-types";

export const getPostByIdController = async (
    req: Request<{ id: string }, {}, {}>,
    res: Response<ResponsePostsType>) => {
    const { pageNumber , pageSize , sortBy , sortDirection } = paginationQueries(req)

    const sortData:sortType = {
        pageNumber ,
        pageSize,
        sortBy,
        sortDirection,
    }

    const id = req.params.id;
    const currentPost = await postsService.getPostsFromBlogId(id , sortData)

    if (!currentPost) {
        res.sendStatus(404)
        return
    }

    res.status(200).json(currentPost)

}
