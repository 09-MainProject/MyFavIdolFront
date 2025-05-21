import {useMutation} from '@tanstack/react-query';
import React from 'react';
import {deletePostApi} from '@api/timeline/getPosts.ts';
import useCommentMutation from '@pages/timeline/components/hooks/useCommentMutation.tsx';
import {InputMode} from '@pages/timeline/components/hooks/useComments.tsx';
import PerformToast from '@utils/PerformToast.tsx';
import {CommentListItem} from '@/types/comment.ts';
import {PostDeleteRequest} from '@/types/post.ts';

type Props = {
    id: string;
    inputMode: InputMode;
    setInputMode: React.Dispatch<React.SetStateAction<InputMode>>;
    rootInput: string;
    setRootInput: React.Dispatch<React.SetStateAction<string>>;
    setComments: React.Dispatch<React.SetStateAction<CommentListItem[]>>;
    login: boolean;
    navigate: (path: string) => void;
};

function useCommentHandlers({
                                id,
                                inputMode,
                                setInputMode,
                                rootInput,
                                setRootInput,
                                setComments,
                                login,
                                navigate
                            }: Props) {
    const {createCommentMutation, updateCommentMutation, deleteCommentMutation} = useCommentMutation(id);
    const handleEditComment = () => {
        if (!inputMode.payload?.value?.trim()) return;

        updateCommentMutation.mutate(
            {
                content: inputMode.payload.value,
                parent: null,
                commentId: inputMode.payload.comment_id,
            },
            {
                onSuccess: (updatedComment) => {
                    setComments((prev) =>
                        prev.map((item) =>
                            item.id === updatedComment.id ? updatedComment : item
                        )
                    );
                    setInputMode({mode: 'unknown'});
                },
            }
        );
    };


    const handleAddRootComment = () => {
        if (!login) {
            PerformToast({msg: '로그인 후 댓글을 작성할 수 있습니다.', type: 'warning'});
            return;
        }

        if (!rootInput.trim()) return;

        createCommentMutation.mutate(
            {
                content: rootInput,
                parent: null,
            },
            {
                onSuccess: (newComment) => {
                    setComments((prev) => [...prev, newComment]);
                    setRootInput('');
                },
            }
        );
    };


    const handleAddReplyComment = () => {
        if (!inputMode.payload?.value?.trim()) return;
        createCommentMutation.mutate(
            {
                content: inputMode.payload.value,
                parent: inputMode.payload.parent_id,
            },
            {
                onSuccess: (newComment) => {
                    setComments((prev) => [...prev, newComment]);
                    setInputMode({mode: 'unknown'});
                },
            }
        );
    };

    const handleDeleteComment = (commentId: number) => {
        deleteCommentMutation.mutate(
            {commentId},
            {
                onSuccess: () => {
                    setComments((prev) =>
                        prev.filter((item) => item.id !== commentId)
                    );
                },
            }
        );
    };


    const handleAllDeleteComment = (commentId: number) => {
        deleteCommentMutation.mutate(
            {commentId},
            {
                onSuccess: () => {
                    setComments((prev) =>
                        prev.filter(
                            (item) => item.id !== commentId && item.parent !== commentId
                        )
                    );
                },
            }
        );
    };

    const deleteMutation = useMutation<void, Error, PostDeleteRequest>({
        mutationFn: (data) => deletePostApi(data.id),
        onSuccess: () => {
            PerformToast({msg: '게시글 삭제 성공', type: 'success'});
            navigate('/timeline');
        },
    });

    const handleDeletePost = () => {
        deleteMutation.mutate({id});
    };
    return {
        handleAllDeleteComment,
        handleDeleteComment,
        handleEditComment,
        handleAddRootComment,
        handleAddReplyComment,
        handleDeletePost
    };
}

export default useCommentHandlers;