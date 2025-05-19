import { format } from 'date-fns';
import { useEffect, useState } from 'react';
import Calendar, { TileArgs } from 'react-calendar';

import { Link } from 'react-router';
import NotificationCard from '@components/common/Card/NotificationCard';
import NotificationInfoCardList from '@components/common/Card/NotificationInfoCardList';
import { Idol } from '@store/idolStore';
import CalendarTileContent from '@/components/common/Calendar/CalendarTileContent';

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];
type Props = {
  idols: Idol[];
};

function CalendarWrapper({ idols }: Props) {
  const [value, onChange] = useState<Value>(new Date());
  const today = format(new Date(), 'yyyy-MM-dd');
  const [selectedDate, setSelectedDate] = useState<
    Date | string | null | number
  >(null);
  const selectedIdol = idols.filter(idol => idol.startDate === selectedDate);
  const upcomingIdols = idols.filter(idol => idol.startDate >= today);

  useEffect(() => {
    if (value instanceof Date) {
      setSelectedDate(format(value, 'yyyy-MM-dd'));
    } else if (Array.isArray(value)) {
      setSelectedDate(format(value[0], 'yyyy-MM-dd'));
    } else {
      setSelectedDate(null);
    }
  }, [value]);

  const makeTileContent = ({ date }: TileArgs) => {
    const titleDate = format(date, 'yyyy-MM-dd');
    const filteredIdols = idols.filter(item => item.startDate === titleDate);
    const types = filteredIdols.map(item => item.type);
    return (
      <div className="flex h-full flex-col">
        <div className="mt-2 flex max-h-[100px] flex-col overflow-hidden">
          {types.map(type => (
            <CalendarTileContent filterIdols={type} key={type} />
          ))}
        </div>
      </div>
    );
  };

  return (
    <article>
      <Calendar
        locale="ko"
        value={value}
        onChange={onChange}
        tileContent={makeTileContent}
      />
      <h3 className="mt-12 text-2xl font-bold">선택한 스케줄</h3>
      {selectedIdol?.map(idol => (
        <NotificationCard key={idol.id}>
          <Link to={idol.id.toString()}>
            <NotificationInfoCardList filterDate={idol} />
          </Link>
        </NotificationCard>
      ))}
      <h3 className="mt-12 text-2xl font-bold">다가오는 스케줄</h3>
      {upcomingIdols?.map(idol => (
        <NotificationCard key={`upcoming-${idol.id}`}>
          <Link to={idol.id.toString()}>
            <NotificationInfoCardList filterDate={idol} />
          </Link>
        </NotificationCard>
      ))}
    </article>
  );
}

export default CalendarWrapper;
