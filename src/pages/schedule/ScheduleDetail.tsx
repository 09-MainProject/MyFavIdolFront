import {useQuery} from '@tanstack/react-query';
import {useParams} from 'react-router';
import {useLocation, useNavigate} from 'react-router-dom';
import {detailScheduleApi} from '@api/schedules/getSchedules';
import DetailEditButton from '@pages/schedule/components/Detail/DetailEditButton.tsx';
import ScheduleContent from '@pages/schedule/components/Detail/ScheduleContent.tsx';
import ScheduleHeader from '@pages/schedule/components/Detail/ScheduleHeader.tsx';
import {useAuthStore} from '@store/authStore';

function ScheduleDetail() {
    const navigate = useNavigate();
    const {id: scheduleId} = useParams();
    const {state} = useLocation() as { state?: { idolId?: string; id?: string } };
    const {user} = useAuthStore();

    const idolId = state?.idolId;
    const detailId = state?.id;

    const {data: schedule, isError, isLoading} = useQuery({
        queryKey: ['scheduleDetail', idolId, detailId],
        queryFn: async () => {
            const res = await detailScheduleApi(idolId, detailId);
            return res.data.schedule_view;
        },
        enabled: !!idolId && !!detailId,
    });

    if (isLoading) return (
        <div className="flex h-screen items-center justify-center">
            <div className="text-lg text-gray-600">불러오는 중...</div>
        </div>
    );

    if (isError || !schedule) return (
        <div className="flex h-screen items-center justify-center">
            <div className="text-lg text-red-500">오류가 발생했습니다.</div>
        </div>
    );

    return (
        <section className="mt-24 px-4">
            <div className="rounded-lg bg-white p-8 shadow-lg">
                <ScheduleHeader title={schedule.title} idolName={schedule.idol_name}/>
                <ScheduleContent schedule={schedule}/>
                {user.is_staff && (
                    <DetailEditButton
                        scheduleId={scheduleId!}
                        idolId={idolId!}
                        onNavigate={(path, navState) => navigate(path, {state: navState})}
                    />
                )}
            </div>
        </section>
    );
}

export default ScheduleDetail;
