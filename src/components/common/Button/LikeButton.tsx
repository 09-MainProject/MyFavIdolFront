import {useMutation} from '@tanstack/react-query';
import React, {useState} from 'react';
import {createLikeApi, deleteLikeApi} from '@api/timeline/getLikes';
import {Heart} from '@assets/icons/inedx.ts';
import PerformToast from '@utils/PerformToast';

type Props = {
    id: string;
    liked: boolean;
    setLiked: React.Dispatch<React.SetStateAction<boolean>>;
    setCount: React.Dispatch<React.SetStateAction<number>>;
    count: number;
    onSuccess?: () => void;
};

function LikeButton({id, liked, setLiked, setCount, count, onSuccess}: Props) {
    const [isLiked, setIsLiked] = useState(liked);
    const [likeCount, setLikeCount] = useState(count);

    const likeMutation = useMutation({
        mutationFn: () => createLikeApi({id}),
        onMutate: () => {
            setIsLiked(true);
            setLiked(true);
            setLikeCount((prev) => prev + 1);
            setCount((prev) => prev + 1);
        },
        onSuccess: () => {
            onSuccess?.();
        },
        onError: () => {
            setIsLiked(false);
            setLiked(false);
            setLikeCount((prev) => prev - 1);
            setCount((prev) => prev - 1);
            PerformToast({msg: '좋아요 처리에 실패했습니다.', type: 'error'});
        }
    });

    const unlikeMutation = useMutation({
        mutationFn: () => deleteLikeApi({id}),
        onMutate: () => {
            setIsLiked(false);
            setLiked(false);
            setLikeCount((prev) => prev - 1);
            setCount((prev) => prev - 1);
        },
        onSuccess: () => {
            onSuccess?.();
        },
        onError: () => {
            setIsLiked(true);
            setLiked(true);
            setLikeCount((prev) => prev + 1);
            setCount((prev) => prev + 1);
            PerformToast({msg: '좋아요 취소에 실패했습니다.', type: 'error'});
        }
    });

    const handleLike = () => {
        if (isLiked) {
            unlikeMutation.mutate();
        } else {
            likeMutation.mutate();
        }
    };

    return (
        <button
            type="button"
            onClick={handleLike}
            className="flex items-center gap-1"
        >
            <Heart
                className={`w-4 h-4 ${isLiked ? 'fill-red-500 text-red-500' : 'text-gray-400'}`}
            />
            <span>{likeCount}</span>
        </button>
    );
}

export default LikeButton; 