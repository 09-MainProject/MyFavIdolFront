import React from 'react';
import {Link} from 'react-router';
import useImageFallback from '@hooks/useImageFallback.tsx';
import useImgLazy from '@hooks/useImgLazy.tsx';
import {PostResponse} from '@/types/post.ts';

type Props = {
    post: PostResponse;
}

function TimelineCardImage({post}: Props) {
    const imgRef = useImgLazy();
    const imgError = useImageFallback();
    return (
        <div className="aspect-video overflow-hidden border rounded-sm border-[#EFEFEF]">
            <Link to={`/timeline/${post.id}`} state={{
                post,
            }} className="block w-full h-full">
                <picture>
                    <source srcSet={post.image_url} type="image/webp"/>
                    <img
                        ref={imgRef}
                        src=""
                        data-src={post.image_url}
                        alt={post.title}
                        className="w-full h-full object-cover"
                        onError={imgError}
                        width={300}
                        height={300}
                    />
                </picture>
            </Link>
        </div>
    );
}

export default TimelineCardImage;