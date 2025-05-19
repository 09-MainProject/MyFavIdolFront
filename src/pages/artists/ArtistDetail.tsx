import { useNavigate, useParams } from 'react-router';
import useIdolData from '@/hooks/useIdolData';
import useMobile from '@/hooks/useMobile';
import { useAuthStore } from '@/store/authStore';

export interface IdolDetailData {
  name: string;
  debut_date: string;
  agency: string;
  description: string;
  image_url: string;
  is_active: boolean;
};
function ArtistDetail() {
  const { id } = useParams();
  const isMobile = useMobile();
  const navigate = useNavigate();

  // 권한 확인
  const { isAdmin } = useAuthStore();
  const { deleteIdolList, idolDetailData, loadingIdolDetailData } = useIdolData(Number(id));
  const {
    name = '',
    debut_date = '',
    agency = '',
    description = '',
    image_url = '',
  } = idolDetailData || {};

  async function handleDelete() {
    if (!id) return;
    const confirm = window.confirm('정말로 삭제하시겠습니까?');
    if (!confirm) return;
    deleteIdolList(Number(id));
    navigate('/artists');
  }
  
  return (
    <div>
      {isAdmin && (
        <div className='flex justify-end gap-2 px-4 w-full'>
          <button className='px-1 py-2 text-sm cursor-pointer' type='button' onClick={() => navigate(`/artists/${Number(id)}/edit`)}>수정</button>
          <button className='px-1 py-2 text-sm cursor-pointer' type='button' onClick={handleDelete}>삭제</button>
        </div>
      )}
      <div className="flex min-h-screen flex-col items-center bg-white px-4 pt-10">
        {idolDetailData && isMobile ? (
          <div className='flex flex-col items-center gap-4'>
            <h1 className='text-[50px] font-bold text-center'>{name}</h1>
            <p className='text-gray-700 text-[18px] text-center'>{description}</p>
            <img src={image_url} alt={name} className='w-full rounded' />
            <div className='mt-4 text-center'>
              <div className='text-sm'>
                <span className='font-bold'>DEBUT</span>
                <span className='text-gray-500 ml-4'>{debut_date}</span>
              </div>
              <p className='text-sm text-gray-700'>{agency}</p>
            </div>
          </div>
        ) : (
          <div className="flex w-full max-w-3xl flex-col gap-6">
            <h1 className='text-[60px] font-bold text-center'>
              {name}
            </h1>
            <p className='text-gray-700 text-[20px] text-center mt-[50px]'>{description}</p>
            <div className='flex items-center w-full'>
              <img src={image_url} alt={name} className='h-full w-full rounded object-cover' />
            </div>
            <div className='flex justify-between w-full'>
              <div className="flex items-center">
                <span className="font-bold text-[13px]">DEBUT</span>
                <span className="ml-2 text-[13px] text-gray-500">{debut_date}</span>
              </div>
              <div>
                <p className='text-gray-700 text-[13px]'>{agency}</p>
              </div>
            </div>
          </div>
        )}
        {loadingIdolDetailData && (
          <p className='text-gray400'>
            로딩 중...
          </p>
        )}
        </div>   
      </div>
  );
}

export default ArtistDetail;