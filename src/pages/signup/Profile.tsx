import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useProfile from '@/hooks/useProfile';
import { useAuthStore } from '@/store/authStore';
import { userProfile } from './EditProfile';
// import Calendar from '@/components/Calendar';
// import TodaySchedule from '@/components/TodaySchedule';

function Profile() {
  const [isCalendarOpen, setIsCalendarOpen] = useState(true);
  const [isScheduleOpen, setIsScheduleOpen] = useState(true);

  const { login } = useAuthStore(); // 회원정보 갱신 때 setUser를 추가

  const imgRef = useRef<HTMLImageElement | null>(null);
  const [isImgError, setIsImgError] = useState(false);
  const { userProfileData }: { userProfileData: userProfile } = useProfile();
  const navigate = useNavigate();

  useEffect(() => {
    if (!login) {
      navigate('/');
    }
  });

  return (
    <div className="flex min-h-screen items-center justify-center bg-white px-4">
      <div className="w-full max-w-xl -translate-y-12 transform space-y-8 rounded-xl border border-gray-200 bg-white px-6 py-10 shadow-sm">
        {/* 👤 프로필 상단 */}
        <div className="mb-4 flex items-center gap-6 border-b border-gray-200 pb-6">
          <div className="h-20 w-20 overflow-hidden rounded-full bg-gray-200">
            <img
              ref={imgRef}
              src={userProfileData?.image_url}
              alt="프로필"
              className="h-full w-full object-cover"
              onError={() => !isImgError && setIsImgError(true)}
            />
          </div>
          <div>
            <p className="text-xl font-semibold text-gray-800">
              {userProfileData?.nickname}님 환영합니다
            </p>
          </div>
        </div>

        {/* 📅 팬로그 */}
        <div className="space-y-2">
          <div
            className="flex cursor-pointer items-center justify-between"
            onClick={() => setIsCalendarOpen(prev => !prev)}
          >
            <h3 className="text-base font-semibold text-gray-800">📅 팬로그</h3>
            <span className="text-sm text-gray-500">
              {isCalendarOpen ? '접기 ▲' : '펼치기 ▼'}
            </span>
          </div>

          {isCalendarOpen && (
            <div className="rounded-md bg-gray-50 p-4 text-sm text-gray-600 shadow-sm">
              {/* 여기에 캘린더 컴포넌트 */}
              여기에 캘린더 컴포넌트 들어갈 예정
            </div>
          )}
        </div>

        {/* 📝 오늘의 스케줄 */}
        <div className="space-y-2">
          <div
            className="flex cursor-pointer items-center justify-between"
            onClick={() => setIsScheduleOpen(prev => !prev)}
          >
            <h3 className="text-base font-semibold text-gray-800">
              📝 오늘의 스케줄
            </h3>
            <span className="text-sm text-gray-500">
              {isScheduleOpen ? '접기 ▲' : '펼치기 ▼'}
            </span>
          </div>

          {isScheduleOpen && (
            <div className="rounded-md bg-gray-50 p-4 text-sm text-gray-600 shadow-sm">
              {/* 여기에 스케줄 컴포넌트 */}
              여기에 오늘의 스케줄 컴포넌트 들어갈 예정
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;
