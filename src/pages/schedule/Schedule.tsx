import {useQuery} from '@tanstack/react-query';
import {Link} from 'react-router';
import {getSchedulesApi} from '@api/schedules/getSchedules.ts';
import CalendarWrapper from '@components/common/Calendar/CalendarWrapper.tsx';
import {useAuthStore} from '@store/authStore.ts';
import {useIdolState} from '@store/idolStore';
import {toISODateString} from '@utils/date.ts';

function Schedule() {
    const today = toISODateString(new Date());
    const {selectedIdolId} = useIdolState();
    const {user} = useAuthStore();
    const {data} = useQuery({
        queryKey: ['idolSchedule', selectedIdolId, today],
        queryFn: () => getSchedulesApi(selectedIdolId.toString(), today)
    });

    const schedules = data?.data ?? [];

    return (
        <section className="mt-20 px-2">
            {user.is_staff && (
                <div className="mb-4 flex gap-2">
                    <Link to="/schedule/create">
                        <button type="button" className="bg-blue-600 text-white px-4 py-2 rounded-md">일정 추가</button>
                    </Link>
                </div>
            )}
            <CalendarWrapper idols={schedules}/>
        </section>
    );
}

export default Schedule;
