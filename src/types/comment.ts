export type CommentListItemRequest = {
    post_id: string;
}

export type CommentListItemResponse = {
    id: number,
    content: string;
    author: string;
    post: string;
    parent: number | null;
    created_at: string;
    updated_at: string;
    replies: string;
};

export type CommentResponse = {
    count: number;
    next: string;
    previous: string;
    results: CommentListItemResponse[];
}

export type CommentCreateRequest = {
    content: string;
    post_id: string;
    parent?: number;
};

export type CommentUpdateRequest = {
    content: string;
    post_id: string;
    id: number;
};

export type CommentDeleteRequest = {
    id: number
    post_id: string;
};

export type CommentDeleteResponse = {
    like_id: number;
};

export type InputMode = {
    mode: 'edit' | 'reply';
    payload?: {
        comment_id?: number;
        parent?: number;
        value?: string;
    };
};