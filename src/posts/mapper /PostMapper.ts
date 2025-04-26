import {PostInputModel} from "../../types/posts-types";

export class PostMapper {
    static makePostDTO (dto: PostInputModel , blogName: string) {
        return {
            title: dto.title,
            shortDescription: dto.shortDescription,
            content: dto.content,
            blogId: dto.blogId,
            blogName
        }
    }
}
