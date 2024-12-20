import {Router, Request, Response} from "express";

export const postsRouter = Router();

const postsController = {
    getPosts(req:Request, res:Request) {
    },
    getPostsById() {
    },
    addPost(req:Request, res:Request) {
    },
    updatePost(req:Request, res:Request) {
    },
    deletePost(req:Request, res:Request) {
    }
}

postsRouter.get('/', postsController.getPosts)
postsRouter.get('/:id', postsController.getPostsById)
postsRouter.post('/', postsController.addPost)
postsRouter.put('/:id', postsController.updatePost)
postsRouter.delete('/:id', postsController.deletePost)
