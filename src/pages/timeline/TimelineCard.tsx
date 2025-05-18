import React, {useState} from 'react';
import CommentButton from '@pages/timeline/CommentButton.tsx';
import LikeButton from '@pages/timeline/LikeButton';
import TimelineCardImage from '@pages/timeline/TimelineCardImage';
import {PostResponse} from '@/types/post';

type Props = {
    post: PostResponse;
    postId: number;
    likeCount: number;
    is_liked: boolean;
    is_deleted: boolean;
};

function TimelineCard({post, postId, likeCount, is_liked, is_deleted}: Props) {
    const [liked, setLiked] = useState(is_liked && !is_deleted);
    const [count, setCount] = useState(likeCount);
    const id = postId.toString();

    return (
        <div className="flex flex-col overflow-hidden pb-4 border-b border-gray-300">
            <TimelineCardImage post={post}/>
            <div className="flex items-center gap-6 px-3 py-3 text-sm text-gray-600 ">
                <LikeButton id={id} liked={liked} setLiked={setLiked} setCount={setCount} count={count}
                />
                <CommentButton/>
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
