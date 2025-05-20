import {useQueryClient} from '@tanstack/react-query';
import React from 'react';
import {Heart} from '@assets/icons/inedx.ts';
import IconButton from '@components/common/Button/IconButton.tsx';
import useLikeState from '@pages/timeline/components/hooks/useLikeState.tsx';
import PerformToast from '@utils/PerformToast.tsx';

type Props = {
    id: string;
    count: number;
    liked: boolean;
    is_deleted: boolean;
}

function LikeButton({id, count, is_deleted, liked}: Props) {
    const {createLikeMutation, deleteLikeMutation} = useLikeState();
    const queryClient = useQueryClient();

    const handleLike = async () => {
        if (is_deleted) return;
        try {
            if (liked) {
                await deleteLikeMutation.mutateAsync({id});
                PerformToast({msg: '좋아요 취소 성공', type: 'success'});
            } else {
                await createLikeMutation.mutateAsync({id});
                PerformToast({msg: '좋아요 성공', type: 'success'});
            }
            queryClient.invalidateQueries({queryKey: ['post', id]});
            queryClient.invalidateQueries({queryKey: ['posts']});
        } catch (error) {
            PerformToast({msg: '좋아요 실패', type: 'error'});
        }
    };

    return (
        <IconButton
            type="button"
            className={`flex items-center gap-1 transition-colors duration-200 ${
                liked ? 'text-red-500' : 'hover:text-red-500'
            } ${is_deleted ? 'opacity-50 cursor-not-allowed' : ''}`}
            onClick={handleLike}
            disabled={is_deleted || createLikeMutation.isPending || deleteLikeMutation.isPending}
        >
            <Heart/>
            {count}
        </IconButton>
    );
}

export default LikeButton;