import { format, addDays } from 'date-fns';
import { useState } from 'react';
import { Autoplay, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { IdolCardList } from '@/components/common/Card/IdolCardList';
import 'swiper/css';
import 'swiper/css/pagination';
import { allIdolList } from '@/mocks/idolData';

function Home() {
  const imgList = [
    '../src/assets/img/swiper1.png',
    '../src/assets/img/swiper2.png',
    '../src/assets/img/swiper3.png',
  ];

  const [selectedDate, setSelectedDate] = useState(
    format(new Date(), 'yyyy-MM-dd')
  );

  const handleSelect = (offset: number) => {
    const newDate = format(addDays(new Date(), offset), 'yyyy-MM-dd');
    setSelectedDate(newDate);
  };

  const filtered = allIdolList.filter(item => item.startDate === selectedDate);

  return (
    <div className="px-4 md:px-8">
      <div className="mx-auto max-w-[1080px]">
        <div className="pt-20">
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
              if (offset === -1) label = '어제';
              else if (offset === 0) label = '오늘';
              else label = '내일';

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
          {filtered.length === 0 ? (
            <p className="text-center text-gray-500">
              해당 날짜에 스케줄이 없습니다.
            </p>
          ) : (
            <IdolCardList idolList={filtered} pageType="home" isVertical={false} />
          )}
        </section>
      </div>
    </div>
  );
}

export default Home;
