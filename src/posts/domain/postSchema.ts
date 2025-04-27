import mongoose, {HydratedDocument, Model, model, Schema} from "mongoose";
import {IPost, IPostNewestLikes} from "./post-types";
import {LikeStatusEnum} from "../../likes /domain/like.entity";
import {PostInputModel} from "../../types/posts-types";
import {ObjectId} from "mongodb";
import {SETTINGS} from "../../settings";


 interface IPostMethods {
    updatePost : (postDto: PostInputModel) => void,
    setLikesInfo: (likesDto: IPostNewestLikes[]) => void
}


interface IPostModel extends Model<IPost, {}, IPostMethods> {
    makeInstanse: (postDto:any) => PostDocument
}

const newestLikesSchema = new Schema({
    addedAt: {type: Date, default: Date.now},
    userId: {type: String, required: true},
    login: {type: String, required: true},
}, {_id: false}) /// это для того чтобы айди не создавался по дефолту?

const ExtendedLikesInfoSchema = new Schema({
    likesCount: {type: Number, required: true, default: 0},
    dislikesCount: {type: Number, required: true, default: 0},
    myStatus: {type: String, enum: [LikeStatusEnum.Like, LikeStatusEnum.None, LikeStatusEnum.Dislike], default: "None"},
    newestLikes: [newestLikesSchema]
}, {_id: false});
// ниже мы не описываем _id потому что он по дефолту создается ?

const postSchema = new mongoose.Schema<IPost, IPostModel ,IPostMethods>({
    title: {
        type: String,
        required: true,
        maxlength: [30, "Maximum length of title 30 symbols"],
    },
    shortDescription: {
        type: String,
        required: true,
        maxlength: [100, "Maximum length of description 30 symbols"],
    },
    content: {
        type: String,
        required: true,
        maxlength: [1000, "Maximum length of content 30 symbols"],
    },
    blogId: {
        type: Schema.Types.ObjectId,
        required: true,
    },
    blogName: {
        type: String,
        required: true,
    },
    createdAt: {
        type: String,
        default: new Date().toISOString,
        required: true
    },
    extendedLikesInfo: ExtendedLikesInfoSchema

}, {versionKey: false})

postSchema.method('updatePost' , function updatePost (postDto: any) {
    this.title = postDto.title;
    this.shortDescription = postDto.shortDescription;
    this.content = postDto.content;
    this.blogId = postDto.blogId;
    this.blogName = postDto.blogName;
})

postSchema.method('setLikesInfo' , function setLikesInfo (likesDto: IPostNewestLikes[]) {
    this.extendedLikesInfo.newestLikes = likesDto;
})

postSchema.static('makeInstanse' , function makeInstanse (postDto:any): PostDocument {
    return new PostModel({
        _id: new ObjectId(),
        title: postDto.title,
        shortDescription: postDto.shortDescription,
        content: postDto.content,
        blogId: postDto.blogId,
        blogName: postDto.blogName,
        createdAt: new Date().toISOString(),
        extendedLikesInfo:{
            likesCount: postDto.likesCount,
            dislikesCount: postDto.dislikesCount,
            myStatus: LikeStatusEnum.None,
            newestLikes: []
        }
    })
})
export const PostModel = mongoose.model<IPost, IPostModel>(SETTINGS.DB_COLLECTION_NAME.POSTS, postSchema);
export type PostDocument = HydratedDocument<IPost , IPostMethods>
