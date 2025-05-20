import {useQuery} from '@tanstack/react-query';
import {useEffect, useMemo, useState} from 'react';
import {getCommentsApi} from '@api/timeline/comment.ts';
import {CommentListItem} from '@/types/comment.ts';

export type InputMode = {
    mode: 'unknown' | 'reply' | 'edit';
    payload?: {
        parent_id?: number;
        comment_id?: number;
        value?: string;
    }
}

function useComments(id: string) {
    const {data} = useQuery({
        queryKey: ['comments', id],
        queryFn: () => getCommentsApi(id),
    });

    const [comments, setComments] = useState<CommentListItem[]>([]);

    useEffect(() => {
        if (data?.results) {
            setComments(data?.results);
        }
    }, [data]);


    const [inputMode, setInputMode] = useState<InputMode>({mode: 'unknown'});

    const {parentComments, childCommentMap} = useMemo(() => {
        const parent: CommentListItem[] = [];
        const childMap: Record<string, CommentListItem[]> = {};

        comments.forEach((comment) => {
            if (comment.parent == null) {
                parent.push(comment);
            } else {
                const key = String(comment.parent);
                if (childMap[key]) {
                    childMap[key].push(comment);
                } else {
                    childMap[key] = [comment];
                }
            }
        });

        return {parentComments: parent, childCommentMap: childMap};
    }, [comments]);

    return {
        parentComments,
        setComments,
        childCommentMap,
        inputMode,
        setInputMode,
    };
}


export default useComments;
