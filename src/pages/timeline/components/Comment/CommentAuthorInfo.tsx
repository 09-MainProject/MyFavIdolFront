import React from 'react';

type Props = {
    author: string;
    date: string;
    isReply: boolean;
};


function CommentAuthorInfo({author, date, isReply}: Props) {
    return (
        <div className="flex items-center  gap-2">
            <div>
                <p className="text-sm font-semibold text-gray-800">
                    {isReply && <span className="text-blue-500">답글 </span>}
                </p>
                <p>
                    {author}
                </p>
                <p className="text-xs text-gray-400">{date}</p>
            </div>
        </div>
    );
}

export default CommentAuthorInfo;