import React from 'react';
import DetailInfoItem from '@pages/schedule/components/Detail/DetailInfoItem.tsx';
import {formatDateTime} from '@utils/date.ts';
import {IdolSchedule} from '@/types/idolSchedule.ts';


type ScheduleContentProps = {
    schedule: IdolSchedule;
};

function ScheduleContent({schedule}: ScheduleContentProps) {
    return (
        <div className="space-y-6">
            <DetailInfoItem icon="📍" label="장소">
                {schedule.location}
            </DetailInfoItem>

            <DetailInfoItem icon="🕒" label="일시">
                {formatDateTime(schedule.start_date)} ~ {formatDateTime(schedule.end_date)}
            </DetailInfoItem>

            <DetailInfoItem icon="📝" label="상세 내용">
                <p className="whitespace-pre-wrap">{schedule.description}</p>
            </DetailInfoItem>
        </div>
    );
}

export default ScheduleContent;