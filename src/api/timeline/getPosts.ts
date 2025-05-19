import {api} from '@/lib/api.ts';
import {PostCreateRequest, PostListRequest, PostListResponse, PostResponse} from '@/types/post.ts';

export const getPostsApi = async (params: PostListRequest): Promise<PostListResponse> => {
    const response = await api.get('/posts', {
        params: {
            search: params?.search,
            ordering: params?.ordering,
            page: params?.page,
            page_size: params?.page_size,
        }
    });
    return response.data;
};

export const getDetailPostApi = async (id: string): Promise<PostResponse> => {
    const response = await api.get(`/posts${id}`);
    return response.data;
};

export const createPostApi = async (data: PostCreateRequest): Promise<PostResponse> => {
    const response = await api.post('posts', data);
    return response.data;
};

export const updatePostApi = async (data: PostCreateRequest, id: number): Promise<PostCreateRequest> => {
    const response = await api.patch(`/posts${id}`, data);
    return response.data;
};

export const deletePostApi = async (id: string): Promise<void> => {
    const response = await api.delete(`/posts${id}`);
    return response.data;
};

