import { useQueries } from '@tanstack/react-query';
import { format, addDays } from 'date-fns';
import { idolSchedule } from '@/api/idolApi';
import useIdolData from './useIdolData';


type IdolScheduleItem = {
  id: number;
  idol: { id: number };
  idolId: number;
  idol_name: string;
  img: string;
  title: string;
  start_date: string;
  end_date: string;
  location: string;
  description: string;
};

export default function useHomeSchedule() {
  const { idolList } = useIdolData();
  
  const sampledIdols = (idolList ?? []).sort(() => 0.5 - Math.random()).slice(0, 5);
  
  const validDates = [
    format(addDays(new Date(), -1), 'yyyy-MM-dd'),
    format(new Date(), 'yyyy-MM-dd'),
    format(addDays(new Date(), 1), 'yyyy-MM-dd'),
  ];
  
  // console.log(idolList.map((i)=> i));
  const scheduleQueries = useQueries({
    queries: sampledIdols.map(idol => ({
      queryKey: ['idolSchedule', idol.id],
      queryFn: () => idolSchedule(idol.id),
      enabled: !!idol?.id,
      select: (data: IdolScheduleItem[]) =>
        data.filter(schedule =>
          validDates.includes(format(new Date(schedule.start_date), 'yyyy-MM-dd'))
        ),
    })),
  }) as { data?: IdolScheduleItem[] }[];



  return { scheduleQueries };
}
