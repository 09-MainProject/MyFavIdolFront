import React from 'react';
import TimelineCardImage from '@pages/timeline/components/Card/TimelineCardImage.tsx';
import CommentButton from '@pages/timeline/components/Comment/CommentButton.tsx';
import LikeButton from '@pages/timeline/components/Like/LikeButton.tsx';
import {PostResponse} from '@/types/post.ts';

type Props = {
    post: PostResponse;
    postId: number;
    likeCount: number;
    is_liked: boolean;
    is_deleted: boolean;
};

function TimelineCard({post, postId, likeCount, is_liked, is_deleted}: Props) {
    const id = postId.toString();

    return (
        <div className="flex flex-col overflow-hidden pb-4 border-b border-gray-300">
            <TimelineCardImage post={post}/>
            <div className="flex items-center gap-6 px-3 py-3 text-sm text-gray-600 ">
                <LikeButton id={id} liked={is_liked} is_deleted={is_deleted} count={likeCount}
                />
                <CommentButton commentCount={post.comments.length}/>
                <span>Views: {post.views}</span>
            </div>
            <div>
                <p className="mt-4 px-3 mb-4 text-sm text-gray-700 line-clamp-2 whitespace-nowrap truncate verflow-hidden">
                    {post.content}
                </p>
            </div>
        </div>
    );
}

export default TimelineCard;
