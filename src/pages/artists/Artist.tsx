import { useState } from 'react';
import { useNavigate } from 'react-router';
import { IdolArtistsCard, IdolCardList } from '@/components/common/Card/IdolCardList';
import { IdolConfirmModal } from '@/components/common/IdolConfirmModal';
import useIdolData from '@/hooks/useIdolData';
import { useAuthStore } from '@/store/authStore';


function Artist() {
  
  const {idolList, followedIdol,handleFollowState} = useIdolData();
  const { isAdmin } = useAuthStore();


  // 모달창 아이돌 초기 값 null
  const [modalIdol, setModalIdol] = useState(null);

  // 추가 후 home으로 이동하기 위한 navigate
  const navigate = useNavigate();  

  const handleConfirm = async () => {
    if (!modalIdol) return;
    handleFollowState(modalIdol.id);
    // 모달 닫기 
    setModalIdol(null);
  };

  // 아이돌 카드 리스트에 이런식으로 매핑해서 보내길래 함수를 따로 만들었음 
  // 따로 파일 만들어서 관리 필요 . 근데 도대체 왜 ? 이렇게 보내는지 이해안감 ;;; 첨부터 통일을 하는 방식으로 나중에 수정하세요 꼭! 
  function createIdolArtistsCard(partial: Partial<IdolArtistsCard>): IdolArtistsCard {
    return {
      id: partial.id ?? 0,
      idolId: partial.idolId ?? 0,
      title: partial.title ?? '',
      img: partial.img ?? '',
      type: partial.type ?? '',
      startDate: partial.startDate ?? '',
      endDate: partial.endDate ?? '',
      location: partial.location ?? '',
      description: partial.description ?? '',
      name: partial.name ?? '',
      enName: partial.enName ?? '',
    };
  }

  return (
    <div>
      {isAdmin && (
        <div className='flex justify-end px-4 mt-4'>
          <button onClick={() => navigate('/artists/create')} type='button' className='px-4 py-2 bg-black text-white rounded hover:bg-gray-800 active:bg-gray700 transition'>
            추가
          </button>
        </div>
      )}
      <div className="mx-auto max-w-[1080px]">
        <div className="mt-20 px-4 md:px-8">
          <div className="text-center text-4xl font-bold">
            <h1>{idolList?.length}팀의 아티스트들을</h1>
            <h1>Wistar에서 만나볼 수 있어요!</h1>
          </div>
          <div className="mt-20 text-2xl font-bold">
            <IdolCardList
              idolTitle={`팔로우한 ${followedIdol?.length}팀의 아티스트`}
              idolList={followedIdol ?? []}
              onCardClick={idol => {
                setModalIdol(idol);
              }}
              pageType="artist"
              isVertical={false}
              onDetailClick={(idolId)=> navigate(`/artists/${idolId}`)}
            />
          </div>
          <div className="mt-20 text-2xl font-bold">
            {idolList && <IdolCardList
              idolTitle="전체 아티스트 페이지"
              idolList={idolList.map((idol)=>createIdolArtistsCard(idol))}
              onCardClick={idol => {
                setModalIdol(idol);
              }}
              pageType="artist"
              isVertical={false}
              onDetailClick={(idolId)=> navigate(`/artists/${idolId}`)}
            />}
          </div>
          {modalIdol && ( // modalIdol 값이 존재할 때만 모달 컴포넌트 렌더링
            <IdolConfirmModal
              idol={modalIdol} // 모달창에 쓰여지는 아이돌 이름을 모달컴포넌트로 props로 전달
              onConfirm={handleConfirm} // '추가' 또는 '삭제' 버튼 클릭 시 handleConfirm함수 실행
              onCancel={() => {
                setModalIdol(null); 
              }} // 취소 버튼 클릭 시 모달 닫음
            isAlreadySelected={followedIdol?.some(
              // 현재 선택된 아이돌이 드롭다운 목록에 존재하는지 여부 확인
              i => i.id === modalIdol.id
            )}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Artist;
