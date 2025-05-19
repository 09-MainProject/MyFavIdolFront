import { useMutation, useQuery } from '@tanstack/react-query';
import { editUserProfile, getUserProfile } from '@/api/user/userProfileApi';
import type { userProfile } from '@/pages/signup/EditProfile';

export default function useProfile() {
  const { data: userProfileData, refetch: refetchUserProfile } = useQuery({
    queryKey: ['userProfile'],
    queryFn: getUserProfile,
  });

  const { mutate: editProfile } = useMutation({
    mutationFn: (body: userProfile) => editUserProfile(body),
  });

  return { userProfileData, refetchUserProfile, editProfile };
}
