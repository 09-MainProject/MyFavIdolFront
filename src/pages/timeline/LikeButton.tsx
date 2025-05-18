import React from 'react';
import {Heart} from '@assets/icons/inedx';
import IconButton from '@components/common/Button/IconButton.tsx';
import useLikeState from '@hooks/useLikeState';

type Props = {
    id: string;
    count: number;
    setCount: React.Dispatch<React.SetStateAction<number>>;
    liked: boolean;
    setLiked: React.Dispatch<React.SetStateAction<boolean>>;
}

function LikeButton({id, count, setCount, liked, setLiked}: Props) {
    const {createLikeMutation, deleteLikeMutation} = useLikeState();

    const handleLike = () => {
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
    };
    return (
        <IconButton
            type="button"
            className={`flex items-center gap-1 transition-colors duration-200 ${
                liked ? 'text-red-500' : 'hover:text-red-500'
            }`}
            onClick={handleLike}
        >
            <Heart/>
            {count}
        </IconButton>
    );
}

export default LikeButton;