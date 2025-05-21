import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React from 'react';
import { checkFollowState, deleteIdol, followIdol, getFollowedIdolList, getIdolDetailData, getIdolList, unfollowIdol } from '@/api/idolApi';
import { useIdolState } from '@/store/idolStore';

export default function useIdolData(idolDetailId?:number){
    const queryClient = useQueryClient();
    const { setFollowedIdols } = useIdolState();

    // 전체 idol 리스트 받아오는 쿼리
    const {data:idolList, isSuccess : isIdolListReady}= useQuery({
        queryKey:['idolList'],
        queryFn: getIdolList,
        select: (data) =>data.map((item) => ({
            id: item.id,
            name: item.name,
            img: item.image_url,
            isVertical: item.is_vertical,
        }))
    });

    // 팔로우 리스트 받아오는 쿼리 
    const {data:followedIdol} = useQuery({
        queryKey:['followedIdol'],
        queryFn: getFollowedIdolList,
        enabled: isIdolListReady && !!idolList,
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
        }
    }, [followedIdol, setFollowedIdols]);

    const {mutate:unfollowIdolById} = useMutation({
        mutationFn: (id:number)=>unfollowIdol(id),
        onSuccess: () => {
            // 삭제 후, follow 리스트 다시 불러오기
            queryClient.invalidateQueries({ queryKey: ['followedIdol'] });
        },
        onError: (err) => {
            console.error('삭제 실패', err);
        },
    });

    const { mutate: followIdolById } = useMutation({
        mutationFn: (id:number)=>followIdol(id),
        onSuccess: () => {
            // 팔로우 후 follow 리스트 다시 불러오기
            queryClient.invalidateQueries({ queryKey: ['followedIdol'] });
        },
    });

    async function handleFollowState(id:number){
        // 팔로우 상태 확인 
        const isFollowed = await checkFollowState(id);
        // 팔로우 되어있을 경우만 삭제 
        if (isFollowed) {
            unfollowIdolById(id);
        } else {
            followIdolById(id);
        }        
    }

    const {mutate: deleteIdolList} = useMutation({
        mutationFn:(id:number) => deleteIdol(id),
        onSuccess: (data,variables) => {
            // _data는 deleteIdol의 반환값
            // variables는 mutate(id)로 넘긴 값
            // 팔로우 후 follow 리스트 다시 불러오기
            queryClient.invalidateQueries({ queryKey: ['idolList'] });
            // 내 팔로우 목록에서 제거 (사실 백엔드 오류임 => 아이돌 삭제를 했을  때 유저 팔로워 목록에서 안사라짐)
            unfollowIdolById(variables);
        },
    });

    const { data: idolDetailData , isLoading:loadingIdolDetailData} = useQuery({
        queryKey: ['idolDetail', idolDetailId],
        queryFn: ()=>getIdolDetailData(idolDetailId),
        enabled: !!idolDetailId,
    });

    return {idolList,followedIdol,handleFollowState,deleteIdolList,idolDetailData,loadingIdolDetailData};
}

