type LikeType = 'comments' | 'posts';
type LikeId = string;

export type Like = {
    app_label: string;
    object_id: string;
    data?: { content_type: string; object_id: string };
};
export type LikeResponse = {
    id: number;
    content_type: number;
    object_id: number;
    user: number;
    created_at: string;
};

export type LikePostCheckedRequest = {
    type: LikeType;
    id: LikeId;
};

export type LikePostCheckedResponse = {
    liked: boolean;
}

export type LikePostCreateRequest = {
    id: LikeId;
}

export type LikePostCreateResponse = {
    like_id: number;
}

export type LikePostDeleteRequest = {
    id: LikeId;
}

