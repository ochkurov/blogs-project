import {SETTINGS} from "../settings";
import {MongoClient} from "mongodb";
import type {Collection} from 'mongodb'
import {SessionType} from "../sessions/types/session-types";
import mongoose from "mongoose";
import {BlogDbType} from "../types/blog-types";


export let postsCollection: Collection<any>
export let blogsCollection: Collection<any>
export let usersCollection: Collection<any>
export let commentsCollection: Collection<any>
export let deviceCollection: Collection<SessionType>
export let countRequestsCollection: Collection<any>

const BlogsSchema = new mongoose.Schema<BlogDbType>({
    name: { type:String , required:true},
    description: { type:String , required:true},
    websiteUrl: { type:String , required:true},
    createdAt: { type:String , required:true},
    isMembership: { type: Boolean , required:true}
})
export const BlogsModel = mongoose.model(SETTINGS.DB_COLLECTION_NAME.BLOGS, BlogsSchema)

export async function runDb(url: string): Promise<boolean> {
    let client = new MongoClient(url)
    let db = client.db(SETTINGS.DB_NAME)

    postsCollection = db.collection<any>(SETTINGS.DB_COLLECTION_NAME.POSTS)
    blogsCollection = db.collection<any>(SETTINGS.DB_COLLECTION_NAME.BLOGS)
    usersCollection = db.collection<any>(SETTINGS.DB_COLLECTION_NAME.USERS)
    commentsCollection = db.collection<any>(SETTINGS.DB_COLLECTION_NAME.COMMENTS)
    deviceCollection = db.collection<SessionType>(SETTINGS.DB_COLLECTION_NAME.TOKEN)
    countRequestsCollection = db.collection<any>(SETTINGS.DB_COLLECTION_NAME.RATE)


    try {
        await mongoose.connect(url);
        /*await client.connect();*/
        /*await db.command({ping: 1});*/
        if (mongoose.connection.readyState !== 1) {
            throw new Error('Не встал =(')
        }
        console.log('connected to db')
        return true
    } catch (err) {
        console.error(err);
        await mongoose.disconnect();
        return false;
    }
}
