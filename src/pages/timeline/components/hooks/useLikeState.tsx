import {useMutation} from '@tanstack/react-query';
import {createLikeApi, deleteLikeApi} from '@api/timeline/getLikes.ts';
import PerformToast from '@utils/PerformToast.tsx';
import {LikePostCreateRequest, LikePostCreateResponse, LikePostDeleteRequest} from '@/types/like.ts';

function useLikeState() {
    const createLikeMutation = useMutation<LikePostCreateResponse, Error, LikePostCreateRequest>({
        mutationFn: (data) => createLikeApi(data),
        onSuccess: () => {
            PerformToast({msg: '좋아요 성공', type: 'success'});
        },
        onError: () => {
            PerformToast({msg: '좋아요 실패', type: 'error'});
        },
    });

    const deleteLikeMutation = useMutation<void, Error, LikePostDeleteRequest>({
        mutationFn: (data) => deleteLikeApi(data),
        onSuccess: () => {
            PerformToast({msg: '좋아요 취소 성공', type: 'success'});
        },
        onError: () => {
            PerformToast({msg: '좋아요 취소 실패', type: 'error'});
        }
    });
    return {createLikeMutation, deleteLikeMutation};
}

export default useLikeState;
