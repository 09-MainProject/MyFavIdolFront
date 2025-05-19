import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {useState} from 'react';
import {createLikeCommentApi, deleteLikeCommentApi, getLikeCommentStatusApi} from '@api/timeline/getCommentLikes.ts';
import {
    CommentDeleteRequest,
    CommentDeleteResponse,
    CommentListItemResponse,
    CommentUpdateRequest
} from '@/types/comment.ts';

function useCommentLike(commentId: number) {
    const [count, setCount] = useState(0);
    const queryClient = useQueryClient();

    const {data} = useQuery({
            queryKey: ['commentLikeStatus', commentId],
            queryFn: () => getLikeCommentStatusApi(commentId),
        }
    );

    const likeMutation = useMutation<CommentListItemResponse, Error, CommentUpdateRequest>({
            mutationFn: (variables) => createLikeCommentApi(variables, commentId),
            onSuccess: () =>
                queryClient.invalidateQueries(['commentLikeStatus', commentId]),
        }
    );

    const unlikeMutation = useMutation<CommentDeleteResponse, Error, CommentDeleteRequest>({
        mutationFn: () => deleteLikeCommentApi(commentId),
        onSuccess: () =>
            queryClient.invalidateQueries(['commentLikeStatus', commentId]),
    });

    const toggleLike = () => {
        if (data.data?.liked) {
            unlikeMutation.mutateAsync().then(() => setCount((prev) => prev - 1));
        } else {
            likeMutation.mutateAsync({content: 'like'}).then(() => setCount((prev) => prev + 1));
        }
    };

    return {
        isLiked: data?.liked ?? false,
        count,
        toggleLike,
        isLoading: likeMutation.isLoading || unlikeMutation.isLoading,
    };
}

export default useCommentLike;
