export type PostListItem = {
    id: number;
    author: string;
    title: string;
    content: string;
    image_url: null | string;
    created_at: string;
    updated_at: string;
    views: number;
    comments: [];
    likes_count: number;
    is_liked: boolean;
    is_deleted: boolean;
};

export type PostListResponse = {
    count: number;
    next: string;
    previous: string;
    results: PostListItem[];
};

export type PostListRequest = {
    search?: string;
    ordering?: string;
    page?: number | unknown;
    page_size?: number;
};

export type PostResponse = {
    id: number;
    author: string;
    title: string;
    content: string;
    image_url: null | string;
    created_at: string;
    updated_at: string;
    views: number;
    comments: [];
    likes_count: number;
    is_liked: boolean;
    is_deleted: boolean;
};

export type PostCreateRequest = {
    title: string;
    content: string;
};

export type PostRestoreRequest = {
    author: { nickname: string; name: string };
    title: string;
    content: string;
    is_deleted: boolean;
    image_url: string;
};
