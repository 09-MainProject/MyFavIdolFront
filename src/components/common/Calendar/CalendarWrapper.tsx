import { format } from 'date-fns';
import { useState } from 'react';
import Calendar, { TileArgs } from 'react-calendar';
import { Idol } from '@store/idolStore';
import CalendarTileContent from '@/components/common/Calendar/CalendarTileContent.tsx';

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];
type Props = {
  idols: Idol[];
};

function CalendarWrapper({ idols }: Props) {
  const [value, onChange] = useState<Value>(new Date());

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
    </article>
  );
}

export default CalendarWrapper;
