import {useQuery} from '@tanstack/react-query';
import {useEffect, useMemo, useState} from 'react';
import {getCommentApi} from '@api/comments/getComments.ts';
import {CommentListItemResponse} from '@/types/comment.ts';

export type InputMode = {
    mode: 'unknown' | 'reply' | 'edit';
    payload?: {
        parent?: number;
        comment_id?: number;
        value?: string;
    }
}

export type ChildCommentMap = Record<number, CommentListItemResponse[]>;

function useComments(id: string) {
    const getComment = useQuery({
        queryKey: ['comment', id],
        queryFn: () => getCommentApi(id),
    });

    const [comments, setComments] = useState<CommentListItemResponse[]>(getComment.data?.results ?? []);
    const [inputMode, setInputMode] = useState<InputMode>({mode: 'unknown'});

    const {parentComments, childCommentMap} = useMemo(() => {
        const parent = [];
        const childMap: ChildCommentMap = {};

        comments.forEach(comment => {
            if (comment.parent == null) {
                parent.push(comment);
            } else {
                if (!childMap[comment.parent]) {
                    childMap[comment.parent] = [];
                }
                childMap[comment.parent].push(comment);
            }
        });

        return {parentComments: parent, childCommentMap: childMap};
    }, [comments]);
    
    useEffect(() => {
        if (getComment.data?.results) {
            setComments(getComment.data.results);
        }
    }, [getComment.isSuccess, getComment.data?.results]);

    return {
        parentComments,
        comments,
        setComments,
        childCommentMap,
        inputMode,
        setInputMode,
    };
}

export default useComments;
