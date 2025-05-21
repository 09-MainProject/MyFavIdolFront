import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import useProfile from '@/hooks/useProfile';
import { useAuthStore } from '@/store/authStore';

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

function EditProfile() {
  const setUser = useAuthStore(state => state.setUser);
  const { userProfileData, refetchUserProfile, editProfile } = useProfile();
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [userInput, setUserInput] = useState<userProfile | null>(null);
  const [originalData, setOriginalData] = useState<userProfile | null>(null);
  const [newPassword, setNewPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const navigate = useNavigate();

  // beforeunload 핸들러 ref
  const beforeUnloadHandlerRef = useRef<(e: BeforeUnloadEvent) => void>();

  // 최초 마운트 및 userProfileData 변경 시 userInput/원본 초기화
  useEffect(() => {
    if (userProfileData) {
      setUserInput(userProfileData);
      setOriginalData(userProfileData);
    }
  }, [userProfileData]);

  // 변경 여부 비교 함수
  const isFormChanged = () =>
    JSON.stringify(userInput) !== JSON.stringify(originalData);

  // beforeunload 핸들러 등록/해제
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isEditing && isFormChanged()) {
        e.preventDefault();
        e.returnValue = '';
      }
    };
    beforeUnloadHandlerRef.current = handleBeforeUnload;
    if (isEditing) window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [userInput, originalData, isEditing]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setUserInput(prev =>
        prev ? { ...prev, image_url: reader.result as string } : null
      );
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

    setUserInput(prev => (prev ? { ...prev, [key]: value } : null));
  }

  function checkCurrentPassword() {}

  function handleChangeConfirmPassword(e: React.ChangeEvent<HTMLInputElement>) {
    if (userInput?.password !== e.target.value) {
      setErrorMessage('비밀번호 확인이 일치하지 않습니다.');
    } else {
      setErrorMessage(null);
    }
    setNewPassword(e.target.value);
  }

  // 취소 버튼: 수정모드만 해제
  function handleClickCancelButton() {
    setIsEditing(false);
    setErrorMessage(null);
  }

  // 저장 버튼: 저장 시 beforeunload 핸들러 제거, 서버 반영될 때까지 폴링
  async function handleClickSubmitButton() {
    // 저장 시 beforeunload 핸들러 제거
    if (beforeUnloadHandlerRef.current) {
      window.removeEventListener('beforeunload', beforeUnloadHandlerRef.current);
    }
    try {
      await editProfile(userInput);

      // 서버 반영될 때까지 최대 5회, 300ms 간격으로 폴링
      let updated;
      for (let i = 0; i < 5; i++) {
        const updatedResult = await refetchUserProfile();
        updated = updatedResult?.data || updatedResult;
        if (updated && updated.nickname === userInput.nickname) break;
        await new Promise(res => setTimeout(res, 300));
      }

      if (updated && updated.nickname === userInput.nickname) {
        setUserInput(updated);
        setOriginalData(updated);
        setUser(updated);
        setIsEditing(false);
        setShowModal(true);
        setErrorMessage(null);
      } else {
        setErrorMessage('서버에 변경사항이 아직 반영되지 않았습니다. 잠시 후 다시 시도해주세요.');
      }
    } catch (err) {
      setErrorMessage('저장 중 문제가 발생했어요. 다시 시도해주세요.');
    }
  }

  if (!userInput) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div>프로필 정보를 불러오는 중입니다...</div>
      </div>
    );
  }

  return (
    <>
      <div className="flex min-h-screen items-center justify-center bg-white px-4">
        <div className="w-full max-w-xl space-y-8 rounded-xl border border-gray-200 bg-white px-7 py-16 shadow-sm">
          {/* 프로필 + 수정 영역 */}
          <div className="flex items-center gap-6">
            <div className="relative h-20 w-20 overflow-hidden rounded-full bg-gray-200">
              <img
                src={userInput.image_url || '/default.png'}
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
                {userInput.nickname}
              </p>
              <button
                type="button"
                onClick={() => {
                  setIsEditing(!isEditing);
                  setOriginalData(userInput);
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
              value={userInput.nickname || ''}
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
              value={userInput.password || ''}
              onChange={checkCurrentPassword}
              placeholder="기존 비밀번호를 입력해주세요"
              className="w-full rounded border border-gray-300 px-4 py-3 text-sm"
              disabled={!isEditing}
            />
            <input
              type="password"
              name="newPassword"
              value={userInput.password || ''}
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

          {errorMessage && (
            <div className="py-2 text-sm text-red-500">{errorMessage}</div>
          )}

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
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/30">
          <div className="w-full max-w-sm rounded-lg bg-white p-6 text-center shadow-lg">
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
