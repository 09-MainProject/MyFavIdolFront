import {api} from '@/lib/api.ts';
import {CommentDeleteResponse, CommentListItemResponse, CommentUpdateRequest} from '@/types/comment.ts';
import {LikePostCheckedResponse} from '@/types/like.ts';

export const getLikeCommentStatusApi = async (id: number): Promise<LikePostCheckedResponse> => {
    const response = await api.get(`/comments/${id}/like-status`);
    return response.data;
};

export const createLikeCommentApi = async (data: CommentUpdateRequest, id: number): Promise<CommentListItemResponse> => {
    const response = await api.post(`/comments/${id}/likes`, {content: data.content});
    return response.data;
};

export const deleteLikeCommentApi = async (id: number): Promise<CommentDeleteResponse> => {
    const response = await api.delete(`/comments/${id}/likes`);
    return response.data;
};