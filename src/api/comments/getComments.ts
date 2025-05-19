import {api} from '@/lib/api.ts';
import {CommentCreateRequest, CommentListItemResponse, CommentResponse} from '@/types/comment.ts';

export const getCommentApi = async (id: string): Promise<CommentResponse> => {
    const response = await api.get(`/posts/${id}/comments`, {
        params: {
            search: '',
            ordering: 'created_at',
            page: '',
            page_size: '',
        }
    });
    return response.data;
};

export const createCommentApi = async (data: CommentCreateRequest, post_id: string): Promise<CommentListItemResponse> => {
    const response = await api.post(`/posts/${post_id}/comments`, data);
    return response.data;
};


export const updateCommentApi = async (
    {content}: { content: string },
    post_id: string,
    id: number
): Promise<CommentListItemResponse> => {
    const response = await api.patch(`/posts/${post_id}/comments${id}`, {
        content
    });
    return response.data;
};


export const deleteCommentApi = async (post_id: string, id: number): Promise<void> => {
    const response = await api.delete(`/posts/${post_id}/comments${id}`);
    return response.data;
};