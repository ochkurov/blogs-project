import {HydratedDocument, Schema} from "mongoose";

export enum LikeStatusEnum {
    Like = "Like",
    Dislike = "Dislike",
    None = "None"
}

export interface ILike  {
    status: LikeStatusEnum;
    userId: Schema.Types.ObjectId;
    authorName: Schema.Types.String;
    parentId: Schema.Types.ObjectId;
}
export type LikeDocument = HydratedDocument<ILike>;
