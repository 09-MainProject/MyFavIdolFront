import React from 'react';
import {Eye} from '@assets/icons/inedx.ts';
import CommentButton from '@pages/timeline/components/Button/CommentButton.tsx';
import LikeButton from '@pages/timeline/components/Button/LikeButton.tsx';
import TimelineCardImage from '@pages/timeline/components/Cards/TimelineCardImage.tsx';
import {PostResponse} from '@/types/post';

interface TimelineCardProps {
    post: PostResponse;
    postId: number;
    likeCount: number;
    is_liked: boolean;
    is_deleted: boolean;
}

function TimelineCard({post, postId, likeCount, is_liked, is_deleted}: TimelineCardProps) {
    const id = postId.toString();

    return (
        <div className="flex flex-col overflow-hidden pb-4 border-b border-gray-300">
            <TimelineCardImage 
                post={post}
                showHoverEffect
            />
            <div className="flex items-center gap-6 px-3 py-3 text-sm text-gray-600">
                <LikeButton 
                    id={id} 
                    liked={is_liked && !is_deleted}
                    count={likeCount}
                />
                <CommentButton commentCount={post.comments.length}/>
                <div className="flex items-center gap-1">
                    <Eye className="w-4 h-4"/>
                    <span>{post.views}</span>
                </div>
            </div>
            <div className="px-3">
                <p className="mt-4 mb-4 text-sm text-gray-700 line-clamp-3">
                    {post.content}
                </p>
            </div>
        </div>
    );
}

export default TimelineCard;
