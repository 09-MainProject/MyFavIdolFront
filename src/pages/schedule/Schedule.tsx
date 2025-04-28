import { useIdolState } from '@store/idolStore';
import CalendarWrapper from '@/components/common/Calendar/CalendarWrapper';

function Schedule() {
  const { idols, selectedIdolId } = useIdolState();
  const isLogin = true;

  const publicIdols = [
    {
      id: 99,
      idolId: 99,
      title: 'K-POP 축제',
      type: '공연',
      startDate: '2025-05-25',
      endDate: '2025-05-25',
      location: '서울 월드컵 경기장',
      description: 'K-POP 슈퍼 콘서트',
    },
  ];

  const selectedIdol = idols.filter(idol => idol.id === selectedIdolId);
  const displayIdols = isLogin ? selectedIdol : publicIdols;
  return (
    <section className="mt-20 px-2">
      <CalendarWrapper idols={displayIdols} />
    </section>
  );
}

export default Schedule;
