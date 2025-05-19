import {useMutation} from '@tanstack/react-query';
import {createCommentApi, deleteCommentApi, updateCommentApi} from '@api/comments/getComments.ts';
import {
    CommentCreateRequest,
    CommentDeleteRequest,
    CommentListItemResponse,
    CommentUpdateRequest
} from '@/types/comment';


function useCommentMutations(postId: string) {
    const createMutation = useMutation<CommentListItemResponse, Error, CommentCreateRequest>({
        mutationFn: (data) => createCommentApi(data, postId),
    });

    const updateMutation = useMutation<CommentListItemResponse, Error, CommentUpdateRequest>({
        mutationFn: (data) => updateCommentApi({content: data.content}, postId, Number(data.id)),
    });

    const deleteMutation = useMutation<void, Error, CommentDeleteRequest>({
        mutationFn: (data) => deleteCommentApi(data.post_id, Number(data.id)),
    });

    return {
        createMutation,
        updateMutation,
        deleteMutation,
    };
}

export default useCommentMutations;