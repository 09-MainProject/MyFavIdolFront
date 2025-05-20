import {Link} from 'react-router';
import {useAuthStore} from '@store/authStore.ts';
import {useIdolState} from '@store/idolStore';
import CalendarWrapper from '@/components/common/Calendar/CalendarWrapper';

function Schedule() {
    const {followedIdols, selectedIdolId} = useIdolState();
    const {user, login} = useAuthStore();
    console.log(user);

    const publicIdols = [
        {
            id: 99,
            idolId: 99,
            title: 'K-POP 축제',
            type: '공연',
            startDate: '2025-05-25',
            endDate: '2025-05-25',
            location: '서울 월드컵 경기장!',
            description: 'K-POP 슈퍼 콘서트',
            img: '../src/assets/img/twice.jpg',
            name: '트와이스',
            enName: 'twice',
        },
    ];

    const selectedIdol = followedIdols.filter(idol => idol.id === selectedIdolId);
    const displayIdols = login ? selectedIdol : publicIdols;
    return (
        <section className="mt-20 px-2">
            {user.is_staff && (
                <div className="mb-4 flex gap-2">
                    <Link to="/schedule/create">
                        <button type="button" className="bg-blue-600 text-white px-4 py-2 rounded-md">일정 추가</button>
                    </Link>
                </div>
            )}
            <CalendarWrapper idols={displayIdols}/>
        </section>
    );
}

export default Schedule;
