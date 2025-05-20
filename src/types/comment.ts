export type CommentListItem = {
    id: number;
    post: number;
    author: string;
    content: string;
    created_at: string;
    updated_at: string;
    is_deleted: boolean;
    likes_count: number;
    parent: number | null;
    is_liked: string;
};

export type CommentListResponse = {

    count: number;
    next: string;
    previous: string;
    results: CommentListItem[];
};

export type CommentCreateRequest = {
    content: string;
    parent: number | null;
    id?: number;
};

export type CommentUpdateRequest = {
    content: string;
    parent: number | null;
}

export type CommentResponse = {
    content: string;
};
