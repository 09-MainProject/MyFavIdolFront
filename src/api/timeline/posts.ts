import {api} from '@/lib/api.ts';
import {PostCreateRequest, PostResponse} from '@/types/post.ts';


export const createPostApi = async (data: PostCreateRequest): Promise<PostResponse> => {
    const response = await api.post('/posts/', data);
    return response.data;
};

export const updatePostApi = async (data: PostCreateRequest, id: number): Promise<PostCreateRequest> => {
    const response = await api.patch(`/posts/${id}`, data);
    return response.data;
};

