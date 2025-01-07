import {SETTINGS} from "../settings";
import {MongoClient} from "mongodb";


export let postsCollection: any
export let blogsCollection: any
export let usersCollection: any

export async function runDb(url: string): Promise<boolean> {
    let client = new MongoClient(url)
    let db = client.db(SETTINGS.DB_NAME)

    postsCollection = db.collection<any>(SETTINGS.DB_COLLECTION_NAME.POSTS)
    blogsCollection = db.collection<any>(SETTINGS.DB_COLLECTION_NAME.BLOGS)
    usersCollection = db.collection<any>(SETTINGS.DB_COLLECTION_NAME.USERS)

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
