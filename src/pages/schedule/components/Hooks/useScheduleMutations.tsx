import {useMutation, useQueryClient} from '@tanstack/react-query';
import {createScheduleApi, deleteScheduleApi, updateScheduleApi} from '@api/schedules/getSchedules.ts';
import PerformToast from '@utils/PerformToast.tsx';
import {IdolScheduleRequest} from '@/types/idolSchedule.ts';

interface Props {
    idolId: string;
    scheduleId?: string;
    onSuccess?: () => void;
}

function useScheduleMutations({idolId, scheduleId, onSuccess}: Props) {
    const queryClient = useQueryClient();
    const createMutation = useMutation({
        mutationFn: (data: IdolScheduleRequest) => createScheduleApi(data, idolId),
        onSuccess: () => {
            PerformToast({msg: '스케줄 등록 성공', type: 'success'});
            onSuccess?.();
        },
        onError: () => {
            PerformToast({msg: '스케줄 등록 실패', type: 'error'});
        }
    });

    const updateMutation = useMutation({
        mutationFn: (data: IdolScheduleRequest) => {
            if (!scheduleId) throw new Error('스케줄 ID 없음');
            return updateScheduleApi(data, idolId, scheduleId);
        },
        onSuccess: () => {
            PerformToast({msg: '스케줄 수정 성공', type: 'success'});
            queryClient.invalidateQueries({queryKey: ['idolSchedule', idolId]});
            onSuccess?.();
        },
        onError: () => {
            PerformToast({msg: '스케줄 수정 실패', type: 'error'});
        }
    });

    const deleteMutation = useMutation({
        mutationFn: () => {
            if (!scheduleId) throw new Error('스케줄 ID 없음');
            return deleteScheduleApi(idolId, scheduleId);
        },
        onSuccess: () => {
            PerformToast({msg: '스케줄 삭제 성공', type: 'success'});
            onSuccess?.();
        },
        onError: () => {
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
