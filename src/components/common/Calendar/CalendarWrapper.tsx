import { format } from 'date-fns';
import { useEffect, useState } from 'react';
import Calendar, { TileArgs } from 'react-calendar';
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
  const [selectedDate, setSelectedDate] = useState<Date | string | number>(
    null
  );
  const selectedIdol = idols.filter(idol => idol.startDate === selectedDate);

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
    const filtered = idols.filter(item => item.startDate === titleDate);
    const type = filtered.map(item => item.type);
    return (
      <div className="flex h-full flex-col">
        <div className="mt-2 flex max-h-[100px] flex-col overflow-hidden">
          {type.map(item => (
            <CalendarTileContent filterIdols={item} key={item} />
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
      {selectedIdol?.map(idol => (
        <NotificationCard key={idol.id}>
          <NotificationInfoCardList filterDate={idol} />
        </NotificationCard>
      ))}
    </article>
  );
}

export default CalendarWrapper;
