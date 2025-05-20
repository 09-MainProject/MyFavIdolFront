import {format, isAfter, isEqual} from 'date-fns';
import {useEffect, useState} from 'react';
import Calendar, {TileArgs} from 'react-calendar';
import ScheduleList from '@pages/schedule/components/Card/ScheduleList.tsx';
import CalendarTileContent from '@/components/common/Calendar/CalendarTileContent';
import {IdolSchedule} from '@/types/idolSchedule';
import {toKoreaTime} from '@/utils/date';

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

type Props = {
    idols: IdolSchedule[];
};


function guessTypeFromTitle(title: string): '팬미팅' | '공연' | '방송' | 'Etc' {
    if (/팬.?미팅/i.test(title)) return '팬미팅';
    if (/공연|콘서트|쇼케이스/i.test(title)) return '공연';
    if (/방송|출연|예능|라디오|인터뷰/i.test(title)) return '방송';
    return 'Etc';
}

function CalendarWrapper({idols}: Props) {
    const [value, onChange] = useState<Value>(new Date());
    const [selectedDate, setSelectedDate] = useState<string | null>(null);

    useEffect(() => {
        if (value instanceof Date) {
            setSelectedDate(format(value, 'yyyy-MM-dd'));
        } else if (Array.isArray(value) && value[0]) {
            setSelectedDate(format(value[0], 'yyyy-MM-dd'));
        } else {
            setSelectedDate(null);
        }
    }, [value]);

    const selectedIdols = idols.filter((idol) => {
        const idolDate = format(toKoreaTime(idol.start_date), 'yyyy-MM-dd');
        return idolDate === selectedDate;
    });

    const upcomingIdols = idols.filter((idol) => {
        const start = toKoreaTime(idol.start_date);
        const now = new Date();
        return isAfter(start, now) || isEqual(start, now);
    });

    const makeTileContent = ({date}: TileArgs) => {
        const dateStr = format(date, 'yyyy-MM-dd');
        const filtered = idols.filter(
            (item) => format(toKoreaTime(item.start_date), 'yyyy-MM-dd') === dateStr
        );
        const types = filtered.map((item) => guessTypeFromTitle(item.title));

        return (
            <div className="flex h-full flex-col">
                <div className="mt-2 flex max-h-[100px] flex-col overflow-hidden">
                    {types.map((type) => (
                        <CalendarTileContent filterIdols={type} key={`${dateStr}-${type}`}/>
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
            <ScheduleList title="선택한 스케줄" schedules={selectedIdols} prefix="selected"/>
            <ScheduleList title="다가오는 스케줄" schedules={upcomingIdols} prefix="upcoming"/>
        </article>
    );
}

export default CalendarWrapper;
