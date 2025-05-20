import React from 'react';
import { Arrow } from '@assets/icons/inedx.ts';
import { IdolSchedule } from '@/types/idolSchedule.ts';
import { formatDateTime } from '@/utils/date';

type Props = {
    filterDate: IdolSchedule;
};

function NotificationInfoCardList({filterDate}: Props) {
    return (
        <div className="flex items-center justify-between">
            <div className="flex flex-col gap-1">
                <p className="text-lg font-bold">
                    {filterDate.idol_name} & {filterDate.title}
                </p>
                <p className="truncate text-gray-500">{filterDate.description}</p>
                <p className="text-gray-500">
                    {filterDate.location}: {formatDateTime(filterDate.start_date)} ~ {formatDateTime(filterDate.end_date)}
                </p>
            </div>
            <div>
                <Arrow/>
            </div>
        </div>
    );
}

export default NotificationInfoCardList;
