import React, {useCallback} from 'react';
import useScheduleMutations from '@pages/schedule/components/Hooks/useScheduleMutations.tsx';
import {IdolScheduleRequest} from '@/types/idolSchedule.ts';

interface Props {
    form: IdolScheduleRequest & { idolId: string };
    scheduleId?: string;
    mode: 'create' | 'edit';
    onAfterSubmit?: () => void;
    onSuccess?: () => void;
}

function useScheduleHandlers({form, mode, scheduleId, onAfterSubmit}: Props) {
    const {createMutation, updateMutation, deleteMutation} = useScheduleMutations({
        idolId: form.idolId,
        scheduleId,
        onSuccess: onAfterSubmit,
    });

    const {
        title,
        description,
        location,
        start_date,
        end_date,
        idolId,
    } = form;

    const handleSubmit = useCallback(
        (e: React.FormEvent) => {
            e.preventDefault();

            if (!idolId) {
                alert('아이돌을 선택해주세요.');
                return;
            }

            const startDate = new Date(start_date);
            const endDate = new Date(end_date);

            if (endDate <= startDate) {
                alert('종료 일시는 시작 일시보다 이후여야 합니다.');
                return;
            }

            const payload = {
                title,
                description,
                location,
                start_date: startDate.toISOString(),
                end_date: endDate.toISOString(),
            };

            if (mode === 'create') {
                e.preventDefault();
                createMutation.mutate(payload);
            } else {
                e.preventDefault();
                updateMutation.mutate(payload);
            }
        },
        [title, description, location, start_date, end_date, idolId, mode, createMutation, updateMutation]
    );

    const handleDelete = useCallback(() => {
        if (!scheduleId) return;
        // eslint-disable-next-line no-restricted-globals
        if (confirm('정말 삭제하시겠습니까?')) {
            deleteMutation.mutate();
        }
    }, [deleteMutation, scheduleId]);

    return {
        handleSubmit,
        handleDelete,
    };
}

export default useScheduleHandlers;
