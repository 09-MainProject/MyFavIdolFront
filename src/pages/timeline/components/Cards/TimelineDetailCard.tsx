import React from 'react';
import {Eye} from '@assets/icons/inedx.ts';
import useImageFallback from '@hooks/useImageFallback';
import useImgLazy from '@hooks/useImgLazy';
import CommentButton from '@pages/timeline/components/Button/CommentButton';
import LikeButton from '@pages/timeline/components/Button/LikeButton';
import {PostResponse} from '@/types/post';

interface TimelineDetailCardProps {
    postDetail: PostResponse;
    id: string;
}

function TimelineDetailCard({postDetail, id}: TimelineDetailCardProps) {
    const imgRef = useImgLazy();
    const imgError = useImageFallback();

    return (
        <div className="mt-8 rounded-xl bg-white">
            <picture>
                <source srcSet={postDetail.image_url} type="image/webp"/>
                <img
                    ref={imgRef}
                    onError={imgError}
                    src={postDetail.image_url}
                    alt={postDetail.title}
                    className="max-h-[600px] w-full rounded-t-xl object-cover"
                />
            </picture>
            <p className="p-4 pt-8 text-lg text-gray-800">{postDetail.content}</p>
            <div className="flex items-center justify-between border-t border-gray-200 p-4">
                <div className="flex items-center gap-6">
                    <LikeButton 
                        id={id} 
                        liked={postDetail.is_liked && !postDetail.is_deleted}
                        count={postDetail.likes_count}
                    />
                    <CommentButton commentCount={postDetail.comments.length}/>
                    <div className="flex items-center gap-1">
                        <Eye className="w-4 h-4"/>
                        <span>{postDetail.views}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TimelineDetailCard;
