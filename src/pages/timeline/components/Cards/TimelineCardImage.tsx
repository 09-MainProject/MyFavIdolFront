import React from 'react';
import {Link} from 'react-router';
import useImageFallback from '@hooks/useImageFallback.tsx';
import useImgLazy from '@hooks/useImgLazy.tsx';
import {PostResponse} from '@/types/post';

interface TimelineCardImageProps {
    post: PostResponse;
    className?: string;
    showHoverEffect?: boolean;
}

function TimelineCardImage({post, className = '', showHoverEffect = true}: TimelineCardImageProps) {
    const imgRef = useImgLazy();
    const imgError = useImageFallback();
    
    const imageClassName = `w-full h-full object-cover ${
        showHoverEffect ? 'transition-transform hover:scale-105' : ''
    } ${className}`;
    
    return (
        <div className="aspect-video overflow-hidden border rounded-sm border-[#EFEFEF]">
            <Link 
                to={`/timeline/${post.id}`} 
                state={{
                    is_liked: post.is_liked,
                    is_deleted: post.is_deleted,
                    like_count: post.likes_count,
                    commentsCount: post.comments.length,
                }} 
                className="block w-full h-full"
            >
                <picture>
                    <source srcSet={post.image_url} type="image/webp"/>
                    <img
                        ref={imgRef}
                        src={post.image_url}
                        alt={post.title || '게시글 이미지'}
                        className={imageClassName}
                        onError={imgError}
                        loading="lazy"
                        width={300}
                        height={300}
                    />
                </picture>
            </Link>
        </div>
    );
}

export default TimelineCardImage;