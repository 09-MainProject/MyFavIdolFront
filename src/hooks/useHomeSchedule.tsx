import { useQueries } from '@tanstack/react-query';
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
  
  const scheduleQueries = useQueries({
    queries: sampledIdols.map(idol => ({
      queryKey: ['idolSchedule', idol.id],
      queryFn: () => idolSchedule(idol.id),
      enabled: !!idol?.id,
    })),
  }) as { data?: IdolScheduleItem[] }[];



  return { scheduleQueries };
}
