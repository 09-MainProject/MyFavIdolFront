import React from 'react';
import CommentLikeButton from '@pages/timeline/components/Button/CommentLikeButton.tsx';
import {formatDate} from '@utils/date';

export type CommentContentProps = {
    author: string;
    createdAt: string;
    content: string;
    commentId: number;
    authorImage?: string;
};

function CommentContent({author, content, createdAt, commentId, authorImage}: CommentContentProps) {
    const createdAtStr = formatDate(createdAt);
    return (
        <div className="flex items-start gap-3">
            {authorImage && (
                <img
                    src={authorImage}
                    alt={author}
                    className="w-8 h-8 rounded-full object-cover"
                />
            )}
            <div className="flex-1">
                <div className="flex items-center gap-2">
                    <span className="font-medium">{author}</span>
                    <span className="text-sm text-gray-500">{createdAtStr}</span>
                </div>
                <p className="mt-1 text-gray-700">{content}</p>
            </div>
            <CommentLikeButton commentId={commentId}/>
        </div>
    );
}

export default React.memo(CommentContent);