import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
// import "swiper/css/navigation";
import 'swiper/css/pagination';
import { format, subDays, addDays } from 'date-fns';
import CardFrame from '../../components/CardFrame';

function Home() {
  // swiper 임시
  const imgList = [
    '../src/assets/img/swiper1.png',
    '../src/assets/img/swiper2.png',
    '../src/assets/img/swiper3.png',
  ];

  interface Schedule {
    idolName: string;
    idolImage: string;
    title: string;
    date: string;
  }

  const mockSchedule: Schedule[] = [
    {
      // 오늘
      idolName: '보이넥스트도어',
      idolImage: '../src/assets/img/boynextdoor.jpeg',
      title: '예능 방송',
      date: format(new Date(), 'yyyy-MM-dd'),
    },
    {
      // 오늘
      idolName: '보이넥스트도어',
      idolImage: '../src/assets/img/boynextdoor.jpeg',
      title: '공연',
      date: format(new Date(), 'yyyy-MM-dd'),
    },
    {
      // 오늘
      idolName: '보이넥스트도어',
      idolImage: '../src/assets/img/boynextdoor.jpeg',
      title: '팬사인',
      date: format(new Date(), 'yyyy-MM-dd'),
    },
    {
      // 오늘
      idolName: '보이넥스트도어',
      idolImage: '../src/assets/img/boynextdoor.jpeg',
      title: '머없음',
      date: format(new Date(), 'yyyy-MM-dd'),
    },
    {
      // 어제
      idolName: '엔시티',
      idolImage: '../src/assets/img/ncity.jpeg',
      title: '뮤직쇼 녹화',
      date: format(subDays(new Date(), 1), 'yyyy-MM-dd'),
    },
    {
      // 내일
      idolName: '보이넥스트도어',
      idolImage: '',
      title: '라이브 방송',
      date: format(addDays(new Date(), 1), 'yyyy-MM-dd'),
    },
  ];

  const [selectedDate, setSelectedDate] = useState(
    format(new Date(), 'yyyy-MM-dd')
  );

  const handleSelect = (offset: number) => {
    const newDate = format(addDays(new Date(), offset), 'yyyy-MM-dd');
    setSelectedDate(newDate);
  };

  const filtered = mockSchedule.filter(item => item.date === selectedDate);

  return (
    <div className="px-4 md:px-8">
      <div className="mx-auto max-w-[1080px]">
        <div className="pt-12">
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={20}
            slidesPerView={1}
            autoplay={{ delay: 3000 }}
            pagination={{ clickable: true }}
            loop
          >
            {imgList.map(src => (
              <SwiperSlide key={src}>
                <img
                  src={src}
                  alt={`swiper${src}`}
                  className="h-auto w-full rounded-xl object-cover"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <section className="mt-20">
          <div className="mb-8">
            <h4 className="mt-2 text-[2.5rem] leading-tight font-bold">
              Today Schedule
            </h4>
            <p className="mt-2 text-[1.2rem] text-gray-700">
              오늘 가장 핫한 케이팝 스케줄은?
            </p>
          </div>

          <div className="mb-10 flex justify-center gap-16 text-[1.2rem]">
            {[-1, 0, 1].map(offset => {
              const targetDate = addDays(new Date(), offset);
              const dateString = format(targetDate, 'yyyy-MM-dd');
              const day = format(targetDate, 'd');
              const isSelected = selectedDate === dateString;

              let label = '';
              if (offset === -1) {
                label = '어제';
              } else if (offset === 0) {
                label = '오늘';
              } else {
                label = '내일';
              }
              return (
                <div key={offset} className="flex flex-col items-center gap-2">
                  <span className="text-[1.2rem] text-gray-600">{label}</span>
                  <button
                    type="button"
                    onClick={() => handleSelect(offset)}
                    className={`h-10 w-10 rounded-md border text-[1.2rem] font-semibold transition-colors duration-200 ${isSelected ? 'border-red-500 text-red-500' : 'border-gray-300 text-gray-800'}`}
                  >
                    {day}
                  </button>
                </div>
              );
            })}
          </div>
          <div className="grid grid-cols-2 gap-10 md:grid-cols-4">
            {filtered.map(item => (
              <CardFrame key={item.title}>
                <img
                  src={item.idolImage}
                  alt={item.title}
                  className="h-auto w-full object-cover"
                />
                <div className="p-3 text-center">
                  <p className="mb-1 text-[1.1rem] font-semibold">
                    {item.idolName}
                  </p>
                  <p className="text-[0.9rem] text-gray-500">{item.title}</p>
                  <p className="text-[0.8rem] text-gray-400">{item.date}</p>
                </div>
              </CardFrame>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export default Home;
