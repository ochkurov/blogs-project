import {SETTINGS} from "../settings";
import {MongoClient} from "mongodb";
import type {Collection} from 'mongodb'
import {SessionType} from "../sessions/types/session-types";
import mongoose, {HydratedDocument, Schema} from "mongoose";
import {BlogDbType} from "../types/blog-types";
import {CreatePostType} from "../types/posts-types";
import {UserCreateTypeModel, UsersSchemaType} from "../types/users-types";
import {IComment} from "../types/comment-types";
import {ILike, LikeStatusEnum} from "../likes /domain/like.entity";


export let deviceCollection: Collection<SessionType>
export let countRequestsCollection: Collection<any>
export let usersCollection: Collection<any>
export let postsCollection: Collection<any>
export let blogsCollection: Collection<any>

const BlogsSchema = new mongoose.Schema<BlogDbType>({
    name: { type:String , required:true},
    description: { type:String , required:true},
    websiteUrl: { type:String , required:true},
    createdAt: { type:String , required:true},
    isMembership: { type: Boolean , required:true}
})
export const BlogsModel = mongoose.model(SETTINGS.DB_COLLECTION_NAME.BLOGS, BlogsSchema)

const PostsSchema = new mongoose.Schema<CreatePostType>({
    title: { type:String, required:true},
    shortDescription: { type:String, required:true},
    content: { type:String, required:true},
    blogId: { type:String, required:true},
    blogName: { type:String, required:true},
    createdAt: { type:String, required:true},
})


const UsersSchema = new mongoose.Schema<UsersSchemaType>({
    accountData: {
        login: { type:String, required:true},
        email: { type:String, required:true},
        passwordHash: { type:String, required:true},
        createdAt: { type:String, required:true},
    },
    emailConfirmation: {
        confirmationCode: { type:String , required:true},
        expirationDate: { type:Date , required:true},
        isConfirmed: { type:Boolean , required:true},
    },
    passwordRecovery: {
        recoveryCode: { type:String , default: null},
        expirationDate: { type:Date , required:true},
        isConfirmed: { type:Boolean , required:true}
    }
})

export const UsersModel =  mongoose.model(SETTINGS.DB_COLLECTION_NAME.USERS, UsersSchema)

const CommentsSchema = new mongoose.Schema<IComment>({
    content: { type:String, required:true},
    createdAt: { type:String, required:true},
    postId: { type:String, required:true},
    commentatorInfo: {
        userId: { type:String, required:true},
        userLogin: { type:String, required:true},
    },
    likesInfo: {
        likesCount: { type:Number , required:true},
        dislikesCount: { type:Number , required:true},
    }
})

export const CommentsModel = mongoose.model(SETTINGS.DB_COLLECTION_NAME.COMMENTS, CommentsSchema)
export type CommentDocument = HydratedDocument<IComment>

const LikesSchema = new mongoose.Schema<ILike>({
    status: {
        type: String,
        enum: Object.values(LikeStatusEnum),
        required: true
    },
    userId: {type: Schema.Types.ObjectId, required: true},
    authorName: {type: String, required: true},
    parentId: {type: Schema.Types.ObjectId, required: true},
})

export const LikesModel = mongoose.model(SETTINGS.DB_COLLECTION_NAME.LIKES, LikesSchema)

export async function runDb(url: string): Promise<boolean> {
    let client = new MongoClient(url)
    let db = client.db(SETTINGS.DB_NAME)


    deviceCollection = db.collection<SessionType>(SETTINGS.DB_COLLECTION_NAME.TOKEN)
    countRequestsCollection = db.collection<any>(SETTINGS.DB_COLLECTION_NAME.RATE)
    usersCollection = db.collection<any>(SETTINGS.DB_COLLECTION_NAME.USERS)
    postsCollection = db.collection<any>(SETTINGS.DB_COLLECTION_NAME.POSTS)
    blogsCollection = db.collection<any>(SETTINGS.DB_COLLECTION_NAME.BLOGS)


    try {
        await mongoose.connect(url);
        if (mongoose.connection.readyState !== 1) {
            throw new Error('Error connecting to MongoDB')
        }
        console.log('connected to db')
        return true
    } catch (err) {
        console.error(err);
        await mongoose.disconnect();
        return false;
    }
}
