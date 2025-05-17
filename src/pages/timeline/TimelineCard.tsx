import React, {useState} from 'react';
import {Link} from 'react-router';
import {Comment, Heart} from '@assets/icons/inedx';
import usePostLikeMutation from '@hooks/usePostLikeMutation';
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
    const {createLikeMutation, deleteLikeMutation} = usePostLikeMutation();
    const id = postId.toString();
    return (
        <div className="flex flex-col gap-4">
            <Link to={`/timeline/${post.id}`} className="block">
                <picture>
                    <source srcSet={post.image_url} type="image/webp"/>
                    <img
                        src={post.image_url}
                        alt={post.title}
                        className="h-48 w-full rounded-t-lg object-cover"
                    />
                </picture>
                <p className="mt-2 line-clamp-2 px-2 text-sm text-gray-600">
                    {post.content}
                </p>
            </Link>
            <div className="flex items-center gap-4 px-2 text-sm text-gray-500">
                <button
                    type="button"
                    className="flex items-center gap-1 hover:text-red-500"
                    onClick={() => {
                        if (liked === true) {
                            deleteLikeMutation.mutateAsync({id}).then(() => {
                                setCount((prev) => prev - 1);
                                setLiked(false);
                            });
                        }
                        if (liked === false) {
                            createLikeMutation.mutateAsync({id}).then(() => {
                                setCount((prev) => prev + 1);
                                setLiked(true);
                            });
                        }
                    }}
                >
                    <Heart/>
                    {count}
                </button>
                <button
                    type="button"
                    className="flex items-center gap-1 hover:text-blue-500"
                >
                    <Comment/>
                </button>
            </div>
        </div>
    );
}

export default TimelineCard;
