import React from 'react';
import {Comment} from '@assets/icons/inedx.ts';
import IconButton from '@components/common/Button/IconButton.tsx';

function CommentButton({commentCount}: { commentCount: number }) {
    return (
        <IconButton
            type="button"
            className="flex items-center gap-1 hover:text-blue-500 transition-colors duration-200"
        >
            <Comment/>
            {commentCount}
        </IconButton>
    );
}

export default CommentButton;