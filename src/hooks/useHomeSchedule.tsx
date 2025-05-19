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
  
  // console.log(idolList.map((i)=> i));
  const scheduleQueries = useQueries<{
    data: IdolScheduleItem[];
  }[]>({
    queries: (idolList ?? []).map((idol) => ({
      queryKey: ['idolSchedule', idol.id],
      queryFn: () => idolSchedule(idol.id),
      enabled: !!idol?.id,
    })),
  });

  return { scheduleQueries };
}
