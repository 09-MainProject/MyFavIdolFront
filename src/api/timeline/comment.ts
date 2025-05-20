import {api} from '@/lib/api.ts';
import {CommentCreateRequest, CommentListItem, CommentListResponse, CommentUpdateRequest,} from '@/types/comment.ts';

export const getCommentsApi = async (
    postId: string,
    params?: {
        search?: string;
        ordering?: string;
        page?: number;
        page_size?: number;
    }
): Promise<CommentListResponse> => {
    const response = await api.get(`/posts/${postId}/comments`, {params});

    return response.data;
};

export const createCommentApi = async (
    postId: string,
    data: CommentCreateRequest
): Promise<CommentListItem> => {
    const response = await api.post(`/posts/${postId}/comments`, {
        content: data.content,
        parent: data.parent ?? null,
    });
    return response.data;
};

export const updateCommentApi = async (
    postId: string,
    data: CommentUpdateRequest & { commentId: number }
): Promise<CommentListItem> => {
    const response = await api.patch(`/posts/${postId}/comments${data.commentId}`, data);
    return response.data;
};

export const deleteCommentApi = (
    postId: string,
    commentId: number
): Promise<void> => api.delete(`/posts/${postId}/comments${commentId}`);
