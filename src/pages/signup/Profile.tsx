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
import 'react-calendar/dist/Calendar.css';

function Profile() {
  const { login } = useAuthStore();
  const imgRef = useRef<HTMLImageElement | null>(null);
  const [isImgError, setIsImgError] = useState(false);
  const { userProfileData }: { userProfileData: userProfile } = useProfile();
  const navigate = useNavigate();
  const { idolList } = useIdolData();
  const [schedules, setSchedules] = useState([]);
  const [selectedDate, setSelectedDate] = useState(format(new Date(), 'yyyy-MM-dd'));

  useEffect(() => {
    const fetchSchedule = async () => {
      if (!idolList || idolList.length === 0) return;
      const results = await Promise.all(idolList.map(i => idolSchedule(i.id)));
      const merged = results.map(r => r.data).flat();
      setSchedules(merged);
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

  const filtered = formattedSchedules.filter(item => item.startDate === selectedDate);

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
  }, [login, navigate]);

  return (
<div className="flex min-h-screen items-center justify-center bg-white px-4">
  <div className="w-full max-w-3xl space-y-12 rounded-xl border border-gray-200 bg-white px-10 py-16 shadow-sm">

        {/* 프로필 */}
<div className="flex flex-col items-center text-center gap-4">
  <div className="relative h-20 w-20 overflow-hidden rounded-full bg-gray-200">
    <img
      ref={imgRef}
      src={userProfileData?.image_url || '/default.png'}
      alt="프로필 이미지"
      className="h-full w-full object-cover"
      onError={() => !isImgError && setIsImgError(true)}
    />
  </div>
  <p className="text-xl font-semibold text-gray-800">
    {userProfileData?.nickname}님 환영합니다
  </p>
</div>

<hr className="border-t border-gray-200" />


      <div className="space-y-4">
  <h3 className="text-xl font-bold text-gray-800 text-center">팬로그</h3>
  <div className="flex justify-center">
    <div className="rounded-lg p-4 shadow-sm">
      <Calendar
        onChange={(date: Date) => {
          const formatted = format(date, 'yyyy-MM-dd');
          setSelectedDate(formatted);
        }}
        value={new Date(selectedDate)}
        locale="ko-KR"
      />
    </div>
  </div>
</div>

        <hr className="border-t border-gray-200" />

        {/* 오늘의 스케줄 */}
       <div className="space-y-4">
  <h3 className="text-xl font-bold text-gray-800 text-center">오늘의 스케줄</h3>
  <section className="mt-8 text-center"> {/* ⬅ 여기서 전체 중앙 정렬! */}
    <div className="mb-8">
      <h4 className="mt-2 text-2xl font-bold">Today Schedule</h4>
      <p className="mt-2 text-base text-gray-700">오늘 가장 핫한 케이팝 스케줄은?</p>
    </div>

            <div className="mb-10 flex justify-center gap-16 text-base">
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
                    <span className="text-base text-gray-600">{label}</span>
                    <button
                      type="button"
                      onClick={() => handleSelect(offset)}
                      className={`h-10 w-10 rounded-md border font-semibold transition-colors duration-200 ${
                        isSelected ? 'border-red-500 text-red-500' : 'border-gray-300 text-gray-800'
                      }`}
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
  <div className="flex justify-center">
    <IdolCardList
      idolList={filtered as IdolArtistsCard[]}
      pageType="home"
      isVertical
      onCardClick={handleCardClick}
      onDetailClick={(idolId, scheduleId) =>
        handleScheduleDetailClick(idolId, scheduleId)
      }
    />
  </div>
)}
          </section>
        </div>
      </div>
    </div>
  );
}

export default Profile;