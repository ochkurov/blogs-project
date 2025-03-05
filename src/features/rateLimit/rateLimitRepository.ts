import {countRequestsCollection} from "../../db/mongoDb";

export const rateLimitRepository = {
    async addActivity (ip:string , url:string) {
        await countRequestsCollection.insertOne(
            {ip: ip, url: url, date: new Date()}
        )
    },
    async countActivity (ip:string, url:string):Promise<number> {
        const tenSecAgo = new Date(Date.now() - 10*1000)
        const res = await countRequestsCollection.countDocuments({
            ip,
            url,
            date: {$gte: tenSecAgo}
        })
        return res
    }
}
