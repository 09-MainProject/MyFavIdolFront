import {useMutation, useQueryClient} from '@tanstack/react-query';
import {addMonths, subMonths} from 'date-fns';
import {createScheduleApi, deleteScheduleApi, updateScheduleApi} from '@api/schedules/getSchedules.ts';
import {toISODateString} from '@utils/date.ts';
import PerformToast from '@utils/PerformToast.tsx';
import {IdolScheduleRequest} from '@/types/idolSchedule.ts';

interface Props {
    idolId: string;
    scheduleId?: string;
    onSuccess?: () => void;
}

function useScheduleMutations({idolId, scheduleId, onSuccess}: Props) {
    const queryClient = useQueryClient();
    const today = new Date();
    const startDate = toISODateString(subMonths(today, 1));
    const endDate = toISODateString(addMonths(today, 1));

    const createMutation = useMutation({
        mutationFn: async (data: IdolScheduleRequest) => {
            try {
                return await createScheduleApi(data, idolId);
            } catch (error) {
                console.error('일정 생성 중 오류 발생:', error);
                throw error;
            }
        },
        onSuccess: async () => {
            try {
                await queryClient.invalidateQueries({queryKey: ['idolSchedule', idolId, startDate, endDate]});
                PerformToast({msg: '스케줄 등록 성공', type: 'success'});
                onSuccess?.();
            } catch (error) {
                console.error('캐시 갱신 중 오류 발생:', error);
                PerformToast({msg: '스케줄 등록은 성공했으나 화면 갱신에 실패했습니다', type: 'warning'});
            }
        },
        onError: (error) => {
            console.error('일정 생성 실패:', error);
            PerformToast({msg: '스케줄 등록 실패', type: 'error'});
        }
    });

    const updateMutation = useMutation({
        mutationFn: async (data: IdolScheduleRequest) => {
            if (!scheduleId) throw new Error('스케줄 ID 없음');
            try {
                return await updateScheduleApi(data, idolId, scheduleId);
            } catch (error) {
                console.error('일정 수정 중 오류 발생:', error);
                throw error;
            }
        },
        onSuccess: async () => {
            try {
                await queryClient.invalidateQueries({queryKey: ['idolSchedule', idolId, startDate, endDate]});
                PerformToast({msg: '스케줄 수정 성공', type: 'success'});
                onSuccess?.();
            } catch (error) {
                console.error('캐시 갱신 중 오류 발생:', error);
                PerformToast({msg: '스케줄 수정은 성공했으나 화면 갱신에 실패했습니다', type: 'warning'});
            }
        },
        onError: (error) => {
            console.error('일정 수정 실패:', error);
            PerformToast({msg: '스케줄 수정 실패', type: 'error'});
        }
    });

    const deleteMutation = useMutation({
        mutationFn: async () => {
            if (!scheduleId) throw new Error('스케줄 ID 없음');
            try {
                return await deleteScheduleApi(idolId, scheduleId);
            } catch (error) {
                console.error('일정 삭제 중 오류 발생:', error);
                throw error;
            }
        },
        onSuccess: async () => {
            try {
                await queryClient.invalidateQueries({queryKey: ['idolSchedule', idolId, startDate, endDate]});
                PerformToast({msg: '스케줄 삭제 성공', type: 'success'});
                onSuccess?.();
            } catch (error) {
                console.error('캐시 갱신 중 오류 발생:', error);
                PerformToast({msg: '스케줄 삭제는 성공했으나 화면 갱신에 실패했습니다', type: 'warning'});
            }
        },
        onError: (error) => {
            console.error('일정 삭제 실패:', error);
            PerformToast({msg: '스케줄 삭제 실패', type: 'error'});
        }
    });

    return {
        createMutation,
        updateMutation,
        deleteMutation,
    };
}

export default useScheduleMutations;
