import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import React from 'react';
import PerformToast from '@utils/PerformToast';
import {
    checkFollowState,
    deleteIdol,
    followIdol,
    getFollowedIdolList,
    getIdolDetailData,
    getIdolList,
    unfollowIdol
} from '@/api/idolApi';
import {useAuthStore} from '@/store/authStore';
import {useIdolState} from '@/store/idolStore';



const MAX_FOLLOWS = 3;

export default function useIdolData(idolDetailId?: number) {
    const queryClient = useQueryClient();
    const {setFollowedIdols} = useIdolState();
    const {login} = useAuthStore();

    // 전체 idol 리스트 받아오는 쿼리
    const {data: idolList, isSuccess: isIdolListReady} = useQuery({
        queryKey: ['idolList'],
        queryFn: getIdolList,
        select: (data) => data.map((item) => ({
            id: item.id,
            name: item.name,
            img: item.image_url,
            isVertical: item.is_vertical,
        }))
    });

    // 팔로우 리스트 받아오는 쿼리 
    const {data: followedIdol} = useQuery({
        queryKey: ['followedIdol'],
        queryFn: getFollowedIdolList,
        enabled: isIdolListReady && !!idolList && login,
        select: (data) =>
            data.map((item) => ({
                id: item.idol.id,
                name: item.idol.name,
                img: item.idol.image_url ?? '',
            }))
    });

    // 팔로우 리스트가 변경될 때마다 상태 업데이트
    React.useEffect(() => {
        if (followedIdol) {
            setFollowedIdols(followedIdol);
        } else {
            setFollowedIdols([]);
        }
    }, [followedIdol, setFollowedIdols]);

    const {mutate: unfollowIdolById} = useMutation({
        mutationFn: (id: number) => unfollowIdol(id),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['followedIdol']});
        },
        onError: (err) => {
            console.error('삭제 실패', err);
        },
    });

    const {mutate: followIdolById} = useMutation({
        mutationFn: (id: number) => followIdol(id),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['followedIdol']});
        },
    });

    async function handleFollowState(id: number) {
        if (!login) {
            PerformToast({msg: '로그인이 필요한 서비스입니다.', type: 'warning'});
            return;
        }

        // 팔로우 상태 확인 
        const isFollowed = await checkFollowState(id);

        if (isFollowed) {
            unfollowIdolById(id);
        } else {
            // 팔로우 수 체크
            if (followedIdol && followedIdol.length >= MAX_FOLLOWS) {
                PerformToast({msg: `최대 ${MAX_FOLLOWS}명까지만 팔로우할 수 있습니다.`, type: 'warning'});
                return;
            }
            followIdolById(id);
        }
    }

    const {mutate: deleteIdolList} = useMutation({
        mutationFn: (id: number) => deleteIdol(id),
        onSuccess: (data, variables) => {
            queryClient.invalidateQueries({queryKey: ['idolList']});
            unfollowIdolById(variables);
        },
    });

    const {data: idolDetailData, isLoading: loadingIdolDetailData} = useQuery({
        queryKey: ['idolDetail', idolDetailId],
        queryFn: () => getIdolDetailData(idolDetailId),
        enabled: !!idolDetailId,
    });

    return {idolList, followedIdol, handleFollowState, deleteIdolList, idolDetailData, loadingIdolDetailData};
}

