import {api} from '@/lib/api.ts';
import {
    LikePostCheckedRequest,
    LikePostCheckedResponse,
    LikePostCreateRequest,
    LikePostCreateResponse,
    LikePostDeleteRequest
} from '@/types/like';

export const createLikeApi = async (data: LikePostCreateRequest): Promise<LikePostCreateResponse> => {
    const response = await api.post(`/posts/${data.id}/likes`);
    return response.data;
};

export const getLikeStatusApi = async (data: LikePostCheckedRequest): Promise<LikePostCheckedResponse> => {
    const response = await api.get(`${data.type}/${data.id}/like-status`);
    return response.data;
};

export const deleteLikeApi = async (data: LikePostDeleteRequest): Promise<void> => {
    const response = await api.delete(`/posts/${data.id}/likes`);
    return response.data;
};