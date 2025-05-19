import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';
import { api } from '@/lib/api';
// import Calendar from '@/components/Calendar';
// import TodaySchedule from '@/components/TodaySchedule';

function Profile() {
  const { login, user, accessToken ,setUser ,setLogout } = useAuthStore(); // 회원정보 갱신 때 setUser를 추가
  console.log('로그인 상태', login);
  console.log('유저 정보', user);

  const imgRef = useRef<HTMLImageElement | null>(null);
const [isImgError, setIsImgError] = useState(false);

const getProfileImage = () => {
  if (!user || isImgError) return '/default.png';
  return user.image_url || '/default.png';
};

  // const [profile, setProfile] = useState({
  //   nickname: '',
  //   profileImage: '',
  // });
  const navigate = useNavigate();



const refreshProfile = async () => {
  try {
    const response = await api.get('/users/profile'); 
    const userData = response.data.data;
    setUser(userData);
    console.log('유저 정보', userData);
    if (userData.image_url) {
      setImgSrc(userData.image_url);
    }
  } catch (e) {
    console.error('프로필 갱신 실패', e);
  }
};

useEffect(() => {
  if (login && !user) {
    refreshProfile(); // ✅ 로그인 상태인데 user가 없으면 불러와!
  }
}, [login, user]);

  // useEffect(() => {
  //   if (login && accessToken ) {
  //   refreshProfile();
  //   }
  // },[login, accessToken]);

  //   useEffect(() => {
  //   if (user) {
  //     setProfile({
  //       nickname: user.nickname || '',
  //       profileImage: user.profileImage || '',
  //     });
  //   }
  // }, [user]);

  // useEffect(() => {
  //   if (!login || !accessToken) return;
  //   refreshProfile(); // 마운트 시 한 번만 호출
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);


  const handleLogout = () => {
    setLogout();
    navigate('/');
  };
  
// eslint-disable-next-line no-console
  console.log(handleLogout);

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

       
      {login && user && user.nickname ? (
  <div className="flex items-center">
    <div className="h-20 w-20 rounded-full bg-gray-300 overflow-hidden flex items-center justify-center">
      <img
        ref={imgRef}
        src={getProfileImage()}
        alt="프로필"
        className="h-full w-full object-cover"
        onError={() => {
          if (!isImgError) setIsImgError(true);
        }}
      />
    </div>
    <div className="ml-4">
      <p className="text-lg font-semibold">
        {user.nickname}님 환영합니다
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