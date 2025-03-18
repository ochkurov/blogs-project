import {DbCommentType} from "../types/comment-types";
import {CommentsRepository} from "./commentsRepository";
import {UsersRepository} from "../users/usersRepository";

 export class CommentsService {
     commentsRepository: CommentsRepository
     usersRepository:UsersRepository
     constructor() {
         this.commentsRepository = new CommentsRepository();
         this.usersRepository = new UsersRepository();
     }
     async updateComment(id: string,content: string) {
         return await this.commentsRepository.updateComment(id, content);
     }
     async createComment(userId: string, postId: string, content: string) {
         const user = await this.usersRepository.getUserById(userId)
         if (!user) {
             return null
         }
         const comment: DbCommentType = {
             content: content,
             commentatorInfo: {
                 userId: userId,
                 userLogin: user.login
             },
             createdAt: new Date().toISOString(),
             postId: postId,

         }

         return await this.commentsRepository.createComment(comment);

     }
 }

