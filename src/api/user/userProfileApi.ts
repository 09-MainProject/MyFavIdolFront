import { api } from '@/lib/api';
import type {
  EditUserProfileResponse,
  userProfile,
} from '@/pages/signup/EditProfile';

// 유저 정보 조회
export async function getUserProfile() {
  const res = await api.get('/users/profile');
  const { data } = res.data;

  return {
    ...data,
    imageUrl: data.imageUrl ?? '/default-profile.png',
  };
}

// 유저 프로필 수정
export async function editUserProfile(
  body: userProfile
): Promise<EditUserProfileResponse> {
  const res = await api.patch('/users/profile', body);
  return res.data.data;
}
