import React from 'react';
import {Heart} from '@assets/icons/inedx';
import IconButton from '@components/common/Button/IconButton';
import useCommentLike from '@hooks/useCommentLike.tsx';


type Props = {
    commentId: number;
};

function CommentLikeButton({commentId}: Props) {
    const {isLiked, count, toggleLike, isLoading} = useCommentLike(commentId);

    return (
        <IconButton
            type="button"
            disabled={isLoading}
            onClick={toggleLike}
            className={`flex items-center gap-1 transition-colors duration-200 ${
                isLiked ? 'text-red-500' : 'hover:text-red-500'
            }`}
        >
            <Heart width={15} height={15}/>
            {count}
        </IconButton>
    );
}

export default CommentLikeButton;
