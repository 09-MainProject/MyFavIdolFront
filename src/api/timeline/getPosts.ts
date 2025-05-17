import {api} from '@/lib/api.ts';
import {PostCreateRequest, PostListRequest, PostListResponse, PostResponse} from '@/types/post.ts';


export const createPostApi = async (data: PostCreateRequest): Promise<PostResponse> => {
    const response = await api.post('post', data);
    return response.data;
};

export const updatePostApi = async (data: PostCreateRequest, id: number): Promise<PostCreateRequest> => {
    const response = await api.patch(`/posts/${id}`, data);
    return response.data;
};

export const getPostsApi = async (params?: PostListRequest): Promise<PostListResponse> => {
    const response = await api.get('/post', {
        params,
    });
    return response.data;
};

