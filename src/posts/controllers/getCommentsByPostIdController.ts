import {Request} from "express";
import {QueryInputType} from "../../types/posts-types";

export const getCommentsByPostIdController = async (req:Request<{id:string},{},{},QueryInputType>,
                                                    res:Response<>
                                                    ) => {

}
