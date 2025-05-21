import {api} from '@/lib/api.ts';
import {
    IdolSchedule,
    IdolScheduleCreateResponse,
    IdolScheduleDetailResponse,
    IdolScheduleRequest
} from '@/types/idolSchedule.ts';

export const getSchedulesApi = async (idol_id: string, startDate?: string, endDate?: string): Promise<IdolScheduleCreateResponse> => {
    const response = await api.get(`/idols/${idol_id}/schedules`, {
        params: {
            start_date: startDate,
            end_date: endDate,
        }
    });
    return response.data;
};

export const createScheduleApi = async (data: IdolScheduleRequest, idol_id: string): Promise<IdolSchedule> => {
    const response = await api.post(`/idols/${idol_id}/schedules`, data);
    return response.data;
};

export const detailScheduleApi = async (idol_id: string, id: string): Promise<IdolScheduleDetailResponse> => {
    const response = await api.get(`/idols/${idol_id}/schedules/${id}`);
    return response.data;
};

export const updateScheduleApi = async (data: IdolScheduleRequest, idol_id: string, id: string): Promise<IdolSchedule> => {
    const response = await api.patch(`/idols/${idol_id}/schedules/${id}`, data);
    return response.data;
};

export const deleteScheduleApi = async (idol_id: string, id: string): Promise<void> => {
    await api.delete(`/idols/${idol_id}/schedules/${id}`);
};