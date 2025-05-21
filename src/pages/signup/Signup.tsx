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
  const [showModal, setShowModal] = useState(false);
  const { userProfileData, refetchUserProfile, editProfile } = useProfile();
  const [isEditing, setIsEditing] = useState(false);
  const [userInput, setUserInput] = useState<userProfile | null>(null);
  const [originalData, setOriginalData] = useState<userProfile | null>(null); // ✅ 원본 데이터 저장
  const [newPassword, setNewPassword] = useState('');
  const [isActiveAlarm, setIsActiveAlarm] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const navigate = useNavigate();
  const uploadImageMutation = useUploadImageMutation();

  // ✅ 변경 여부 비교 함수
  const isFormChanged = () =>
    JSON.stringify(userInput) !== JSON.stringify(originalData);

  // ✅ 브라우저 닫기 감지
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isFormChanged()) {
        e.preventDefault();
        e.returnValue = '';
      }
    };
    if (isEditing) window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [userInput, originalData]);

  useEffect(() => {
    // 유저 인포 세팅
    setUserInput(userProfileData);
    setOriginalData(userProfileData); // ✅ 원본 데이터 초기값 저장
  }, [userProfileData]);

  // 프로필 이미지 변경 핸들 이벤트
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
    const { value } = e.target;

    if (key === 'nickname') {
      const nicknameRegex = /^[가-힣a-zA-Z0-9]{2,10}$/;
      if (!nicknameRegex.test(value)) {
        setErrorMessage(
          '닉네임은 한글, 영어, 숫자만 가능하며 2~10자 사이여야 해요.'
        );
      } else {
        setErrorMessage(null);
      }
    }

    setUserInput(prev => ({ ...prev, [key]: value }));
  }

  function checkCurrentPassword() {
    // 현재 비밀번호 맞는지 체크
  }

  function handleChangeConfirmPassword(e: React.ChangeEvent<HTMLInputElement>) {
    if (userInput?.password !== e.target.value) {
      setErrorMessage('비밀번호 확인이 일치하지 않습니다.');
    }
    setNewPassword(e.target.value);
  }

  function handleClickCancelButton() {
    refetchUserProfile();
    setIsEditing(false);
    setUserInput(userProfileData);
    setOriginalData(userProfileData); // ✅ 취소 시 원본 데이터도 초기화
  }

  async function handleClickSubmitButton() {
    const nicknameRegex = /^[가-힣a-zA-Z0-9]{2,10}$/;
    if (!nicknameRegex.test(userInput.nickname)) {
      setErrorMessage(
        '닉네임은 한글, 영어, 숫자만 가능하며 2~10자 사이여야 해요.'
      );
      return;
    }
    await editProfile(userInput);
    // refetch는 저장 이후 반영 확인용으로 한 번만 호출하면 충분함
    const updated = await refetchUserProfile();
    setUserInput(updated);
    setOriginalData(updated);
    setShowModal(true);
    if (imageFile) {
      uploadImageMutation.mutate({
        object_type: 'user',
        object_id: userProfileData.id,
        image_url: userInput.image_url,
        image: imageFile,
      });
    }
    await refetchUserProfile();
    window.removeEventListener('beforeunload', handleBeforeUnload); // ✅ 새로고침 전 경고 제거
    setIsEditing(false); // ✅ 수정 완료 후 버튼 숨김 처리
    setShowModal(true);
    setOriginalData(userInput); // ✅ 변경 감지 기준점 업데이트
    // navigate(0); // 제거됨, 대신 상태만 갱신
  }

  return (
    <>
      <div className="flex min-h-screen items-center justify-center bg-white px-4">
        <div className="w-full max-w-xl -translate-y-35 transform space-y-8 rounded-xl border border-gray-200 bg-white px-7 py-16 shadow-sm">
          {/* 프로필 + 수정 영역 */}
          <div className="flex items-center gap-6">
            <div className="relative h-20 w-20 overflow-hidden rounded-full bg-gray-200">
              <img
                src={userInput?.image_url || '/default.png'}
                alt="프로필 이미지"
                className="h-full w-full object-cover"
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
              <p className="text-xl font-semibold text-gray-800">
                {userInput?.nickname}
              </p>
              <button
                type="button"
                onClick={() => {
                  setIsEditing(!isEditing);
                  setOriginalData(userInput); // ✅ 수정 시작 시 기준점 저장
                }}
                className="mt-1 text-sm text-gray-500 hover:text-black"
              >
                프로필 수정하기
              </button>
            </div>
          </div>

          <hr className="border-t border-gray-200" />

          {/* 닉네임 변경 */}
          <div className="space-y-4">
            <h3 className="text-base font-semibold text-gray-800">
              닉네임 변경하기
            </h3>
            <hr className="border-t border-gray-200" />
            <input
              type="text"
              name="nickname"
              value={userInput?.nickname}
              onChange={e => handleChangeUserInput('nickname', e)}
              placeholder="변경할 닉네임을 입력해주세요"
              className="w-full rounded border border-gray-300 px-4 py-3 text-sm"
              disabled={!isEditing}
            />
          </div>

          {/* 비밀번호 변경 */}
          <div className="space-y-4">
            <h3 className="text-base font-semibold text-gray-800">
              비밀번호 변경하기
            </h3>
            <hr className="border-t border-gray-200" />
            <input
              type="password"
              name="currentPassword"
              value={userInput?.password}
              onChange={checkCurrentPassword}
              placeholder="기존 비밀번호를 입력해주세요"
              className="w-full rounded border border-gray-300 px-4 py-3 text-sm"
              disabled={!isEditing}
            />
            <input
              type="password"
              name="newPassword"
              value={userInput?.password}
              onChange={e => handleChangeUserInput('password', e)}
              placeholder="새 비밀번호를 입력해주세요"
              className="w-full rounded border border-gray-300 px-4 py-3 text-sm"
              disabled={!isEditing}
            />
            <input
              type="password"
              name="confirmPassword"
              value={newPassword}
              onChange={handleChangeConfirmPassword}
              placeholder="비밀번호 확인을 입력해주세요"
              className="w-full rounded border border-gray-300 px-4 py-3 text-sm"
              disabled={!isEditing}
            />
          </div>

          {/* 버튼 영역 */}
          {isEditing ? (
            <div className="flex justify-end gap-2 pt-4">
              <button
                type="button"
                onClick={handleClickCancelButton}
                className="rounded border border-gray-300 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
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
          ) : (
            <div className="invisible h-[48px]" />
          )}
        </div>
      </div>

      {showModal && (
        <div className="bg-opacity-50 fixed inset-0 z-[9999] flex items-center justify-center bg-black">
          <div className="animate-fade-in-up w-full max-w-sm rounded-lg bg-white p-6 text-center shadow-lg">
            <h3 className="mb-2 text-lg font-semibold">✅ 저장되었습니다!</h3>
            <p className="mb-4 text-sm text-gray-600">
              변경사항이 정상적으로 저장되었습니다.
            </p>
            <button
              type="button"
              onClick={() => setShowModal(false)}
              className="mt-2 rounded bg-black px-4 py-2 text-sm text-white hover:bg-gray-800"
            >
              닫기
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default EditProfile;
