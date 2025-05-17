import {api} from '@/lib/api.ts';
import {UserProfileResponse} from '@/types/auth.ts';

export const getUserProfileApi = async (): Promise<UserProfileResponse> => {
    const response = await api.get('users/profile');
    return response.data.data;
};