import {useMutation, useQueryClient} from '@tanstack/react-query';
import {createLikeApi, deleteLikeApi} from '@api/timeline/getLikes';
import PerformToast from '@utils/PerformToast';
import {LikePostCreateRequest, LikePostCreateResponse, LikePostDeleteRequest} from '@/types/like';

function useLikeState() {
    const queryClient = useQueryClient();
    const createLikeMutation = useMutation<LikePostCreateResponse, Error, LikePostCreateRequest>({
        mutationFn: (data) => createLikeApi(data),
        onSuccess: () => {
            PerformToast({msg: '좋아요 성공', type: 'success'});
            queryClient.invalidateQueries({queryKey: ['posts']});
        },
        onError: () => {
            PerformToast({msg: '좋아요 실패', type: 'error'});
        },
    });

    const deleteLikeMutation = useMutation<void, Error, LikePostDeleteRequest>({
        mutationFn: (data) => deleteLikeApi(data),
        onSuccess: () => {
            PerformToast({msg: '좋아요 취소 성공', type: 'success'});
            queryClient.invalidateQueries({queryKey: ['posts']});

        },
        onError: () => {
            PerformToast({msg: '좋아요 취소 실패', type: 'error'});
        }
    });
    return {createLikeMutation, deleteLikeMutation};
}

export default useLikeState;
