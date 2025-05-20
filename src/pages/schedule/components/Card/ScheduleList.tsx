import {Link} from 'react-router';
import NotificationCard from '@components/common/Card/NotificationCard.tsx';
import NotificationInfoCardList from '@components/common/Card/NotificationInfoCardList.tsx';
import {IdolSchedule} from '@/types/idolSchedule.ts';

type Props = {
    title: string;
    schedules: IdolSchedule[];
    prefix: string;
};

function ScheduleList({title, schedules, prefix}: Props) {
    if (schedules.length === 0) return null;
    return (
        <>
            <h3 className="mt-12 text-2xl font-bold">{title}</h3>
            {schedules.map((idol) => (
                <NotificationCard key={`${prefix}-${idol.id}`}>
                    <Link
                        to={`/schedule/${idol.id}`}
                        state={{idolId: idol.idol.toString(), id: idol.id}}
                    >
                        <NotificationInfoCardList filterDate={idol}/>
                    </Link>
                </NotificationCard>
            ))}
        </>
    );
}

export default ScheduleList;