import {useMemo, useState} from 'react';
import {mockComments, UserComment} from '@/mocks/data/comment';

export type InputMode = {
    mode: 'unknown' | 'reply' | 'edit';
    payload?: {
        parent_id?: number;
        comment_id?: number;
        value?: string;
    }
}

function useComments() {
    const [comments, setComments] = useState<UserComment[]>(mockComments);
    const [inputMode, setInputMode] = useState<InputMode>({mode: 'unknown'});

    const {parentComments, childCommentMap} = useMemo(() => {
        const parent = [];
        const childMap: Record<string, UserComment[]> = {};

        comments.forEach(comment => {
            if (comment.parent_id == null) {
                parent.push(comment);
            } else if (childMap[comment.parent_id]) {
                childMap[comment.parent_id].push(comment);
            } else {
                childMap[comment.parent_id] = [comment];
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
