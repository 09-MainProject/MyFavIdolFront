import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useProfile from '@/hooks/useProfile';
import useUploadImageMutation from '../../hooks/useUploadImageMutation';

// getUserProfile 할때 받는 데이터 구조
// 프로필 수정할 때 보내는 구조 (옵셔널 제외)
export interface userProfile {
  email: string;
  password: string;
  name: string;
  nickname: string;
  id?: number;
  image_url?: string;
  created_at?: string;
  updated_at?: string;
}

export interface EditUserProfileResponse {
  nickname: string;
  profile_image: string;
  comment_alarm: boolean;
  like_alarm: boolean;
  schedule_alarm: boolean;
}

function EditProfile() {
  const { userProfileData, refetchUserProfile, editProfile } = useProfile();
  const [isEditing, setIsEditing] = useState(false);

  const [userInput, setUserInput] = useState<userProfile | null>(null);
  const [newPassword, setNewPassword] = useState('');
  const [isActiveAlarm, setIsActiveAlarm] = useState(false);
  // const [originalData, setOriginalData] = useState(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const navigate = useNavigate();
  const uploadImageMutation = useUploadImageMutation();
  useEffect(() => {
    // 유저 인포 세팅
    setUserInput(userProfileData);
  }, [userProfileData]);

  // 프로필 이미지 변경  핸들 이벤트
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);

    // 미리보기용 URL 생성
    const reader = new FileReader();
    reader.onloadend = () => {
      setUserInput(prev => ({ ...prev, image_url: reader.result as string }));
    };
    reader.readAsDataURL(file);
  };

  function handleChangeUserInput(
    key: string,
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    setUserInput(prev => ({ ...prev, [key]: e.target.value }));
    console.log('e', e.target.value);
  }

  function checkCurrentPassword() {
    // 현재 비밀번호 맞는지 체크
  }
  function handleChangeConfirmPassword(e: React.ChangeEvent<HTMLInputElement>) {
    // 새로운 비밀번호 확인
    if (userInput.password !== e.target.value) {
      setErrorMessage('비밀번호 확인이 일치하지 않습니다.');
    }
    // state에 업데이트
    setNewPassword(e.target.value);
  }
  function handleClickCancelButton() {
    // 취소 버튼 누르면
    // 유저 정보 다시 가져오기
    refetchUserProfile();
    setIsEditing(false);
    setUserInput(userProfileData);
  }
  function handleClickSubmitButton() {
    // 유저가 수정한 정보 전송
    editProfile(userInput);
    // 이미지 업로드
    if (imageFile) {
      uploadImageMutation.mutate({
        object_type: 'user',
        object_id: userProfileData.id,
        image_url: userInput.image_url,
        image: imageFile,
      });
    }
    // 프로필 페이지로 이동
    navigate('/profile');
  }
  return (
    <div className="flex min-h-screen flex-col items-center bg-white px-4 pt-10">
      <div className="w-full max-w-3xl space-y-8">
        {/* 경로 안내 */}
        <div className="flex items-center text-sm text-gray-600">
          <Link to="/" className="hover:text-black">
            Home
          </Link>
          <span className="mx-2">{'>'}</span>
          <span className="font-semibold text-black">프로필</span>
        </div>

        {/* 프로필 영역 */}
        <div className="flex items-center gap-4">
          <div className="relative">
            <img
              src={userInput?.image_url || '/default.png'}
              alt="프로필 이미지"
              className="h-20 w-20 rounded-full border object-cover"
            />
            {isEditing && (
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="absolute top-0 left-0 h-full w-full cursor-pointer opacity-0"
                title="프로필 이미지 선택"
              />
            )}
          </div>
          <div>
            <p className="text-lg font-semibold">{userInput?.nickname}</p>
            <p className="text-sm text-gray-500">
              {userInput?.id ?? '알 수 없음'}
            </p>
            <button
              type="button"
              onClick={() => setIsEditing(!isEditing)}
              className="mt-1 text-sm text-gray-500 hover:text-black"
            >
              프로필 수정하기
            </button>
          </div>
        </div>
        {/* 닉네임 변경 */}
        <div>
          <h3 className="mb-2 text-base font-semibold">닉네임 변경하기</h3>
          <input
            type="text"
            name="nickname"
            value={userInput?.nickname}
            onChange={e => handleChangeUserInput('nickname', e)}
            placeholder="변경하고 싶은 닉네임을 입력해주세요."
            className="w-full rounded border px-3 py-2 text-sm"
            disabled={!isEditing}
          />
        </div>

        {/* 비밀번호 변경 */}
        <div>
          <h3 className="mb-2 text-base font-semibold">비밀번호 변경하기</h3>
          <div className="space-y-2">
            <input
              type="password"
              name="currentPassword"
              value={userInput?.password}
              onChange={checkCurrentPassword}
              placeholder="기존 비밀번호를 입력해주세요."
              className="w-full rounded border px-3 py-2 text-sm"
              disabled={!isEditing}
            />
            <input
              type="password"
              name="newPassword"
              value={userInput?.password}
              onChange={e => handleChangeUserInput('password', e)}
              placeholder="새 비밀번호를 입력해주세요."
              className="w-full rounded border px-3 py-2 text-sm"
              disabled={!isEditing}
            />
            <input
              type="password"
              name="confirmPassword"
              value={newPassword}
              onChange={handleChangeConfirmPassword}
              placeholder="비밀번호 확인을 입력해주세요."
              className="w-full rounded border px-3 py-2 text-sm"
              disabled={!isEditing}
            />
          </div>
        </div>

        {/* 알람 변경 */}
        <div>
          <h3 className="mb-2 text-base font-semibold">알람 변경하기</h3>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="alarmOptIn"
              checked={isActiveAlarm}
              onChange={e => setIsActiveAlarm(e.target.checked)}
              className="h-4 w-4"
            />
            <span className="text-sm text-gray-600">알림 받기</span>
          </div>
          {isActiveAlarm ? (
            <p className="mt-1 text-sm text-green-600">
              알림 받기가 활성화 되었습니다
            </p>
          ) : (
            <p className="mt-1 text-sm text-green-600">
              알림 받기가 비활성화 되었습니다
            </p>
          )}
        </div>

        {/* 에러 메시지 */}
        {errorMessage && <p className="text-sm text-red-500">{errorMessage}</p>}

        {/* 저장/취소 버튼 */}
        {isEditing && (
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={handleClickCancelButton}
              className="rounded border border-gray-400 px-4 py-2 text-sm hover:bg-gray-100"
            >
              취소
            </button>
            <button
              type="button"
              onClick={handleClickSubmitButton}
              className="rounded bg-black px-4 py-2 text-sm text-white hover:bg-gray-800"
            >
              저장하기
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default EditProfile;
