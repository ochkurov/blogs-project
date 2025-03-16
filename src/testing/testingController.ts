import {Request, Response} from "express";
import {testingRepository} from "./testingRepository";

// ??

export const testingController = async (
    req: Request,
    res: Response) => {

    const deleteAllData = await testingRepository.deleteAllBlogs()
    res.sendStatus(204);


}
