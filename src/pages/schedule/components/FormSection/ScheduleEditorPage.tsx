import {useQuery} from '@tanstack/react-query';
import {useLocation, useNavigate, useParams} from 'react-router';
import {detailScheduleApi} from '@api/schedules/getSchedules.ts';
import ScheduleForm from '@pages/schedule/components/FormSection/ScheduleForm.tsx';
import {api} from '@/lib/api.ts';
import {IdolSchedule} from '@/types/idolSchedule.ts';

type DetailScheduleResponse = {
    data: {
        schedule_view: IdolSchedule;
    };
};

function ScheduleEditorPage() {
    const {id: scheduleId} = useParams();
    const {state} = useLocation() as { state?: { idolId?: string } };
    const idolId = state?.idolId;
    const navigate = useNavigate();

    const {data: idolList} = useQuery({
        queryKey: ['idols'],
        queryFn: async () => {
            const res = await api.get('/idols');
            return res.data;
        },
    });

    const {data: scheduleData} = useQuery<DetailScheduleResponse>({
        queryKey: ['scheduleDetail', idolId, scheduleId],
        queryFn: () => detailScheduleApi(idolId!, scheduleId!),
        enabled: !!idolId && !!scheduleId,
    });

    if (!Array.isArray(idolList) || !scheduleData?.data?.schedule_view) {
        return <div>로딩 중...</div>;
    }

    const idols = idolList?.map((idol) => ({
        id: idol?.id,
        name: idol?.name,
    }));

    return (
        <ScheduleForm
            mode="edit"
            scheduleId={scheduleId}
            initialData={scheduleData.data.schedule_view}
            idols={idols}
            onAfterSubmit={() => navigate('/schedule')}
        />
    );
}

export default ScheduleEditorPage;
