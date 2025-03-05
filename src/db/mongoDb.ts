import {SETTINGS} from "../settings";
import {MongoClient} from "mongodb";
import type {Collection} from 'mongodb'


export let postsCollection: Collection<any>
export let blogsCollection: Collection<any>
export let usersCollection: Collection<any>
export let commentsCollection: Collection<any>
export let deviceCollection: Collection<any>
export let countRequestsCollection: Collection<any>

export async function runDb(url: string): Promise<boolean> {
    let client = new MongoClient(url)
    let db = client.db(SETTINGS.DB_NAME)

    postsCollection = db.collection<any>(SETTINGS.DB_COLLECTION_NAME.POSTS)
    blogsCollection = db.collection<any>(SETTINGS.DB_COLLECTION_NAME.BLOGS)
    usersCollection = db.collection<any>(SETTINGS.DB_COLLECTION_NAME.USERS)
    commentsCollection = db.collection<any>(SETTINGS.DB_COLLECTION_NAME.COMMENTS)
    deviceCollection = db.collection<any>(SETTINGS.DB_COLLECTION_NAME.TOKEN)
    countRequestsCollection = db.collection<any>(SETTINGS.DB_COLLECTION_NAME.RATE)


    try {
        await client.connect();
        await db.command({ping: 1});
        console.log('connected to db')
        return true
    } catch (err) {
        console.error(err);
        await client.close();
        return false;
    }
}
