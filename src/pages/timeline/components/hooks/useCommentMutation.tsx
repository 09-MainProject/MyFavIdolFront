import {useMutation, useQueryClient} from '@tanstack/react-query';
import {createCommentApi, deleteCommentApi, updateCommentApi,} from '@api/timeline/comment.ts';
import PerformToast from '@utils/PerformToast.tsx';
import {CommentCreateRequest, CommentListItem, CommentUpdateRequest,} from '@/types/comment.ts';

function useCommentMutation(postId: string) {
    const queryClient = useQueryClient();
    const createCommentMutation = useMutation<
        CommentListItem,
        Error,
        CommentCreateRequest
    >({
        mutationFn: (data) => createCommentApi(postId, data),
        onSuccess: () => {
            PerformToast({msg: '댓글 작성 성공', type: 'success'});
            queryClient.invalidateQueries({queryKey: ['comments', postId]});
        },
    });

    const updateCommentMutation = useMutation<
        CommentListItem,
        Error,
        CommentUpdateRequest & { commentId: number }
    >({
        mutationFn: (data) => updateCommentApi(postId, data),
        onSuccess: () => {
            PerformToast({msg: '댓글 수정 성공', type: 'success'});
            queryClient.invalidateQueries({queryKey: ['comments', postId]});
        },
    });

    const deleteCommentMutation = useMutation<
        void,
        Error,
        { commentId: number }
    >({
        mutationFn: ({commentId}) => deleteCommentApi(postId, commentId),
        onSuccess: () => {
            PerformToast({msg: '댓글 삭제 성공', type: 'success'});
            queryClient.invalidateQueries({queryKey: ['comments', postId]});
        },
    });

    return {
        createCommentMutation,
        updateCommentMutation,
        deleteCommentMutation,
    };
}

export default useCommentMutation;
