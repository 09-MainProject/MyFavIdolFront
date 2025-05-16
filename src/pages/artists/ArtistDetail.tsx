import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import useMobile from '@/hooks/useMobile';
import { useAuthStore } from '@/store/authStore';

interface IdolData {
  name: string;
  debut_date: string;
  agency: string;
  description: string;
  image_url: string;
  is_active: boolean;
};
function ArtistDetail() {
  const { id } = useParams();
  const [idolInfo, setIdolInfo] = useState<IdolData | null>(null);
  const isMobile = useMobile();
  const navigate = useNavigate();

  // 권한 확인
  function useAdminCheck() {
    const { accessToken } = useAuthStore.getState();
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
      if (!accessToken) return;

      try {
        const payload = accessToken.split('.')[1];
        const decodedPayload = JSON.parse(atob(payload));
        console.log(decodedPayload);

        setIsAdmin(decodedPayload?.is_admin === true);
      } catch (err) {
        console.error(err);
        setIsAdmin(false);
      }
    }, [accessToken]);

    return isAdmin;
  }
  const isAdmin = useAdminCheck();
  console.log('isAdmin', isAdmin);
  async function handleDelete() {
    const { accessToken } = useAuthStore.getState();
    if (!id) return;
    const confirm = window.confirm('정말로 삭제하시겠습니까?');
    if (!confirm) return;

    try {
      const ID = Number(id);
      await axios.delete(`http://43.203.181.6/api/idols${ID}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      alert('삭제가 완료되었습니다.');
      navigate('/artists');
    } catch (err) {
      console.error(err);
    }
  }
  
  useEffect(() => {
    async function fetchIdolDetail() {
      try {
        const ID = Number(id);
        console.log('ID', ID);
        const res = await axios.get(`http://43.203.181.6/api/idols${ID}`);
        setIdolInfo(res?.data);
        console.log('res data : ', res.data);
      } catch (err){
        console.error('error :', err);
      }
    }
    // if (id) {
      fetchIdolDetail();
    // }
  }, [id]);
  console.log('idolInfo 이름', idolInfo?.name);
  return (
    <div>
      {!isAdmin && (
        <div className='flex justify-end gap-2 px-4 w-full'>
          <button className='px-1 py-2 text-sm cursor-pointer' type='button'>수정</button>
          <button className='px-1 py-2 text-sm cursor-pointer' type='button' onClick={handleDelete}>삭제</button>
        </div>
      )}
      <div className="flex min-h-screen flex-col items-center bg-white px-4 pt-10">
        {isMobile ? (
          <div className='flex flex-col items-center gap-4'>
            <h1 className='text-[50px] font-bold text-center'>{idolInfo?.name}</h1>
            <p className='text-gray-700 text-[18px] text-center'>{idolInfo?.description}</p>
            <img src={idolInfo.image_url} alt={idolInfo.name} className='w-full rounded' />
            <div className='mt-4 text-center'>
              <div className='text-sm'>
                <span className='font-bold'>DEBUT</span>
                <span className='text-gray-500 ml-4'>{idolInfo.debut_date}</span>
              </div>
              <p className='text-sm text-gray-700'>{idolInfo.agency}</p>
            </div>
          </div>
        ) : (
        <div className="flex w-full max-w-3xl flex-col gap-6">
          {idolInfo ? (
            <>
              <h1 className='text-[60px] font-bold text-center'>
                {idolInfo?.name}
              </h1>
              <p className='text-gray-700 text-[20px] text-center mt-[50px]'>{idolInfo?.description}</p>
              <div className='flex items-center w-full'>
                <img src={idolInfo.image_url} alt={idolInfo.name} className='h-full w-full rounded object-cover' />
              </div>
                <div className='flex justify-between w-full'>
                  <div className="flex items-center">
                    <span className="font-bold text-[13px]">DEBUT</span>
                    <span className="ml-2 text-[13px] text-gray-500">{idolInfo?.debut_date}</span>
                </div>
                <div>
                  <p className='text-gray-700 text-[13px]'>{idolInfo?.agency}</p>
                </div>

                </div>
            </>
          ) : (
              <p className='text-gray400'>
                로딩 중...
              </p>
          )}
        </div>   
        )}
      </div>
    </div>
  );
}

export default ArtistDetail;