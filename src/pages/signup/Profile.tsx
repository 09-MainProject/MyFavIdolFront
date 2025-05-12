import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// import Calendar from '@/components/Calendar';
// import TodaySchedule from '@/components/TodaySchedule';

function Profile() {
  const [profile, setProfile] = useState({
    nickname: 'username',
    profileImage: '',
  });

  const navigate = useNavigate();

  return (
    <div>
      {/* 경로 안내 텍스트 */}
      <div className="text-4xl text-black">{'Home > 일정 관리 > 프로필'}</div>

      <div className="flex min-h-screen flex-col items-center bg-white px-4 pt-10">
        <div className="flex w-full max-w-3xl flex-col gap-6">
          {/* BreadCrumb (경로 링크) */}
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

          <div className="flex items-center">
            <div className="h-20 w-20 rounded-full bg-gray-300" />
            <div className="ml-4">
              <p className="text-lg font-semibold">{profile.nickname}</p>
              <button
                type="button"
                onClick={() => navigate('/profile/check')}
                className="mt-1 text-sm text-blue-500 hover:underline"
              >
                프로필 수정하기
              </button>
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-semibold">팬로그</h3>
            <div className="rounded-lg bg-gray-100 p-4 shadow-sm">
              <p>여기에 캘린더 컴포넌트 들어갈 예정</p>
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-semibold">오늘의 스케줄</h3>
            <div className="rounded-lg bg-gray-100 p-4 shadow-sm">
              <p>여기에 오늘의 스케줄 컴포넌트 들어갈 예정</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
