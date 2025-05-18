import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '@/lib/api';
import { useAuthStore } from '@/store/authStore';

// 아이돌 생성에 필요한 데이터 타입
interface IdolData {
  name: string;
  debut_date: string;
  agency: string;
  description: string;
  // profile_image: File | null;
  is_active: boolean;
};
function CreateArtist() {
  const [imageFile, setImageFile] = useState<File|null>(null);
  const { accessToken } = useAuthStore.getState();
  console.log(accessToken);
  const navigate = useNavigate();

  // 폼에서 입력되는 아이돌 정보 상태
  const [formIdolData, setFormIdolData] = useState<IdolData>({
    name: '',
    debut_date: '',
    agency: '',
    description: '',
    // profile_image: null,
    is_active: true,
  });
    // form데이터 
  function setFormData(object_id : number) {
    const formData = new FormData();

    formData.append('object_type', 'idol');
    formData.append('object_id', `${object_id}`);
    formData.append('object_type', 'idol');
    formData.append('image', imageFile);
    return formData;
  }

  const handleAddIdol = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // 새로고침 방지
    try {
      const res = await api.post('/idols',formIdolData ,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        }
      });
      const formData = setFormData(res.data.id);
      await api.post('/images/upload', formData, {
        headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'multipart/form-data',
    },
  });

      // 응답 받은 데이터를 상태에 반영
      setFormIdolData({
        name: res.data.name,
        debut_date: res.data.debut_date,
        agency: res.data.agency,
        description: res.data.description,
        is_active: res.data.is_active,
      });

      
      navigate('/');
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err);
    }
  };
  return (
    <div className='flex min-h-screen items-center justify-center bg-white'>
      <div>
  
        <h2 className="mb-2 text-center text-2xl font-bold">Idol 추가</h2>
        <form onSubmit={handleAddIdol} className='w-full max-w-md p-8 space-y-4'>
          <div className='block text-md font-medium text-gray-700'>이름</div>
          <input
            className='w-full rounded-md border border-gray-300 px-3 py-2 text-sm'
            id='name'
            type="text"
            value={formIdolData.name}
            onChange={e => setFormIdolData(prev => ({ ...prev, name: e.target.value }))}
            />

          <div className='block text-md font-medium text-gray-700'>데뷔일</div>
          <input
            id='debut_date'
            type="date"
            value={formIdolData.debut_date}
            onChange={e => setFormIdolData(prev => ({ ...prev, debut_date: e.target.value }))}
            className='w-full border border-gray-300 px-3 py-2 text-sm rounded'
            />

          <div className='block text-md font-medium text-gray-700'>소속사</div>
          <input
            id='agency'
            type="text"
            value={formIdolData.agency}
            onChange={e => setFormIdolData(prev => ({ ...prev, agency: e.target.value }))}
            className='w-full rounded border border-gray-300 px-3 py-2 text-sm'
            />

          <div className='block text-md font-medium text-gray-700'>소개</div>
          <textarea
            id='description'
            value={formIdolData.description}
            onChange={e => setFormIdolData(prev => ({ ...prev, description: e.target.value }))}
            className='w-full border border-gray-300 px-3 py-2 text-sm'
            />


          <input
            id='profile_image'
            type="file"
            // value={formIdolData.profile_image}
            onChange={e => setImageFile(e.target.files[0])}
            className='border w-30 border-gray-300 text-sm'
            />

          <div className='mt-6 flex justify-center'>
            <button
              type="submit"
              className='w-full font-semibold py-2 rounded bg-black text-white hover:bggray800 text-sm'>
              아티스트 등록
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateArtist;