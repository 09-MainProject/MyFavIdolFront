import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
// import "swiper/css/navigation";
import 'swiper/css/pagination';

function Home() {
  // swiper 임시
  const imgList = [
    '../src/img/swiper1.png',
    '../src/img/swiper2.png',
    '../src/img/swiper3.png',
  ];

  return (
    <div className="relative mx-auto min-h-[calc(100vh-5rem)] max-w-[108rem] md:min-h-[calc(100vh-8rem)]">
      <div className="mx-auto w-full max-w-screen-md">
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
                className="h-full w-full rounded-xl object-cover"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

export default Home;
