import {useQueryClient} from '@tanstack/react-query';
import React from 'react';
import useCommentMutations from '@hooks/useCommentMutation.tsx';
import {InputMode} from '@hooks/useComments.tsx';
import PerformToast from '@utils/PerformToast.tsx';
import {CommentListItemResponse} from '@/types/comment';

type Props = {
    postId: string;
    comments: CommentListItemResponse[];
    setComments: React.Dispatch<React.SetStateAction<CommentListItemResponse[]>>;
    inputMode: InputMode;
    setInputMode: React.Dispatch<React.SetStateAction<InputMode>>;
    rootInput: string;
    setRootInput: React.Dispatch<React.SetStateAction<string>>;
};

export const useCommentHandlers = ({
                                       postId,
                                       comments,
                                       setComments,
                                       inputMode,
                                       setInputMode,
                                       rootInput,
                                       setRootInput,
                                   }: Props) => {
    const queryClient = useQueryClient();
    const {createMutation, updateMutation, deleteMutation} = useCommentMutations(postId);

    const handleAddRootComment = () => {
        if (!rootInput.trim()) return;

        createMutation.mutate(
            {
                content: rootInput,
                parent: null,
            },
            {
                onSuccess: (result) => {
                    setComments((prev) => [...prev, result]);
                    queryClient.invalidateQueries({queryKey: ['comment', postId]});
                    setRootInput('');
                },
                onError: () => {
                    PerformToast({msg: '댓글 작성 실패', type: 'error'});
                },
            }
        );
    };

    const handleAddReplyComment = () => {
        if (!inputMode.payload?.value?.trim()) return;

        createMutation.mutate(
            {
                content: inputMode.payload.value,
                parent: inputMode.payload.parent,
            },
            {
                onSuccess: (result) => {
                    setComments((prev) => [...prev, result]);
                    queryClient.invalidateQueries({queryKey: ['comment', postId]});
                    setInputMode({mode: 'unknown'});
                },
                onError: () => {
                    PerformToast({msg: '댓글 작성 실패', type: 'error'});
                },
            }
        );
    };

    const handleEditComment = () => {
        if (!inputMode.payload?.value?.trim()) return;

        updateMutation.mutate(
            {
                post_id: postId,
                id: inputMode.payload.comment_id,
                content: inputMode.payload.value,
            },
            {
                onSuccess: (result) => {
                    setComments((prev) =>
                        prev.map((item) =>
                            item.id === result.id ? {...item, content: result.content} : item
                        )
                    );
                    queryClient.invalidateQueries({queryKey: ['comment', postId]});
                    setInputMode({mode: 'unknown'});
                    setRootInput('');
                },
                onError: () => {
                    PerformToast({msg: '댓글 수정 실패', type: 'error'});
                },
            }
        );
    };

    const handleDeleteComment = (commentId: number) => {
        deleteMutation.mutate(
            {
                id: commentId,
                post_id: postId,
            },
            {
                onSuccess: (_, variables) => {
                    const deletedId = Number(variables.id);
                    const find = comments.find((item) => item.id === deletedId);
                    const parentId = find?.parent ?? null;

                    setComments((prev) =>
                        prev
                            .map((item) =>
                                item.parent === deletedId ? {...item, parent: parentId} : item
                            )
                            .filter((item) => item.id !== deletedId)
                    );

                    queryClient.invalidateQueries({queryKey: ['comment', Number(variables.post_id)]});
                    setInputMode({mode: 'unknown'});
                },
                onError: () => {
                    PerformToast({msg: '댓글 삭제 실패', type: 'error'});
                },
            }
        );
    };

    const handleAllDeleteComment = (parent: number) => {
        const idsToDelete = comments
            .filter(item => item.id === parent || item.parent === parent)
            .map(item => item.id);

        setComments((prev) => prev.filter(item => !idsToDelete.includes(item.id)));

        deleteMutation.mutate({
            id: parent,
            post_id: postId,
        });
    };

    return {
        handleAddRootComment,
        handleAddReplyComment,
        handleEditComment,
        handleAllDeleteComment,
        handleDeleteComment,
    };
};
