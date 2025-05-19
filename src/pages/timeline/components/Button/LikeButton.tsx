import {useMutation, useQueryClient} from '@tanstack/react-query';
import React from 'react';
import {createLikeApi, deleteLikeApi} from '@api/timeline/getLikes';
import {Heart} from '@assets/icons/inedx.ts';
import IconButton from '@components/common/Button/IconButton';
import PerformToast from '@utils/PerformToast';

type Props = {
    id: string;
    liked: boolean;
    count: number;
    onSuccess?: () => void;
};

function LikeButton({id, liked, count, onSuccess}: Props) {
    const queryClient = useQueryClient();

    const likeMutation = useMutation({
        mutationFn: () => createLikeApi({id}),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['posts']});
            queryClient.invalidateQueries({queryKey: ['post', id]});
            onSuccess?.();
        },
        onError: () => {
            PerformToast({msg: '좋아요 처리에 실패했습니다.', type: 'error'});
        }
    });

    const unlikeMutation = useMutation({
        mutationFn: () => deleteLikeApi({id}),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['posts']});
            queryClient.invalidateQueries({queryKey: ['post', id]});
            onSuccess?.();
        },
        onError: () => {
            PerformToast({msg: '좋아요 취소에 실패했습니다.', type: 'error'});
        }
    });

    const handleLike = () => {
        if (liked) {
            unlikeMutation.mutate();
        } else {
            likeMutation.mutate();
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
            <Heart className={liked ? 'fill-red-500' : ''} />
            <span>{count}</span>
        </IconButton>
    );
}

export default LikeButton;