import { format, addDays } from 'date-fns';
import React, { useState, useRef, useEffect } from 'react';
import Calendar from 'react-calendar';

import { Link, useNavigate } from 'react-router-dom';
import { idolSchedule } from '@/api/idolApi';
import { IdolArtistsCard, IdolCardList } from '@/components/common/Card/IdolCardList';
import useIdolData from '@/hooks/useIdolData';
import useProfile from '@/hooks/useProfile';
import { useAuthStore } from '@/store/authStore';
import { userProfile } from './EditProfile';
// import Calendar from '@/components/Calendar';
// import TodaySchedule from '@/components/TodaySchedule';

function Profile() {
  const { login } = useAuthStore(); // 회원정보 갱신 때 setUser를 추가

  const imgRef = useRef<HTMLImageElement | null>(null);
  const [isImgError, setIsImgError] = useState(false);
  const { userProfileData }: { userProfileData: userProfile } = useProfile();
  const navigate = useNavigate();
    const { idolList } = useIdolData();
  
    const [schedules, setSchedules] = useState([]);

const [selectedDate, setSelectedDate] = useState(
    format(new Date(), 'yyyy-MM-dd')
  );
    // 스케줄 데이터를 모아서 하나의 배열로 평탄화
    useEffect(() => {
      const fetchSchedule = async () => {
        if (!idolList || idolList.length === 0) return;
        const results = await Promise.all(idolList.map(i => idolSchedule(i.id)));
        const merged = results.map(r => r.data).flat();
        setSchedules(merged);
        // const res = await idolSchedule(26);
        // setSchedules(res.data);
      };
      fetchSchedule();
    }, [idolList]);
  const handleSelect = (offset: number) => {
    const newDate = format(addDays(new Date(), offset), 'yyyy-MM-dd');
    setSelectedDate(newDate);
  };
    const formattedSchedules = schedules.map(schedule => {
  const matchedIdol = idolList.find(
    i => i.name.replace(/\s/g, '').toLowerCase() === schedule.idol_name.replace(/\s/g, '').toLowerCase()
  );


  return {
    id: schedule.id,
    idolId: matchedIdol?.id ?? -1,
    name: schedule.idol_name,
    img: matchedIdol?.img ?? '',
    title: schedule.title,
    type: '',
    startDate: format(schedule.start_date, 'yyyy-MM-dd'),
    endDate: schedule.end_date,
    location: schedule.location,
    description: schedule.description,
    enName: '',
  };
});

  const filtered = formattedSchedules.filter(item => 
    item.startDate === selectedDate
  );
    const handleScheduleDetailClick = (idolId: number, scheduleId: number) => {
    navigate(`/schedule/${scheduleId}`);
  };
  const handleCardClick = (idol: IdolArtistsCard) => {
    if (!login) {
      alert('로그인이 필요합니다.');
      navigate('/login');
      return;
    }

    navigate(`/idols/${idol.id}`);
  };
  useEffect(() => {
    if (!login) {
      navigate('/');
    }
  });

  return (
    <div>
      <div className="flex min-h-screen flex-col items-center bg-white px-4 pt-10">
        <div className="flex w-full max-w-3xl flex-col gap-6">
          {/* 경로 표시 */}
          <div className="flex items-center text-sm text-gray-600">
            <Link to="/" className="text-gray-600 hover:text-black">
              Home
            </Link>
            <span className="mx-2">{'>'}</span>
            <Link to="/schedule" className="text-gray-600 hover:text-black">
              일정 관리
            </Link>
            <span className="mx-2">{'>'}</span>
            <span className="font-semibold text-black">프로필</span>
          </div>

          <h2 className="text-2xl font-bold">프로필</h2>

          {userProfileData ? (
            <div className="flex items-center">
              <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-full bg-gray-300">
                <img
                  ref={imgRef}
                  src={userProfileData?.image_url}
                  alt="프로필"
                  className="h-full w-full object-cover"
                  onError={() => {
                    if (!isImgError) setIsImgError(true);
                  }}
                />
              </div>
              <div className="ml-4">
                <p className="text-lg font-semibold">
                  {userProfileData?.nickname}님 환영합니다
                </p>
              </div>
            </div>
          ) : (
            <div className="ml-4 text-sm text-gray-500">
              로그인 후 프로필을 확인할 수 있어요.
            </div>
          )}

          <div>
            <h3 className="mb-4 text-lg font-semibold">팬로그</h3>
            <div className="rounded-lg p-4 shadow-sm">
              <Calendar/>
              {/* <p>여기에 캘린더 컴포넌트 들어갈 예정</p> */}
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-semibold">오늘의 스케줄</h3>
            <div className="rounded-lg p-4 shadow-sm">
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
                            <IdolCardList
                              idolList={filtered as IdolArtistsCard[]}
                              pageType="home" isVertical
                              onCardClick={handleCardClick}
                              onDetailClick={(idolId, scheduleId) => handleScheduleDetailClick(idolId, scheduleId)}
                          />
              
                        )}
                      </section>
              {/* <p>여기에 오늘의 스케줄 컴포넌트 들어갈 예정</p> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
