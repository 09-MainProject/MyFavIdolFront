import { format, add } from 'date-fns';
import { api } from '@/lib/api';

const today = new Date();
const yesterday = format(add(today, { days: -2 }), 'yyyy-MM-dd');
const tomorrow = format(add(today, { days: 2 }), 'yyyy-MM-dd');

// 아이돌 전체 목록 조회 
export async function getIdolList(){
  const res = await api.get('/idols');
  return res.data;
}

// 팔로우 목록 조회
export async function getFollowedIdolList(){
    const res = await api.get('/idols/follows');
    return res.data;
}

// 팔로우 삭제
export async function unfollowIdol(id:number){
    await api.delete(
        `/idols/${id}/follows`
      );
}

// 팔로우 상태 확인
export async function checkFollowState(id:number){
    const res = await api.get(
      `/idols/${id}/follow-status`
    );
    return res.data.data.is_following;
}

// 팔로우 
export async function followIdol(id:number){
    await api.post(
        `/idols/${id}/follows`
      );
}

// 관리자기능 - 아이돌 삭제 
export async function deleteIdol(id:number){
    await api.delete(`/idols${id}`);
}
// 아이돌 상세 정보 
export async function getIdolDetailData(id:number){
  const res = await api.get(`/idols${id}`);
    return res.data;
}
// 아이돌 스케줄 목록 조회
export async function idolSchedule(id: number) {
  // console.log('idolSchedule called with:', id);
  const res = await api.get(`/idols/${id}/schedules?start_date=${yesterday}&end_date=${tomorrow}`);
  return res.data;
}