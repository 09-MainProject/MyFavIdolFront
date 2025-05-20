import React from 'react';
import { Arrow } from '@assets/icons/inedx.ts';
import { IdolArtistsCard } from '@/types/idols';

type Props = {
  filterDate: IdolArtistsCard;
};

function NotificationInfoCardList({ filterDate }: Props) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-col gap-1">
        <p className="text-lg font-bold">
          {filterDate.type} & {filterDate.title}
        </p>
        <p className="truncate text-gray-500">{filterDate.description}</p>
        <p className="text-gray-500">
          {filterDate.location}: {filterDate.startDate} ~ {filterDate.endDate}
        </p>
      </div>
      <div>
        <Arrow />
      </div>
    </div>
  );
}

export default NotificationInfoCardList;
