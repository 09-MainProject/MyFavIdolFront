import React from 'react';

type Props = {
  filterIdols: string;
};

const TYPE_LABEL = {
  팬미팅: { color: 'bg-blue-500' },
  공연: { color: 'bg-red-500' },
  방송: { color: 'bg-green-500' },
  Etc: { color: 'bg-gray-400' },
};

function CalendarTileContent({ filterIdols }: Props) {
  const type = TYPE_LABEL[filterIdols];

  return (
    <div>
      <span className={`text-white ${type.color} p-2`}>{filterIdols}</span>
    </div>
  );
}

export default CalendarTileContent;
