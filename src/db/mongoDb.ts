import {SETTINGS} from "../settings";
import {MongoClient} from "mongodb";


export let postsCollection : any
export let blogsCollection : any

export async function runDb (url : string): Promise<boolean> {
let client = new MongoClient(url)
    let db = client.db(SETTINGS.DB_NAME)

    postsCollection = db.collection<any>(SETTINGS.PATH.POSTS)
    blogsCollection = db.collection<any>(SETTINGS.PATH.BLOGS)

    try {
        await client.connect();
        await db.command({ping : 1});
        console.log('OK')
        return true
    }
    catch(err) {
    console.error(err);
    await client.close();
    return false;
    }
}
