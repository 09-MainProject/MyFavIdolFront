import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '@/lib/api';

function EditProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    nickname: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    alarmOptIn: false,
  });

  const [originalData, setOriginalData] = useState(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [alarmMessage, setAlarmMessage] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null); 
const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get('/users/profile'); 
        const data = res.data;
        // 데이터 값이 있으면 데이터 값을 불러오고, 없으면 빈칸 유지
        // API 못 불러오면 에러 발생
        // 프로필 호출
        setForm({
          name: data.name || '',
          email: data.email || '',
          nickname: data.nickname || '',
          currentPassword: '',
          newPassword: '',
          confirmPassword: '',
          alarmOptIn: data.alarmOptIn ?? false,
        });

        setOriginalData(data);
        setPreview(data.profile_image || null);
      } catch (err) {
        setError('프로필 정보를 불러오지 못했습니다.');
      }
    };

    fetchProfile();
  }, []);
// 프로필 이미지 변경  핸들 이벤트
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0];
  if (file) {
    setSelectedFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  }
};

  // 입력
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;

    if (name === 'alarmOptIn') {
      setAlarmMessage(checked
        ? '알림 받기가 활성화 되었습니다'
        : '알림 받기가 비활성화 되었습니다.'
      )
    }
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleEdit = () => setIsEditing(true);

  const handleCancel = () => {
    if (!originalData) return;
    setForm({
      name: originalData.name,
      email: originalData.email,
      nickname: originalData.nickname,
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
      alarmOptIn: originalData.alarmOptIn ?? false,
    });
    setIsEditing(false);
    setError(null);
  };

const handleSave = async () => {
  if (form.newPassword && form.newPassword !== form.confirmPassword) {
    setError('비밀번호 확인이 일치하지 않습니다.');
    return;
  }

  try {
    setLoading(true);

    const formData = new FormData();
    formData.append('name', form.name);
    formData.append('email', form.email);
    formData.append('nickname', form.nickname);
    formData.append('schedule_alarm', String(form.alarmOptIn));


    if (form.newPassword) {
      formData.append('password', form.newPassword);
    }

    if (selectedFile) {
      formData.append('profile_image', selectedFile); 
    }

    await api.patch('/users/profile', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
       const res = await api.get('/users/profile');
    const updated = res.data;
        setForm({
      name: updated.name || '',
      email: updated.email || '',
      nickname: updated.nickname || '',
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
      alarmOptIn: updated.schedule_alarm ?? false,
    });

     setPreview(updated.profile_image || null);
    setOriginalData(updated);
    setIsEditing(false);
    setError(null);
  } catch (err) {
    console.error('프로필 저장 안댐:', err);
    setError('프로필 저장에 실패했습니다.');
  } finally {
    setLoading(false);
  }
};


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
      src={preview || originalData?.profile_image || '/default.png'}
      alt="프로필 이미지"
      className="h-20 w-20 rounded-full object-cover border"
    />
    {isEditing && (
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
        title="프로필 이미지 선택"
      />
    )}
  </div>
  <div>
    <p className="text-lg font-semibold">{form.nickname}</p>
    <button
      type="button"
      onClick={handleEdit}
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
            value={form.nickname}
            onChange={handleChange}
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
              value={form.currentPassword}
              onChange={handleChange}
              placeholder="기존 비밀번호를 입력해주세요."
              className="w-full rounded border px-3 py-2 text-sm"
              disabled={!isEditing}
            />
            <input
              type="password"
              name="newPassword"
              value={form.newPassword}
              onChange={handleChange}
              placeholder="새 비밀번호를 입력해주세요."
              className="w-full rounded border px-3 py-2 text-sm"
              disabled={!isEditing}
            />
            <input
              type="password"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              placeholder="비밀번호 확인을 입력해주세요."
              className="w-full rounded border px-3 py-2 text-sm"
              disabled={!isEditing}
            />
          </div>
        </div>

        {/* 알람 변경 */}
        <div>
          <h3 className="mb-2 text-base font-semibold">알람 변경하기</h3>
          {/* label -> div로 수정 (eslint오류나서) */}

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="alarmOptIn"
              checked={form.alarmOptIn}
              onChange={handleChange}
              className="w-4 h-4"
            
            />
            <span className="text-sm text-gray-600">알림 받기</span>
          </div>
          {alarmMessage && (
            <p className="text-sm text-green-600 mt-1">{alarmMessage}</p>
          )}
        </div>

        {/* 에러 메시지 */}
        {error && <p className="text-red-500 text-sm">{error}</p>}

        {/* 저장/취소 버튼 */}
        {isEditing && (
          <div className="flex justify-end gap-2">
            <button
              onClick={handleCancel}
              className="text-sm px-4 py-2 border border-gray-400 rounded hover:bg-gray-100"
              disabled={loading}
            >
              취소
            </button>
            <button
              onClick={handleSave}
              className="text-sm px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
              disabled={loading}
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
